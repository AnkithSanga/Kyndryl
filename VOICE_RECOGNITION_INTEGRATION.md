# Voice Recognition Integration

## Overview
Voice recognition has been successfully integrated into the banking assistant application, allowing users to interact with the chatbot using their voice. The feature supports both automatic language detection and manual language selection.

## Features

### 1. **Voice Input**
- Users can click the microphone button (🎤) to start voice input
- The recognized speech is automatically converted to text and sent to the chat
- Visual feedback shows when the system is listening (red pulsing button)

### 2. **Language Detection Modes**

#### **Auto Language Detection Mode**
- Automatically detects the language being spoken
- Supports all 18 languages:
  - Indian Languages: English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali
  - International Languages: Spanish, French, German, Portuguese, Chinese, Japanese, Korean, Arabic, Russian
- Browser's speech recognition engine automatically identifies the language

#### **Manual Language Selection Mode**
- User selects a specific language from the dropdown
- Voice recognition is configured to listen for that specific language only
- More accurate recognition when user knows which language they'll speak

### 3. **User Interface**
- **Microphone Button**: Green button (🎤) when idle, red pulsing button (⏹️) when listening
- **Voice Options Toggle**: Click the microphone icon in the input area to access voice settings
- **Mode Selection**: Radio buttons to choose between "Auto Detect Language" and "Use Selected Language"
- **Listening Indicator**: Shows "Listening..." with a pulsing dot when actively recording

## Technical Implementation

### Frontend Changes

#### **ChatInterface.js**
- Added Web Speech API integration using `SpeechRecognition` or `webkitSpeechRecognition`
- Language code mapping from app codes to SpeechRecognition API codes
- State management for:
  - `isListening`: Tracks if voice recognition is active
  - `voiceMode`: 'auto' or 'manual'
  - `showVoiceOptions`: Controls visibility of voice settings dropdown

#### **Key Functions**
- `startListening()`: Initiates voice recognition
- `stopListening()`: Stops voice recognition
- Language mapping via `SPEECH_LANGUAGE_MAP` object

#### **ChatInterface.css**
- Styling for voice controls:
  - Voice button with hover and active states
  - Listening indicator with pulse animation
  - Voice options dropdown with smooth transitions
  - Responsive design for mobile devices

### Language Code Mapping

The application maps internal language codes to SpeechRecognition API codes:

```javascript
const SPEECH_LANGUAGE_MAP = {
  'en': 'en-US',    // English
  'hi': 'hi-IN',    // Hindi
  'ta': 'ta-IN',    // Tamil
  'te': 'te-IN',    // Telugu
  'kn': 'kn-IN',    // Kannada
  'ml': 'ml-IN',    // Malayalam
  'mr': 'mr-IN',    // Marathi
  'gu': 'gu-IN',    // Gujarati
  'bn': 'bn-IN',    // Bengali
  'es': 'es-ES',    // Spanish
  'fr': 'fr-FR',    // French
  'de': 'de-DE',    // German
  'pt': 'pt-PT',    // Portuguese
  'zh': 'zh-CN',    // Chinese
  'ja': 'ja-JP',    // Japanese
  'ko': 'ko-KR',    // Korean
  'ar': 'ar-SA',    // Arabic
  'ru': 'ru-RU'     // Russian
};
```

## How It Works

### Auto Detection Mode
1. User clicks microphone button
2. System starts listening with multiple language support
3. Browser automatically detects the spoken language
4. Speech is converted to text
5. Text is automatically sent to the chat API
6. Response is translated to the selected language (from dropdown)

### Manual Selection Mode
1. User selects a language from the header dropdown (e.g., Hindi)
2. User selects "Use Selected Language" in voice options
3. User clicks microphone button
4. System listens specifically for the selected language
5. Speech is converted to text
6. Text is sent to chat API
7. Response is in the selected language

## Browser Compatibility

### Supported Browsers
- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Safari**: Full support (iOS 14.5+)
- **Firefox**: Limited support (may require polyfill)

### Requirements
- Microphone access permission
- HTTPS connection (required for microphone access in most browsers)
- Modern browser with Web Speech API support

## User Experience

### Visual Feedback
- **Idle State**: Green microphone button (🎤)
- **Listening State**: Red pulsing button (⏹️) with animation
- **Listening Indicator**: "Listening..." text appears above input field
- **Error Handling**: Alert messages for common errors (no speech, permission denied)

### Error Handling
- **No Speech Detected**: User-friendly error message
- **Permission Denied**: Clear instructions to enable microphone access
- **Browser Not Supported**: Message suggesting Chrome, Edge, or Safari
- **Recognition Errors**: Graceful fallback with error messages

## Integration with Existing Features

### Language Translation
- Voice input works seamlessly with the existing translation system
- User can speak in any language, and responses are translated to the selected language
- Works with all 18 supported languages

### FAQ Integration
- Voice input can be used to ask FAQ questions
- Recognized text is processed the same way as typed text
- FAQ answers are translated to the selected language

### Chat History
- Voice messages are stored in chat history like typed messages
- All interactions are saved to the database

## Usage Instructions

### For Users

1. **Enable Voice Input (Auto Mode)**:
   - Click the microphone button (🎤) in the input area
   - Start speaking in any supported language
   - The system will automatically detect your language
   - Your speech will be converted to text and sent automatically

2. **Enable Manual Language Selection**:
   - Click the microphone icon (🎤) next to the input field to open voice options
   - Select "Use Selected Language" radio button
   - Select your preferred language from the header dropdown
   - Click the microphone button and speak in that language

3. **Stop Listening**:
   - Click the red stop button (⏹️) while listening
   - Or wait for speech recognition to complete automatically

### For Developers

#### Testing Voice Recognition
1. Ensure you're on HTTPS or localhost
2. Grant microphone permissions when prompted
3. Test in Chrome or Edge for best results
4. Try both auto and manual modes
5. Test with different languages

#### Troubleshooting
- **Microphone not working**: Check browser permissions
- **Language not detected**: Try manual mode with specific language
- **Recognition errors**: Check browser console for detailed errors
- **Not supported**: Use Chrome, Edge, or Safari

## Future Enhancements

- [ ] Add continuous listening mode (keep listening after each recognition)
- [ ] Add voice feedback (text-to-speech for responses)
- [ ] Improve language detection accuracy
- [ ] Add support for more regional language variants
- [ ] Add voice command shortcuts
- [ ] Implement offline speech recognition (using WebAssembly)
- [ ] Add voice activity detection (VAD) for better accuracy
- [ ] Support for multiple languages in a single utterance

## Technical Notes

- Uses Web Speech API (no external dependencies required)
- Speech recognition happens client-side
- Recognized text is sent to backend API for processing
- All existing translation and FAQ features work with voice input
- No changes required to backend API

## Security Considerations

- Microphone access requires user permission
- Speech recognition happens locally in the browser
- Only recognized text (not audio) is sent to the server
- HTTPS required for microphone access in production
- No audio data is stored or transmitted

## Performance

- Voice recognition adds minimal overhead
- Recognition typically completes in 1-3 seconds
- No impact on existing chat functionality
- Smooth animations and transitions
- Responsive design for all screen sizes


