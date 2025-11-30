from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import logging

# Import translation and FAQ services
from translation_service import translate_text, detect_language, translate_faq
from faq_data import BANKING_FAQS, get_faq_by_keyword, get_faqs_by_category, get_all_categories

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "banking_assistant.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Interaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=False)
    user_message = db.Column(db.Text, nullable=False)
    assistant_response = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(10), default='en')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    intent = db.Column(db.String(50))
    
    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'user_message': self.user_message,
            'assistant_response': self.assistant_response,
            'language': self.language,
            'timestamp': self.timestamp.isoformat(),
            'intent': self.intent
        }

# Mocked responses for banking assistant
MOCKED_RESPONSES = {
    'en': {
        'greeting': "Hello! I'm your virtual banking assistant. How can I help you today?",
        'balance': "Your current account balance is ₹25,450.00. Would you like to check any specific transaction?",
        'transactions': "Here are your recent transactions:\n1. Payment to Amazon - ₹1,299 (Nov 25)\n2. Salary Credit - ₹50,000 (Nov 24)\n3. ATM Withdrawal - ₹5,000 (Nov 23)",
        'transfer': "I can help you with money transfers. Please provide:\n- Recipient account number\n- Amount\n- Purpose of transfer",
        'loans': "We offer various loan products:\n- Personal Loans (up to ₹20L)\n- Home Loans (up to ₹1Cr)\n- Car Loans (up to ₹50L)\nWould you like to know more about any specific loan?",
        'cards': "Your card services:\n- Credit Card limit: ₹2,00,000\n- Debit Card active\n- Card replacement available\nHow can I assist with your cards?",
        'default': "I understand you're asking about banking services. Could you please be more specific? I can help with:\n- Account balance\n- Transactions\n- Money transfers\n- Loans\n- Card services"
    },
    'hi': {
        'greeting': "नमस्ते! मैं आपका वर्चुअल बैंकिंग सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
        'balance': "आपका वर्तमान खाता शेष ₹25,450.00 है। क्या आप कोई विशिष्ट लेनदेन देखना चाहेंगे?",
        'transactions': "यहां आपके हाल के लेनदेन हैं:\n1. अमेज़न को भुगतान - ₹1,299 (25 नवंबर)\n2. वेतन जमा - ₹50,000 (24 नवंबर)\n3. एटीएम निकासी - ₹5,000 (23 नवंबर)",
        'transfer': "मैं आपकी धन हस्तांतरण में मदद कर सकता हूं। कृपया प्रदान करें:\n- प्राप्तकर्ता खाता संख्या\n- राशि\n- हस्तांतरण का उद्देश्य",
        'loans': "हम विभिन्न ऋण उत्पाद प्रदान करते हैं:\n- व्यक्तिगत ऋण (₹20L तक)\n- गृह ऋण (₹1Cr तक)\n- कार ऋण (₹50L तक)\nक्या आप किसी विशिष्ट ऋण के बारे में अधिक जानना चाहेंगे?",
        'default': "मैं समझ गया कि आप बैंकिंग सेवाओं के बारे में पूछ रहे हैं। कृपया अधिक विशिष्ट हो सकते हैं? मैं मदद कर सकता हूं:\n- खाता शेष\n- लेनदेन\n- धन हस्तांतरण\n- ऋण\n- कार्ड सेवाएं"
    },
    'ta': {
        'greeting': "வணக்கம்! நான் உங்கள் மெய்நிகர் வங்கி உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
        'balance': "உங்கள் தற்போதைய கணக்கு இருப்பு ₹25,450.00 ஆகும். எந்த குறிப்பிட்ட பரிவர்த்தனையை சரிபார்க்க விரும்புகிறீர்கள்?",
        'transactions': "இங்கே உங்கள் சமீபத்திய பரிவர்த்தனைகள்:\n1. அமேசான் செலுத்துதல் - ₹1,299 (நவம்பர் 25)\n2. சம்பளம் வரவு - ₹50,000 (நவம்பர் 24)\n3. ATM பணம் எடுத்தல் - ₹5,000 (நவம்பர் 23)",
        'transfer': "நான் பணம் மாற்றத்தில் உதவ முடியும். தயவுசெய்து வழங்கவும்:\n- பெறுநர் கணக்கு எண்\n- தொகை\n- மாற்றத்தின் நோக்கம்",
        'loans': "நாங்கள் பல்வேறு கடன் தயாரிப்புகளை வழங்குகிறோம்:\n- தனிப்பட்ட கடன்கள் (₹20L வரை)\n- வீட்டு கடன்கள் (₹1Cr வரை)\n- கார் கடன்கள் (₹50L வரை)\nநீங்கள் எந்த குறிப்பிட்ட கடனைப் பற்றி மேலும் அறிய விரும்புகிறீர்களா?",
        'default': "நான் நீங்கள் வங்கி சேவைகள் பற்றி கேட்கிறீர்கள் என்பதை புரிந்துகொள்கிறேன். தயவுசெய்து மேலும் குறிப்பிட்டதாக இருக்க முடியுமா? நான் உதவ முடியும்:\n- கணக்கு இருப்பு\n- பரிவர்த்தனைகள்\n- பண மாற்றங்கள்\n- கடன்கள்\n- கார்டு சேவைகள்"
    }
}

