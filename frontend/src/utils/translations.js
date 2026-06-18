// Translation utility for UI text
// Top 10 languages used in India
export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
];

// Base English text for all UI elements
export const UI_TEXT = {
  // Quick Actions
  quickActions: [
    'Check Balance',
    'View Transactions',
    'Transfer Money',
    'Loan Information',
    'Card Services'
  ],
  
  // Chat Interface
  chatTitle: 'Chat with Your Banking Assistant',
  chatSubtitle: 'Ask me anything about your banking needs',
  faqs: 'FAQs',
  hideFAQs: 'Hide FAQs',
  send: 'Send',
  listening: 'Listening...',
  typeMessage: 'Type your message or click the microphone...',
  
  // Voice Options
  voiceRecognitionMode: 'Voice Recognition Mode',
  multiLanguage: 'Multi-Language (Hindi, English, Telugu)',
  autoDetect: 'Auto Detect (All Languages)',
  useSelectedLanguage: 'Use Selected Language',
  
  // Errors
  errorOccurred: 'Sorry, I encountered an error. Please try again.',
  noMicrophone: 'No microphone found. Please connect a microphone and try again.',
  microphoneDenied: 'Microphone permission denied. Please enable microphone access in your browser settings.',
  networkError: 'Network error. Please check your internet connection and try again.',
  speechNotSupported: 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.',
  
  // Footer
  madeWith: 'Made with',
  by: 'by',
  teamName: 'Team Exception',
  
  // Placeholder variations (will be translated by backend)
  placeholder: 'Type your message or click the microphone...'
};

