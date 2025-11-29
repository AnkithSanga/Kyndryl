# Translation & FAQ Integration Guide

## Overview

This document describes the integration of open-source translation packages and comprehensive FAQ menus for the banking assistant application.

## Features Added

### 1. Translation Service
- **Library Used**: `deep-translator` (GoogleTranslator) and `langdetect`
- **Capabilities**:
  - Automatic language detection from user input
  - Translation between English, Hindi, and Tamil
  - Real-time translation of responses based on user's preferred language
  - Translation of FAQ content on-the-fly

### 2. FAQ System
- **7 Major Categories**:
  1. Account Services (🏦)
  2. Transactions & Statements (💳)
  3. Money Transfers (💸)
  4. Cards & Payments (💳)
  5. Loans & Credit (💰)
  6. Digital Banking (📱)
  7. Customer Support (🆘)

- **Features**:
  - Interactive FAQ menu with expandable questions
  - Category-based organization
  - Click to send FAQ question to chat
  - Automatic translation of FAQs based on selected language
  - Keyword-based FAQ matching

### 3. Enhanced Intent Detection
- Improved keyword matching for banking services
- Support for multiple intents:
  - Account Services
  - Digital Banking
  - Customer Support
  - (Plus existing: Balance, Transactions, Transfers, Loans, Cards)

## Installation

### Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

New packages added:
- `deep-translator==1.11.4` - For translation services
- `langdetect==1.0.9` - For language detection

### Frontend

No new dependencies required. Uses existing React and Axios.

## API Endpoints

### New Endpoints

1. **GET `/api/faq/categories`**
   - Get all FAQ categories
   - Query params: `language` (en/hi/ta)
   - Returns: List of categories with icons

2. **GET `/api/faq/category/<category_id>`**
   - Get FAQs for a specific category
   - Query params: `language` (en/hi/ta)
   - Returns: Category with all FAQs

3. **POST `/api/translate`**
   - Translate text to target language
   - Body: `{ "text": "...", "target_language": "hi", "source_language": "auto" }`
   - Returns: Translated text

### Updated Endpoints

**POST `/api/chat`**
- Now supports automatic translation
- Enhanced intent detection
- FAQ keyword matching
- Body includes optional `translate` flag (default: true)

## Usage

### Frontend

1. **FAQ Menu**:
   - Click the "📚 FAQs" button in chat header
   - Browse categories and questions
   - Click any FAQ to send it to chat
   - FAQs are automatically translated based on selected language

2. **Translation**:
   - Select language from header dropdown
   - All responses are automatically translated
   - User can type in any language (English, Hindi, Tamil)
   - System detects language and responds accordingly

### Backend

The translation service automatically:
- Detects input language
- Translates responses to user's preferred language
- Translates FAQ content on-demand
- Falls back to pre-translated responses if translation fails

## File Structure

```
backend/
├── app.py                    # Main API with translation & FAQ integration
├── translation_service.py    # Translation utilities
├── faq_data.py              # Comprehensive FAQ database
└── requirements.txt          # Updated dependencies

frontend/src/components/
├── ChatInterface.js          # Updated with FAQ menu
├── FAQMenu.js               # New FAQ menu component
└── FAQMenu.css              # FAQ menu styles
```

## Translation Flow

1. User sends message in any language
2. System detects language using `langdetect`
3. Intent is detected using enhanced keyword matching
4. FAQ is searched first, then fallback to mocked responses
5. Response is translated to user's preferred language
6. Translated response is sent back

## FAQ Categories Details

### Account Services
- Check balance
- Open new account
- Account types
- Update account details

### Transactions & Statements
- View transaction history
- Download statements
- Transaction limits
- Dispute transactions

### Money Transfers
- Transfer methods (NEFT, RTGS, IMPS, UPI)
- Add beneficiary
- Transfer limits
- UPI setup

### Cards & Payments
- Activate cards
- Block lost/stolen cards
- Credit card limits
- Pay credit card bills

### Loans & Credit
- Loan products
- Apply for loans
- Interest rates
- Check loan status

### Digital Banking
- Internet banking registration
- Mobile app download
- Password reset
- Transaction alerts

### Customer Support
- Contact information
- Branch timings
- File complaints
- Support channels

## Testing

1. **Test Translation**:
   ```bash
   # Send message in Hindi
   POST /api/chat
   {
     "message": "मेरा बैलेंस क्या है?",
     "language": "hi",
     "session_id": "test123"
   }
   ```

2. **Test FAQ**:
   ```bash
   # Get FAQ categories
   GET /api/faq/categories?language=en
   
   # Get specific category
   GET /api/faq/category/account_services?language=hi
   ```

3. **Test Translation API**:
   ```bash
   POST /api/translate
   {
     "text": "How do I check my balance?",
     "target_language": "hi",
     "source_language": "en"
   }
   ```

## Notes

- Translation uses Google Translator (via deep-translator) - requires internet connection
- FAQ data is stored in English and translated on-demand
- Language detection may not be 100% accurate for very short messages
- Translation fallback: If translation fails, system uses pre-translated responses
- FAQ keyword matching searches English keywords, then translates response

## Future Enhancements

- [ ] Cache translated FAQs for better performance
- [ ] Add more languages (Spanish, French, etc.)
- [ ] Implement translation quality scoring
- [ ] Add FAQ search functionality
- [ ] Voice interaction integration (next phase)

## Troubleshooting

**Translation not working?**
- Check internet connection (required for Google Translator)
- Verify `deep-translator` and `langdetect` are installed
- Check backend logs for translation errors

**FAQs not showing?**
- Ensure backend is running on port 5000
- Check browser console for API errors
- Verify FAQ endpoints are accessible

**Language detection issues?**
- System falls back to keyword-based detection
- Very short messages may default to English
- User can manually select language from dropdown

