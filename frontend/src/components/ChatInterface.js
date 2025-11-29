import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatInterface.css';
import FAQMenu from './FAQMenu';

const API_BASE_URL = 'http://localhost:5000/api';

const ChatInterface = ({ sessionId, language }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = {
    en: [
      'Check Balance',
      'View Transactions',
      'Transfer Money',
      'Loan Information',
      'Card Services'
    ],
    hi: [
      'शेष जांचें',
      'लेनदेन देखें',
      'पैसा ट्रांसफर करें',
      'ऋण जानकारी',
      'कार्ड सेवाएं'
    ],
    ta: [
      'இருப்பு சரிபார்க்க',
      'பரிவர்த்தனைகளைக் காண்க',
      'பணம் மாற்ற',
      'கடன் தகவல்',
      'கார்டு சேவைகள்'
    ],
    // For other languages, use English and let backend translate
    te: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    kn: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    ml: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    mr: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    gu: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    bn: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    es: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    fr: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    de: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    pt: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    zh: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    ja: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    ko: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    ar: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services'],
    ru: ['Check Balance', 'View Transactions', 'Transfer Money', 'Loan Information', 'Card Services']
  };

  useEffect(() => {
    // Send initial greeting
    sendMessage('Hello', true);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message, isInitial = false) => {
    if (!message.trim() && !isInitial) return;

    const userMessage = isInitial ? 'Hello' : message;
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
        session_id: sessionId,
        language: language,
        translate: true  // Always enable translation
      });

      const assistantMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorTexts = {
        en: 'Sorry, I encountered an error. Please try again.',
        hi: 'क्षमा करें, मुझे एक त्रुटि आई। कृपया पुनः प्रयास करें।',
        ta: 'மன்னிக்கவும், பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்।',
        te: 'క్షమించండి, నేను లోపం ఎదుర్కొన్నాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
        kn: 'ಕ್ಷಮಿಸಿ, ನಾನು ದೋಷವನ್ನು ಎದುರಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        ml: 'ക്ഷമിക്കണം, എനിക്ക് ഒരു പിശക് നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
        mr: 'क्षमा करा, मला त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
        gu: 'માફ કરશો, મને ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.',
        bn: 'দুঃখিত, আমি একটি ত্রুটি সম্মুখীন হয়েছি। অনুগ্রহ করে আবার চেষ্টা করুন।',
        es: 'Lo siento, encontré un error. Por favor, inténtalo de nuevo.',
        fr: 'Désolé, j\'ai rencontré une erreur. Veuillez réessayer.',
        de: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
        pt: 'Desculpe, encontrei um erro. Por favor, tente novamente.',
        zh: '抱歉，我遇到了错误。请再试一次。',
        ja: '申し訳ございませんが、エラーが発生しました。もう一度お試しください。',
        ko: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.',
        ar: 'عذراً، واجهت خطأً. يرجى المحاولة مرة أخرى.',
        ru: 'Извините, произошла ошибка. Пожалуйста, попробуйте снова.'
      };
      const errorMessage = {
        id: Date.now() + 1,
        text: errorTexts[language] || errorTexts['en'],
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage);
    }
  };

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  const handleFAQSelect = (faqQuestion) => {
    sendMessage(faqQuestion);
    setShowFAQ(false);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-content-wrapper">
          <div>
            <h2>💬 Chat with Your Banking Assistant</h2>
            <p>Ask me anything about your banking needs</p>
          </div>
          <button
            className="faq-toggle-btn"
            onClick={() => setShowFAQ(!showFAQ)}
            title={showFAQ ? 'Hide FAQs' : 'Show FAQs'}
          >
            {showFAQ ? '✕' : '📚'}
            <span>{showFAQ ? 'Hide FAQs' : 'FAQs'}</span>
          </button>
        </div>
      </div>

      {showFAQ && (
        <div className="faq-menu-wrapper">
          <FAQMenu language={language} onFAQSelect={handleFAQSelect} />
        </div>
      )}

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'assistant' && (
              <div className="message-avatar">🤖</div>
            )}
            <div>
              <div className="message-content">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
            {message.sender === 'user' && (
              <div className="message-avatar">👤</div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="loading-indicator">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="quick-actions">
            {quickActions[language]?.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="input-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              language === 'hi' ? 'अपना संदेश टाइप करें...' :
              language === 'ta' ? 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...' :
              language === 'te' ? 'మీ సందేశాన్ని టైప్ చేయండి...' :
              language === 'kn' ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...' :
              language === 'ml' ? 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...' :
              language === 'mr' ? 'आपला संदेश टाइप करा...' :
              language === 'gu' ? 'તમારો સંદેશ ટાઇપ કરો...' :
              language === 'bn' ? 'আপনার বার্তা টাইপ করুন...' :
              language === 'es' ? 'Escribe tu mensaje...' :
              language === 'fr' ? 'Tapez votre message...' :
              language === 'de' ? 'Geben Sie Ihre Nachricht ein...' :
              language === 'pt' ? 'Digite sua mensagem...' :
              language === 'zh' ? '输入您的消息...' :
              language === 'ja' ? 'メッセージを入力...' :
              language === 'ko' ? '메시지를 입력하세요...' :
              language === 'ar' ? 'اكتب رسالتك...' :
              language === 'ru' ? 'Введите ваше сообщение...' :
              'Type your message...'
            }
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !inputMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;

