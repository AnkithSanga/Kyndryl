import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatInterface.css';
import FAQMenu from './FAQMenu';

const API_BASE_URL = 'http://localhost:5000/api';

// Map our language codes to SpeechRecognition API language codes
const SPEECH_LANGUAGE_MAP = {
  'en': 'en-US',
  'hi': 'hi-IN',
  'ta': 'ta-IN',
  'te': 'te-IN',
  'kn': 'kn-IN',
  'ml': 'ml-IN',
  'mr': 'mr-IN',
  'gu': 'gu-IN',
  'bn': 'bn-IN',
  'es': 'es-ES',
  'fr': 'fr-FR',
  'de': 'de-DE',
  'pt': 'pt-PT',
  'zh': 'zh-CN',
  'ja': 'ja-JP',
  'ko': 'ko-KR',
  'ar': 'ar-SA',
  'ru': 'ru-RU'
};

const ChatInterface = ({ sessionId, language }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState('auto'); // 'auto' or 'manual'
  const [showVoiceOptions, setShowVoiceOptions] = useState(false);
  const [useAI, setUseAI] = useState(false); // Toggle for AI responses
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isStartingRef = useRef(false);
  const useAIRef = useRef(false); // Ref to track current AI toggle state

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

  // Update useAI ref whenever useAI state changes
  useEffect(() => {
    useAIRef.current = useAI;
  }, [useAI]);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
        isStartingRef.current = false;
      };
      
      recognition.onresult = (event) => {
        // Get the full transcript from all results
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          // Add a space between results if they're separate
          if (!event.results[i].isFinal) {
            transcript += ' ';
          }
        }
        
        // Trim and set the input message
        transcript = transcript.trim();
        setInputMessage(transcript);
        setIsListening(false);
        
        // Auto-send the recognized text if it's not empty
        if (transcript && transcript.length > 0) {
          // Use setTimeout to ensure state is updated before sending
          setTimeout(() => {
            sendMessage(transcript);
          }, 50);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Don't show alert for these common errors that are handled gracefully
        if (event.error === 'no-speech') {
          // User didn't speak - this is normal, don't show error
          return;
        } else if (event.error === 'aborted') {
          // Recognition was stopped - this is normal
          return;
        } else if (event.error === 'audio-capture') {
          alert('No microphone found. Please connect a microphone and try again.');
        } else if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please enable microphone access in your browser settings.');
        } else if (event.error === 'network') {
          alert('Network error. Please check your internet connection and try again.');
        } else if (event.error === 'service-not-allowed') {
          alert('Speech recognition service is not available. Please try again later.');
        } else {
          // Only show alert for unexpected errors
          console.warn('Speech recognition error (non-critical):', event.error);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
        isStartingRef.current = false;
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Update recognition language when language or voice mode changes
    if (recognitionRef.current) {
      // Stop recognition if it's currently running before changing language
      if (isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
        setIsListening(false);
      }
      
      if (voiceMode === 'auto') {
        // Auto-detect: try to use a language that matches user's selection
        // If user selected a language, use that for better accuracy
        // Otherwise default to English
        const detectedLang = SPEECH_LANGUAGE_MAP[language] || 'en-US';
        recognitionRef.current.lang = detectedLang;
      } else {
        // Manual: use selected language
        recognitionRef.current.lang = SPEECH_LANGUAGE_MAP[language] || 'en-US';
      }
    }
  }, [language, voiceMode, isListening]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Note: Initial greeting disabled to avoid unnecessary API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   sendMessage('Hello', true);
  // }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close voice options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showVoiceOptions && !event.target.closest('.voice-mode-selector')) {
        setShowVoiceOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVoiceOptions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message, isInitial = false) => {
    // Ensure message is properly trimmed
    const trimmedMessage = String(message).trim();
    
    if (!trimmedMessage && !isInitial) return;

    const userMessage = isInitial ? 'Hello' : trimmedMessage;
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
        translate: true,  // Always enable translation
        use_ai: useAIRef.current  // Pass current AI toggle setting from ref
      });

      const assistantMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'assistant',
        timestamp: new Date(),
        source: response.data.source // Track response source (ai, faq, or mock)
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

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    // Prevent multiple simultaneous starts
    if (isStartingRef.current) {
      return;
    }
    
    // If already listening, stop it first
    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop errors
      }
      setIsListening(false);
      isStartingRef.current = false;
      return;
    }
    
    // Set language before starting
    try {
      if (voiceMode === 'auto') {
        // For auto mode, use the selected language as a hint
        // The browser will still try to detect, but this improves accuracy
        recognitionRef.current.lang = SPEECH_LANGUAGE_MAP[language] || 'en-US';
      } else {
        recognitionRef.current.lang = SPEECH_LANGUAGE_MAP[language] || 'en-US';
      }
      
      // Stop any existing recognition first
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore if not running
      }
      
      isStartingRef.current = true;
      
      // Small delay to ensure previous recognition is stopped
      setTimeout(() => {
        try {
          recognitionRef.current.start();
          isStartingRef.current = false;
        } catch (error) {
          console.error('Error starting recognition:', error);
          setIsListening(false);
          isStartingRef.current = false;
          
          // Handle specific errors
          if (error.name === 'InvalidStateError' || error.message?.includes('already started')) {
            // Recognition is already running, try to stop and restart
            try {
              recognitionRef.current.stop();
              setTimeout(() => {
                try {
                  recognitionRef.current.start();
                } catch (e2) {
                  console.error('Error restarting recognition:', e2);
                  // Don't show alert for this, just log it
                }
              }, 200);
            } catch (e) {
              console.error('Error stopping recognition:', e);
            }
          } else {
            // Only show alert for unexpected errors
            console.warn('Recognition start error:', error);
          }
        }
      }, 100);
    } catch (error) {
      console.error('Error setting up recognition:', error);
      isStartingRef.current = false;
    }
  };

  // stopListening is handled internally by the recognition event listeners
  // and can be triggered via recognitionRef.current.stop() when needed

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
          <div className="header-controls">
            <div className="ai-mode-selector">
              <button
                className={`ai-toggle-btn ${useAI ? 'active' : ''}`}
                onClick={() => setUseAI(!useAI)}
                title={useAI ? 'AI Enabled - Click to Disable' : 'AI Disabled - Click to Enable'}
              >
                🤖
                <span>{useAI ? 'AI ON' : 'AI OFF'}</span>
              </button>
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
              {message.sender === 'assistant' && message.source && (
                <div className="message-source">{message.source}</div>
              )}
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
        <div className="voice-controls-wrapper">
          <div className="voice-mode-selector">
            <button
              type="button"
              className="voice-options-toggle"
              onClick={() => setShowVoiceOptions(!showVoiceOptions)}
              title="Voice Recognition Options"
            >
              🎤
            </button>
            {showVoiceOptions && (
              <div className="voice-options-dropdown">
                <div className="voice-option-header">Voice Recognition Mode</div>
                <label className="voice-option">
                  <input
                    type="radio"
                    name="voiceMode"
                    value="auto"
                    checked={voiceMode === 'auto'}
                    onChange={(e) => setVoiceMode(e.target.value)}
                  />
                  <span>Auto Detect Language</span>
                </label>
                <label className="voice-option">
                  <input
                    type="radio"
                    name="voiceMode"
                    value="manual"
                    checked={voiceMode === 'manual'}
                    onChange={(e) => setVoiceMode(e.target.value)}
                  />
                  <span>Use Selected Language ({language})</span>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              language === 'hi' ? 'अपना संदेश टाइप करें या माइक पर क्लिक करें...' :
              language === 'ta' ? 'உங்கள் செய்தியை தட்டச்சு செய்யவும் அல்லது மைக்ரோஃபோனைக் கிளிக் செய்யவும்...' :
              language === 'te' ? 'మీ సందేశాన్ని టైప్ చేయండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...' :
              language === 'kn' ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮೈಕ್ರೋಫೋನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ...' :
              language === 'ml' ? 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ മൈക്രോഫോൺ ക്ലിക്ക് ചെയ്യുക...' :
              language === 'mr' ? 'आपला संदेश टाइप करा किंवा मायक्रोफोन क्लिक करा...' :
              language === 'gu' ? 'તમારો સંદેશ ટાઇપ કરો અથવા માઇક્રોફોન ક્લિક કરો...' :
              language === 'bn' ? 'আপনার বার্তা টাইপ করুন বা মাইক্রোফোন ক্লিক করুন...' :
              language === 'es' ? 'Escribe tu mensaje o haz clic en el micrófono...' :
              language === 'fr' ? 'Tapez votre message ou cliquez sur le microphone...' :
              language === 'de' ? 'Geben Sie Ihre Nachricht ein oder klicken Sie auf das Mikrofon...' :
              language === 'pt' ? 'Digite sua mensagem ou clique no microfone...' :
              language === 'zh' ? '输入您的消息或点击麦克风...' :
              language === 'ja' ? 'メッセージを入力するか、マイクをクリック...' :
              language === 'ko' ? '메시지를 입력하거나 마이크를 클릭하세요...' :
              language === 'ar' ? 'اكتب رسالتك أو انقر على الميكروفون...' :
              language === 'ru' ? 'Введите ваше сообщение или нажмите на микрофон...' :
              'Type your message or click the microphone...'
            }
            disabled={isLoading || isListening}
          />
          {isListening && (
            <div className="listening-indicator">
              <span className="pulse-dot"></span>
              <span>Listening...</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className={`voice-button ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          disabled={isLoading}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? '⏹️' : '🎤'}
        </button>
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !inputMessage.trim() || isListening}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;

