"""
Comprehensive FAQ data for banking services
Covers all major banking operations and services
"""

BANKING_FAQS = {
    'en': {
        'categories': [
            {
                'id': 'account_services',
                'title': 'Account Services',
                'icon': '🏦',
                'faqs': [
                    {
                        'question': 'How do I check my account balance?',
                        'answer': 'You can check your account balance by:\n1. Using our mobile banking app\n2. Visiting any ATM\n3. Calling our customer service\n4. Asking me right now! Your current balance is ₹25,450.00',
                        'keywords': ['balance', 'amount', 'money', 'check balance']
                    },
                    {
                        'question': 'How do I open a new account?',
                        'answer': 'To open a new account:\n1. Visit any branch with valid ID proof (Aadhaar, PAN, Passport)\n2. Fill out the account opening form\n3. Submit KYC documents\n4. Make initial deposit (minimum ₹500)\n5. Complete biometric verification\n\nYou can also apply online through our website!',
                        'keywords': ['open account', 'new account', 'account opening']
                    },
                    {
                        'question': 'What are the account types available?',
                        'answer': 'We offer:\n• Savings Account - For daily banking needs\n• Current Account - For businesses\n• Fixed Deposit - Higher interest rates\n• Recurring Deposit - Systematic savings\n• Salary Account - Special benefits for salaried individuals',
                        'keywords': ['account types', 'savings', 'current', 'fixed deposit']
                    },
                    {
                        'question': 'How do I update my account details?',
                        'answer': 'To update account details:\n1. Visit branch with updated documents\n2. Fill account modification form\n3. Submit proof of change (address, phone, email)\n4. Complete verification process\n\nFor phone/email updates, use mobile banking app.',
                        'keywords': ['update', 'modify', 'change details', 'kyc update']
                    }
                ]
            },
            {
                'id': 'transactions',
                'title': 'Transactions & Statements',
                'icon': '💳',
                'faqs': [
                    {
                        'question': 'How do I view my transaction history?',
                        'answer': 'View transactions via:\n1. Mobile banking app - Real-time transactions\n2. Internet banking - Detailed statements\n3. ATM - Mini statement\n4. Branch - Full statement printout\n\nYour recent transactions:\n• Amazon Payment - ₹1,299 (Nov 25)\n• Salary Credit - ₹50,000 (Nov 24)\n• ATM Withdrawal - ₹5,000 (Nov 23)',
                        'keywords': ['transaction', 'history', 'statement', 'mini statement']
                    },
                    {
                        'question': 'How do I download my bank statement?',
                        'answer': 'Download statements:\n1. Login to internet banking\n2. Go to "Statements" section\n3. Select date range\n4. Choose format (PDF/Excel)\n5. Download or email to registered email\n\nYou can also request via mobile app or visit branch.',
                        'keywords': ['download statement', 'bank statement', 'pdf statement']
                    },
                    {
                        'question': 'What is the transaction limit?',
                        'answer': 'Transaction limits:\n• NEFT/RTGS: Up to ₹10L per transaction\n• IMPS: Up to ₹2L per transaction\n• UPI: Up to ₹1L per transaction\n• Daily ATM withdrawal: ₹50,000\n• Daily POS limit: ₹2L\n\nLimits can be increased by visiting branch.',
                        'keywords': ['limit', 'transaction limit', 'transfer limit', 'withdrawal limit']
                    },
                    {
                        'question': 'How do I dispute a transaction?',
                        'answer': 'To dispute a transaction:\n1. Report within 3 days for best resolution\n2. Call customer care: 1800-XXX-XXXX\n3. Visit branch with transaction details\n4. Fill dispute form\n5. Investigation starts within 7 days\n\nKeep transaction receipt and account statement ready.',
                        'keywords': ['dispute', 'fraud', 'unauthorized', 'chargeback']
                    }
                ]
            },
            {
                'id': 'transfers',
                'title': 'Money Transfers',
                'icon': '💸',
                'faqs': [
                    {
                        'question': 'How do I transfer money to another account?',
                        'answer': 'Transfer money via:\n1. NEFT - For amounts above ₹2L (takes 2-4 hours)\n2. RTGS - For amounts above ₹2L (real-time)\n3. IMPS - Instant transfer (24/7)\n4. UPI - Using mobile number/QR code\n5. Bank transfer - Using account number and IFSC\n\nI can help you initiate a transfer. Please provide:\n• Recipient account number\n• IFSC code\n• Amount\n• Purpose',
                        'keywords': ['transfer', 'send money', 'neft', 'rtgs', 'imps', 'upi']
                    },
                    {
                        'question': 'What is UPI and how do I use it?',
                        'answer': 'UPI (Unified Payments Interface) allows instant money transfer:\n1. Link bank account to UPI app (PhonePe, Google Pay, Paytm)\n2. Create UPI ID (e.g., yourname@bankname)\n3. Send money using mobile number or UPI ID\n4. Scan QR code for payments\n5. Works 24/7, instant transfers\n\nNo need to share bank details!',
                        'keywords': ['upi', 'unified payments', 'phonepe', 'google pay', 'paytm']
                    },
                    {
                        'question': 'What are NEFT, RTGS, and IMPS?',
                        'answer': 'Transfer methods:\n\nNEFT (National Electronic Funds Transfer):\n• For any amount\n• Batch processing (hourly)\n• Takes 2-4 hours\n• Available 24/7\n\nRTGS (Real Time Gross Settlement):\n• Minimum ₹2L\n• Real-time transfer\n• Immediate settlement\n• Business hours only\n\nIMPS (Immediate Payment Service):\n• Instant transfer\n• 24/7 availability\n• Up to ₹2L per transaction\n• Using mobile number or MMID',
                        'keywords': ['neft', 'rtgs', 'imps', 'fund transfer']
                    },
                    {
                        'question': 'How do I add a beneficiary?',
                        'answer': 'Add beneficiary:\n1. Login to internet banking\n2. Go to "Fund Transfer" → "Add Beneficiary"\n3. Enter account number, IFSC, name\n4. Verify details\n5. Confirm via OTP\n6. Wait 4 hours for activation (security)\n\nFor mobile banking, go to "Manage Beneficiaries" section.',
                        'keywords': ['beneficiary', 'add payee', 'save beneficiary']
                    }
                ]
            },
            {
                'id': 'cards',
                'title': 'Cards & Payments',
                'icon': '💳',
                'faqs': [
                    {
                        'question': 'How do I activate my debit/credit card?',
                        'answer': 'Activate card:\n1. Call 24/7 helpline: 1800-XXX-XXXX\n2. Follow IVR instructions\n3. Enter card number and CVV\n4. Set PIN\n5. Card activated instantly\n\nOr use mobile banking app:\n• Go to "Card Services"\n• Select "Activate Card"\n• Enter details and OTP',
                        'keywords': ['activate card', 'card activation', 'debit card', 'credit card']
                    },
                    {
                        'question': 'How do I block my lost/stolen card?',
                        'answer': 'Block card immediately:\n1. Call 24/7 helpline: 1800-XXX-XXXX\n2. Report lost/stolen card\n3. Card blocked instantly\n4. Request replacement (takes 5-7 days)\n\nOr use mobile banking:\n• Go to "Card Services"\n• Select "Block Card"\n• Confirm via OTP\n\nNo charges for blocking. Replacement fee: ₹200',
                        'keywords': ['block card', 'lost card', 'stolen card', 'card replacement']
                    },
                    {
                        'question': 'What is my credit card limit?',
                        'answer': 'Your current credit card details:\n• Credit Limit: ₹2,00,000\n• Available Credit: ₹1,75,000\n• Cash Limit: ₹50,000\n• Due Date: 5th of every month\n\nTo increase limit:\n1. Visit branch\n2. Submit income proof\n3. Credit check will be done\n4. Limit increased based on eligibility',
                        'keywords': ['credit limit', 'card limit', 'available credit']
                    },
                    {
                        'question': 'How do I pay my credit card bill?',
                        'answer': 'Pay credit card bill:\n1. Auto-debit from savings account (set up once)\n2. Mobile banking app - Pay using debit card\n3. Internet banking - Transfer to credit card account\n4. UPI - Using credit card number\n5. Visit branch - Cash/cheque payment\n\nMinimum payment: 5% of outstanding or ₹500 (whichever is higher)',
                        'keywords': ['credit card bill', 'card payment', 'pay bill']
                    }
                ]
            },
            {
                'id': 'loans',
                'title': 'Loans & Credit',
                'icon': '💰',
                'faqs': [
                    {
                        'question': 'What loan products do you offer?',
                        'answer': 'We offer:\n\n1. Personal Loans:\n   • Amount: Up to ₹20L\n   • Interest: 10.5% - 18% p.a.\n   • Tenure: 1-5 years\n   • Quick approval\n\n2. Home Loans:\n   • Amount: Up to ₹1Cr\n   • Interest: 8.5% - 9.5% p.a.\n   • Tenure: Up to 30 years\n   • Tax benefits available\n\n3. Car Loans:\n   • Amount: Up to ₹50L\n   • Interest: 8.75% - 12% p.a.\n   • Tenure: 1-7 years\n   • 100% on-road price financing\n\n4. Education Loans:\n   • Amount: Up to ₹40L\n   • Interest: 8.5% - 11% p.a.\n   • Moratorium period available',
                        'keywords': ['loan', 'personal loan', 'home loan', 'car loan', 'education loan']
                    },
                    {
                        'question': 'How do I apply for a loan?',
                        'answer': 'Apply for loan:\n1. Online: Visit our website, fill application\n2. Mobile app: Go to "Loans" section\n3. Branch: Meet loan officer\n4. Call: 1800-XXX-XXXX\n\nDocuments needed:\n• ID proof (Aadhaar/PAN)\n• Address proof\n• Income proof (salary slip/ITR)\n• Bank statements (6 months)\n• Property documents (for home/car loan)\n\nPre-approval available in 24 hours!',
                        'keywords': ['apply loan', 'loan application', 'get loan']
                    },
                    {
                        'question': 'What is the interest rate on loans?',
                        'answer': 'Current interest rates:\n\n• Personal Loan: 10.5% - 18% p.a.\n• Home Loan: 8.5% - 9.5% p.a.\n• Car Loan: 8.75% - 12% p.a.\n• Education Loan: 8.5% - 11% p.a.\n• Gold Loan: 9% - 12% p.a.\n\nRates vary based on:\n• Credit score\n• Income\n• Loan amount\n• Tenure\n• Employment type\n\nCheck your personalized rate using our EMI calculator!',
                        'keywords': ['interest rate', 'loan rate', 'emi', 'emi calculator']
                    },
                    {
                        'question': 'How do I check my loan status?',
                        'answer': 'Check loan status:\n1. Mobile banking app - "My Loans" section\n2. Internet banking - Loan dashboard\n3. Call customer service: 1800-XXX-XXXX\n4. Visit branch with loan reference number\n\nYou can also track:\n• Disbursement status\n• EMI schedule\n• Outstanding amount\n• Payment history\n• Prepayment options',
                        'keywords': ['loan status', 'check loan', 'loan details', 'emi schedule']
                    }
                ]
            },
            {
                'id': 'digital_banking',
                'title': 'Digital Banking',
                'icon': '📱',
                'faqs': [
                    {
                        'question': 'How do I register for internet banking?',
                        'answer': 'Register for internet banking:\n1. Visit branch with account details\n2. Fill registration form\n3. Get user ID and temporary password\n4. Login and set new password\n5. Complete security questions\n\nOr register online:\n• Visit bank website\n• Click "Register"\n• Enter account number, mobile, DOB\n• Verify via OTP\n• Set credentials',
                        'keywords': ['internet banking', 'net banking', 'online banking', 'register']
                    },
                    {
                        'question': 'How do I download the mobile banking app?',
                        'answer': 'Download mobile banking app:\n1. Android: Google Play Store - Search "Bank Name"\n2. iOS: App Store - Search "Bank Name"\n3. Scan QR code from bank website\n4. Install and open app\n5. Register using account number and mobile\n6. Set MPIN for transactions\n\nApp features:\n• Balance inquiry\n• Fund transfers\n• Bill payments\n• Card management\n• Loan services',
                        'keywords': ['mobile app', 'download app', 'banking app', 'mobile banking']
                    },
                    {
                        'question': 'I forgot my internet banking password. What should I do?',
                        'answer': 'Reset password:\n1. Visit bank website\n2. Click "Forgot Password"\n3. Enter user ID and registered mobile\n4. Receive OTP\n5. Enter OTP and set new password\n\nOr visit branch:\n• Fill password reset form\n• Submit ID proof\n• New password set immediately\n\nFor mobile banking MPIN reset, use app settings.',
                        'keywords': ['forgot password', 'reset password', 'change password', 'password reset']
                    },
                    {
                        'question': 'How do I enable/disable transaction alerts?',
                        'answer': 'Manage alerts:\n1. Login to internet banking\n2. Go to "Alerts & Notifications"\n3. Select alert types:\n   • SMS alerts\n   • Email alerts\n   • Push notifications\n4. Set transaction amount threshold\n5. Save preferences\n\nVia mobile app:\n• Settings → Notifications\n• Enable/disable specific alerts\n\nAlerts for: Balance updates, transactions, bill payments, card usage',
                        'keywords': ['alerts', 'notifications', 'sms alert', 'transaction alert']
                    }
                ]
            },
            {
                'id': 'support',
                'title': 'Customer Support',
                'icon': '🆘',
                'faqs': [
                    {
                        'question': 'What are your customer service contact details?',
                        'answer': 'Contact us:\n\n24/7 Helpline:\n• Phone: 1800-XXX-XXXX (Toll-free)\n• Email: support@bankname.com\n• WhatsApp: +91-XXXXXXXXXX\n\nBranch Locator:\n• Visit website: www.bankname.com/branches\n• Mobile app: "Find Branch" feature\n• Call helpline for nearest branch\n\nSocial Media:\n• Twitter: @bankname\n• Facebook: /bankname\n• Instagram: @bankname',
                        'keywords': ['contact', 'customer service', 'helpline', 'support', 'phone number']
                    },
                    {
                        'question': 'What are your branch timings?',
                        'answer': 'Branch timings:\n\nWeekdays (Mon-Fri):\n• 9:30 AM - 4:00 PM (Core banking)\n• 9:30 AM - 6:00 PM (Extended services)\n\nSaturday:\n• 9:30 AM - 1:00 PM\n\nSunday: Closed\n\nNote: Some branches have extended hours. Check branch locator for specific timings.\n\nATM services available 24/7!',
                        'keywords': ['branch timing', 'working hours', 'bank hours', 'atm']
                    },
                    {
                        'question': 'How do I file a complaint?',
                        'answer': 'File complaint:\n1. Online: Visit website → "Complaints"\n2. Mobile app: "Help & Support" → "Register Complaint"\n3. Email: complaints@bankname.com\n4. Branch: Fill complaint form\n5. Phone: 1800-XXX-XXXX\n\nComplaint tracking:\n• Get reference number\n• Track status online/app\n• Resolution within 7-15 days\n• Escalate if not resolved\n\nFor banking ombudsman, visit RBI website.',
                        'keywords': ['complaint', 'grievance', 'file complaint', 'customer complaint']
                    }
                ]
            }
        ]
    }
}

