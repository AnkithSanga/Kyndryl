"""
Translation service using open-source libraries
Supports translation between multiple languages
"""
from deep_translator import GoogleTranslator
from langdetect import detect, LangDetectException
import logging

logger = logging.getLogger(__name__)

# Language code mapping - Top 10 Indian languages
LANGUAGE_MAP = {
    'en': 'english',
    'hi': 'hindi',
    'te': 'telugu',
    'ta': 'tamil',
    'kn': 'kannada',
    'ml': 'malayalam',
    'mr': 'marathi',
    'gu': 'gujarati',
    'bn': 'bengali',
    'or': 'odia'
}

def detect_language(text):
    """
    Detect the language of the input text
    Returns language code (e.g., 'en', 'hi', 'ta')
    """
    try:
        if not text or not text.strip():
            return 'en'
        
        # Remove special characters and check if text is meaningful
        clean_text = ''.join(c for c in text if c.isalnum() or c.isspace())
        if len(clean_text.strip()) < 2:
            return 'en'
        
        detected = detect(text)
        return detected
    except LangDetectException:
        return 'en'
    except Exception as e:
        logger.error(f"Error detecting language: {e}")
        return 'en'

def translate_text(text, target_language='en', source_language='auto'):
    """
    Translate text to target language
    
    Args:
        text: Text to translate
        target_language: Target language code (e.g., 'en', 'hi', 'ta')
        source_language: Source language code or 'auto' for auto-detection
    
    Returns:
        Translated text
    """
    try:
        if not text or not text.strip():
            return text
        
        # If source is auto, detect it first
        if source_language == 'auto':
            source_language = detect_language(text)
        
        # If source and target are same, return original
        if source_language == target_language:
            return text
        
        # Get language names for translator
        target_lang = LANGUAGE_MAP.get(target_language, 'english')
        source_lang = LANGUAGE_MAP.get(source_language, 'auto')
        
        # Translate using GoogleTranslator
        if source_lang == 'auto':
            translator = GoogleTranslator(source='auto', target=target_lang)
        else:
            translator = GoogleTranslator(source=source_lang, target=target_lang)
        
        translated = translator.translate(text)
        return translated
    except Exception as e:
        logger.error(f"Translation error: {e}")
        # Return original text if translation fails
        return text

def translate_faq(faq_data, target_language='en'):
    """
    Translate FAQ data structure to target language
    
    Args:
        faq_data: Dictionary containing FAQ items
        target_language: Target language code
    
    Returns:
        Translated FAQ data
    """
    try:
        translated_faq = {}
        for key, value in faq_data.items():
            if isinstance(value, dict):
                translated_faq[key] = translate_faq(value, target_language)
            elif isinstance(value, list):
                translated_faq[key] = [
                    translate_text(item, target_language) if isinstance(item, str) else item
                    for item in value
                ]
            elif isinstance(value, str):
                translated_faq[key] = translate_text(value, target_language)
            else:
                translated_faq[key] = value
        return translated_faq
    except Exception as e:
        logger.error(f"FAQ translation error: {e}")
        return faq_data