def detect_intent_and_language(message, preferred_language='en'):
    """Enhanced intent detection with language detection"""
    message_lower = message.lower()
    
    # Use translation service for better language detection
    try:
        detected_lang = detect_language(message)
        # Supported languages list - Top 10 Indian languages
        supported_languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'or']
        # If detected language is one of our supported languages, use it
        if detected_lang in supported_languages:
            language = detected_lang
        else:
            # Fallback to keyword-based detection for Indian languages
            if any(word in message_lower for word in ['नमस्ते', 'शेष', 'लेनदेन', 'हस्तांतरण', 'ऋण', 'खाता']):
                language = 'hi'
            elif any(word in message_lower for word in ['வணக்கம்', 'இருப்பு', 'பரிவர்த்தனை', 'கணக்கு']):
                language = 'ta'
            elif any(word in message_lower for word in ['హలో', 'బ్యాలెన్స్', 'లావాదేవీ']):
                language = 'te'
            elif any(word in message_lower for word in ['ನಮಸ್ಕಾರ', 'ಬ್ಯಾಲೆನ್ಸ್', 'ವಹಿವಾಟು']):
                language = 'kn'
            else:
                language = preferred_language if preferred_language in supported_languages else 'en'
    except Exception as e:
        logger.error(f"Language detection error: {e}")
        supported_languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'or']
        language = preferred_language if preferred_language in supported_languages else 'en'
    
    # Enhanced intent detection with more keywords
    intent_keywords = {
        'greeting': ['hello', 'hi', 'namaste', 'namaskar', 'வணக்கம்', 'good morning', 'good evening', 'hey'],
        'balance': ['balance', 'शेष', 'இருப்பு', 'amount', 'money', 'available', 'खाता शेष', 'கணக்கு இருப்பு'],
        'transactions': ['transaction', 'history', 'लेनदेन', 'பரிவர்த்தனை', 'statement', 'mini statement', 'passbook', 'statement download'],
        'transfer': ['transfer', 'send', 'हस्तांतरण', 'பணம்', 'neft', 'rtgs', 'imps', 'upi', 'beneficiary', 'pay'],
        'loans': ['loan', 'ऋण', 'கடன்', 'personal loan', 'home loan', 'car loan', 'education loan', 'emi', 'interest rate'],
        'cards': ['card', 'credit', 'debit', 'कार्ड', 'activate', 'block', 'pin', 'cvv', 'card limit', 'card replacement'],
        'account_services': ['open account', 'new account', 'account type', 'update account', 'kyc', 'account details'],
        'digital_banking': ['internet banking', 'mobile banking', 'app', 'password', 'forgot password', 'register', 'login'],
        'support': ['contact', 'customer service', 'helpline', 'support', 'complaint', 'branch', 'timing', 'help']
    }
    
    # Check for intent matches
    intent = 'default'
    max_matches = 0
    
    for intent_type, keywords in intent_keywords.items():
        matches = sum(1 for keyword in keywords if keyword in message_lower)
        if matches > max_matches:
            max_matches = matches
            intent = intent_type
    
    return intent, language

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint with translation and FAQ support
    Always responds in the selected language regardless of input language"""
    data = request.json
    user_message = data.get('message', '')
    session_id = data.get('session_id', 'default_session')
    preferred_language = data.get('language', 'en')
    enable_translation = data.get('translate', True)
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400
    
    try:
        # ALWAYS use the preferred language (selected from dropdown) for responses
        # This ensures user gets response in their selected language regardless of input
        # Supported languages: Top 10 Indian languages
        supported_languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'or']
        target_language = preferred_language if preferred_language in supported_languages else 'en'
        
        # Detect intent (but not for language selection - we use preferred_language)
        intent, _ = detect_intent_and_language(user_message, target_language)
        
        # Try to get FAQ answer first (searches in any language)
        assistant_response = None
        faq_answer = get_faq_by_keyword(user_message, target_language)
        
        if faq_answer:
            # FAQ answers are always in English, so translate to target language if needed
            if target_language == 'en':
                assistant_response = faq_answer
            else:
                # Always translate FAQ answer to target language
                if enable_translation:
                    try:
                        assistant_response = translate_text(faq_answer, target_language, 'en')
                    except Exception as e:
                        logger.error(f"FAQ translation error: {e}")
                        assistant_response = faq_answer  # Fallback to English if translation fails
                else:
                    assistant_response = faq_answer
        else:
            # Fallback to mocked responses
            # First try pre-translated responses
            responses = MOCKED_RESPONSES.get(target_language, MOCKED_RESPONSES['en'])
            assistant_response = responses.get(intent, responses['default'])
            
            # If target language is not English and we got English response, translate it
            if target_language != 'en' and enable_translation:
                # Check if response is actually in English (comparing with English version)
                english_response = MOCKED_RESPONSES['en'].get(intent, MOCKED_RESPONSES['en']['default'])
                if assistant_response == english_response:
                    # Response is still in English, need to translate
                    try:
                        assistant_response = translate_text(english_response, target_language, 'en')
                    except Exception as e:
                        logger.error(f"Response translation error: {e}")
                        # Keep the English response if translation fails
                        assistant_response = english_response
        
        # Save interaction to database
        interaction = Interaction(
            session_id=session_id,
            user_message=user_message,
            assistant_response=assistant_response,
            language=target_language,
            intent=intent
        )
        db.session.add(interaction)
        db.session.commit()
        
        return jsonify({
            'response': assistant_response,
            'language': target_language,
            'intent': intent,
            'session_id': session_id,
            'translated': enable_translation
        })
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        import traceback
        logger.error(traceback.format_exc())
        return jsonify({'error': 'An error occurred processing your request'}), 500

@app.route('/api/interactions', methods=['GET'])
def get_interactions():
    """Get all interactions for a session"""
    session_id = request.args.get('session_id', 'default_session')
    interactions = Interaction.query.filter_by(session_id=session_id).order_by(Interaction.timestamp.desc()).all()
    return jsonify([interaction.to_dict() for interaction in interactions])

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'Banking Assistant API'})

@app.route('/api/faq/categories', methods=['GET'])
def get_faq_categories():
    """Get all FAQ categories"""
    language = request.args.get('language', 'en')
    if language not in ['en', 'hi', 'ta']:
        language = 'en'
    
    try:
        # Get categories in English first
        categories = get_all_categories('en')
        
        # Translate category titles if needed
        if language != 'en':
            for category in categories:
                category['title'] = translate_text(category['title'], language, 'en')
        
        return jsonify({
            'categories': categories,
            'language': language
        })
    except Exception as e:
        logger.error(f"FAQ categories error: {e}")
        return jsonify({'error': 'Failed to fetch categories'}), 500

@app.route('/api/faq/category/<category_id>', methods=['GET'])
def get_faq_category(category_id):
    """Get FAQs for a specific category"""
    language = request.args.get('language', 'en')
    supported_languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'or']
    if language not in supported_languages:
        language = 'en'
    
    try:
        category = get_faqs_by_category(category_id, 'en')
        
        if not category:
            return jsonify({'error': 'Category not found'}), 404
        
        # Translate category data if needed
        if language != 'en':
            category['title'] = translate_text(category['title'], language, 'en')
            for faq in category['faqs']:
                faq['question'] = translate_text(faq['question'], language, 'en')
                faq['answer'] = translate_text(faq['answer'], language, 'en')
        
        return jsonify({
            'category': category,
            'language': language
        })
    except Exception as e:
        logger.error(f"FAQ category error: {e}")
        return jsonify({'error': 'Failed to fetch category'}), 500

@app.route('/api/translate', methods=['POST'])
def translate():
    """Translate text endpoint"""
    data = request.json
    text = data.get('text', '')
    target_language = data.get('target_language', 'en')
    source_language = data.get('source_language', 'auto')
    
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    
    supported_languages = ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn', 'or']
    if target_language not in supported_languages:
        return jsonify({'error': 'Unsupported target language'}), 400
    
    try:
        translated_text = translate_text(text, target_language, source_language)
        return jsonify({
            'original': text,
            'translated': translated_text,
            'target_language': target_language,
            'source_language': source_language
        })
    except Exception as e:
        logger.error(f"Translation error: {e}")
        return jsonify({'error': 'Translation failed'}), 500

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)