def get_faq_by_keyword(keyword, language='en'):
    """Get FAQ answer based on keyword matching
    Works with any input language by checking both direct matches and translated keywords"""
    # Import here to avoid circular import
    try:
        from translation_service import translate_text, detect_language
    except ImportError:
        # If translation service not available, use simple matching
        translate_text = None
        detect_language = None
    
    faqs_data = BANKING_FAQS.get('en', BANKING_FAQS['en'])  # Always search in English FAQs
    keyword_lower = keyword.lower()
    
    # Try direct keyword matching first
    for category in faqs_data['categories']:
        for faq in category['faqs']:
            # Check if any keyword matches
            for kw in faq['keywords']:
                if kw.lower() in keyword_lower or keyword_lower in kw.lower():
                    return faq['answer']
    
    # If no direct match and translation is available, try translating the keyword to English and search again
    if translate_text and detect_language:
        try:
            detected_lang = detect_language(keyword)
            if detected_lang != 'en':
                # Translate keyword to English for matching
                translated_keyword = translate_text(keyword, 'en', detected_lang)
                translated_lower = translated_keyword.lower()
                
                # Search again with translated keyword
                for category in faqs_data['categories']:
                    for faq in category['faqs']:
                        for kw in faq['keywords']:
                            if kw.lower() in translated_lower or translated_lower in kw.lower():
                                return faq['answer']
        except Exception:
            pass  # If translation fails, just return None
    
    return None

def get_faqs_by_category(category_id, language='en'):
    """Get all FAQs for a specific category"""
    faqs_data = BANKING_FAQS.get(language, BANKING_FAQS['en'])
    
    for category in faqs_data['categories']:
        if category['id'] == category_id:
            return category
    
    return None

def get_all_categories(language='en'):
    """Get all FAQ categories"""
    faqs_data = BANKING_FAQS.get(language, BANKING_FAQS['en'])
    return [{'id': cat['id'], 'title': cat['title'], 'icon': cat['icon']} for cat in faqs_data['categories']]