// Pre-translated text for common languages (for performance)
const TRANSLATIONS = {
  hi: {
    quickActions: ['शेष जांचें', 'लेनदेन देखें', 'पैसा ट्रांसफर करें', 'ऋण जानकारी', 'कार्ड सेवाएं'],
    chatTitle: 'अपने बैंकिंग सहायक के साथ चैट करें',
    chatSubtitle: 'मुझसे अपनी बैंकिंग जरूरतों के बारे में कुछ भी पूछें',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    hideFAQs: 'FAQs छुपाएं',
    send: 'भेजें',
    listening: 'सुन रहे हैं...',
    typeMessage: 'अपना संदेश टाइप करें या माइक पर क्लिक करें...',
    placeholder: 'अपना संदेश टाइप करें या माइक पर क्लिक करें...',
    voiceRecognitionMode: 'वॉइस रिकॉग्निशन मोड',
    multiLanguage: 'मल्टी-भाषा (हिंदी, अंग्रेजी, तेलुगू)',
    autoDetect: 'स्वचालित पहचान (सभी भाषाएं)',
    useSelectedLanguage: 'चयनित भाषा का उपयोग करें',
    errorOccurred: 'क्षमा करें, मुझे एक त्रुटि आई। कृपया पुनः प्रयास करें।',
    madeWith: 'से बनाया गया',
    by: 'द्वारा'
  },
  ta: {
    quickActions: ['இருப்பு சரிபார்க்க', 'பரிவர்த்தனைகளைக் காண்க', 'பணம் மாற்ற', 'கடன் தகவல்', 'கார்டு சேவைகள்'],
    chatTitle: 'உங்கள் வங்கி உதவியாளருடன் அரட்டை',
    chatSubtitle: 'உங்கள் வங்கி தேவைகள் பற்றி எதையும் கேளுங்கள்',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    hideFAQs: 'FAQs மறை',
    send: 'அனுப்பு',
    listening: 'கேட்டுக்கொண்டிருக்கிறது...',
    typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்யவும் அல்லது மைக்ரோஃபோனைக் கிளிக் செய்யவும்...',
    placeholder: 'உங்கள் செய்தியை தட்டச்சு செய்யவும் அல்லது மைக்ரோஃபோனைக் கிளிக் செய்யவும்...',
    voiceRecognitionMode: 'குரல் அங்கீகார முறை',
    multiLanguage: 'பல மொழி (ஹிந்தி, ஆங்கிலம், தெலுங்கு)',
    autoDetect: 'தானியங்கி கண்டறிதல் (அனைத்து மொழிகளும்)',
    useSelectedLanguage: 'தேர்ந்தெடுக்கப்பட்ட மொழியைப் பயன்படுத்தவும்',
    errorOccurred: 'மன்னிக்கவும், பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்।',
    madeWith: 'உடன் செய்யப்பட்டது',
    by: 'மூலம்'
  },
  te: {
    quickActions: ['బ్యాలెన్స్ తనిఖీ చేయండి', 'లావాదేవీలను వీక్షించండి', 'డబ్బు బదిలీ చేయండి', 'లోన్ సమాచారం', 'కార్డ్ సేవలు'],
    chatTitle: 'మీ బ్యాంకింగ్ అసిస్టెంట్‌తో చాట్ చేయండి',
    chatSubtitle: 'మీ బ్యాంకింగ్ అవసరాల గురించి ఏదైనా అడగండి',
    faqs: 'తరచుగా అడిగే ప్రశ్నలు',
    hideFAQs: 'FAQs దాచు',
    send: 'పంపండి',
    listening: 'వినడం...',
    typeMessage: 'మీ సందేశాన్ని టైప్ చేయండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...',
    placeholder: 'మీ సందేశాన్ని టైప్ చేయండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...',
    voiceRecognitionMode: 'వాయిస్ రికగ్నిషన్ మోడ్',
    multiLanguage: 'మల్టీ-భాష (హిందీ, ఇంగ్లీష్, తెలుగు)',
    autoDetect: 'స్వయంచాలక గుర్తింపు (అన్ని భాషలు)',
    useSelectedLanguage: 'ఎంచుకున్న భాషను ఉపయోగించండి',
    errorOccurred: 'క్షమించండి, నేను లోపం ఎదుర్కొన్నాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
    madeWith: 'తో తయారు చేయబడింది',
    by: 'ద్వారా'
  },
  kn: {
    quickActions: ['ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಿ', 'ವಹಿವಾಟುಗಳನ್ನು ವೀಕ್ಷಿಸಿ', 'ಹಣವನ್ನು ವರ್ಗಾಯಿಸಿ', 'ಸಾಲದ ಮಾಹಿತಿ', 'ಕಾರ್ಡ್ ಸೇವೆಗಳು']
  },
  ml: {
    quickActions: ['ബാലൻസ് പരിശോധിക്കുക', 'ഇടപാടുകൾ കാണുക', 'പണം കൈമാറുക', 'ലോൺ വിവരങ്ങൾ', 'കാർഡ് സേവനങ്ങൾ']
  },
  mr: {
    quickActions: ['शेष तपासा', 'व्यवहार पहा', 'पैसे हस्तांतरित करा', 'कर्ज माहिती', 'कार्ड सेवा']
  },
  gu: {
    quickActions: ['બેલેન્સ તપાસો', 'વ્યવહારો જુઓ', 'પૈસા ટ્રાન્સફર કરો', 'લોન માહિતી', 'કાર્ડ સેવાઓ']
  },
  bn: {
    quickActions: ['ব্যালেন্স চেক করুন', 'লেনদেন দেখুন', 'টাকা স্থানান্তর করুন', 'ঋণের তথ্য', 'কার্ড পরিষেবা']
  },
  or: {
    quickActions: ['ବାଲାନ୍ସ ଯାଞ୍ଚ କରନ୍ତୁ', 'ଟ୍ରାନ୍ସାକ୍ସନ୍ ଦେଖନ୍ତୁ', 'ଟଙ୍କା ସ୍ଥାନାନ୍ତର କରନ୍ତୁ', 'ଋଣ ସୂଚନା', 'କାର୍ଡ ସେବା']
  }
};

// Get translated text
export const getText = (key, language = 'en') => {
  if (language === 'en') {
    return UI_TEXT[key];
  }
  
  const translation = TRANSLATIONS[language];
  if (translation && translation[key]) {
    return translation[key];
  }
  
  // Fallback: return English text (backend will translate if needed)
  return UI_TEXT[key];
};

// Get quick actions for a language
export const getQuickActions = (language = 'en') => {
  if (language === 'en') {
    return UI_TEXT.quickActions;
  }
  
  const translation = TRANSLATIONS[language];
  if (translation && translation.quickActions) {
    return translation.quickActions;
  }
  
  // Return English actions - backend will translate when sent
  return UI_TEXT.quickActions;
};

