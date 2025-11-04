'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Signup page
    'welcome': 'Welcome to the Entrepreneur Prompt Gate',
    'getStarted': 'Get Started',
    'enterInfo': 'Enter your information to begin your entrepreneurial journey',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'email': 'Email Address',
    'phone': 'Phone Number',
    'continue': 'Continue',
    'submitting': 'Submitting...',
    'fillAllFields': 'Please fill in all fields',
    'validEmail': 'Please enter a valid email address',
    'saveError': 'Failed to save information. Please try again.',
    'errorOccurred': 'An error occurred. Please try again.',
    'infoSecure': 'Your information is secure and will only be used for this service',
    
    // Main page
    'entrepreneurJourney': 'Entrepreneur Journey',
    'guidedApproach': 'A guided approach to building your entrepreneurial project, stage by stage',
    'generatePrompt': 'Generate Prompt',
    'generating': 'Generating...',
    'generatedPrompt': 'Generated Prompt',
    'copy': 'Copy',
    'copied': 'Copied',
    'sendToAI': 'Send to AI Model',
    'reviewPrompt': 'Review the generated prompt above. Click "Send to AI Model" to proceed with your deployment platform.',
    'completeQuestions': 'Complete the questions and generate your optimized prompt',
    'deploymentPlatforms': 'Deployment Platforms',
    'selectPlatform': 'Select your deployment platform and paste the generated prompt to begin.',
    'enterpriseGrade': 'Enterprise-grade prompt generation for entrepreneurial journeys',
    'loading': 'Loading...',
    
    // Stages
    'stage1': 'Idea Generation & Business Model',
    'stage2': 'MVP Development',
    'stage3': 'Investor Pitching',
    'stage4': 'Customer Acquisition & Marketing',
    'stage5': 'Scaling & Growth',
    'stage6': 'Operations & Optimization',
  },
  ar: {
    // Signup page
    'welcome': 'مرحباً بك في بوابة البرومبت لرائد الأعمال',
    'getStarted': 'ابدأ الآن',
    'enterInfo': 'أدخل معلوماتك لبدء رحلتك الريادية',
    'firstName': 'الاسم الأول',
    'lastName': 'اسم العائلة',
    'email': 'البريد الإلكتروني',
    'phone': 'رقم الهاتف',
    'continue': 'متابعة',
    'submitting': 'جاري الإرسال...',
    'fillAllFields': 'يرجى ملء جميع الحقول',
    'validEmail': 'يرجى إدخال بريد إلكتروني صحيح',
    'saveError': 'فشل حفظ المعلومات. يرجى المحاولة مرة أخرى.',
    'errorOccurred': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    'infoSecure': 'معلوماتك آمنة وستُستخدم فقط لهذه الخدمة',
    
    // Main page
    'entrepreneurJourney': 'رحلة رائد الأعمال',
    'guidedApproach': 'نهج موجه لبناء مشروعك الريادي، مرحلة بمرحلة',
    'generatePrompt': 'إنشاء البرومبت',
    'generating': 'جاري الإنشاء...',
    'generatedPrompt': 'البرومبت المُنشأ',
    'copy': 'نسخ',
    'copied': 'تم النسخ',
    'sendToAI': 'إرسال إلى نموذج الذكاء الاصطناعي',
    'reviewPrompt': 'راجع البرومبت المُنشأ أعلاه. اضغط "إرسال إلى نموذج الذكاء الاصطناعي" للمتابعة مع منصة النشر.',
    'completeQuestions': 'أكمل الأسئلة وأنشئ برومبتك المحسّن',
    'deploymentPlatforms': 'منصات النشر',
    'selectPlatform': 'اختر منصة النشر والصق البرومبت المُنشأ لبدء العمل.',
    'enterpriseGrade': 'إنشاء برومبت احترافي لرحلات ريادة الأعمال',
    'loading': 'جاري التحميل...',
    
    // Stages
    'stage1': 'توليد الأفكار ونموذج العمل',
    'stage2': 'تطوير النموذج الأولي',
    'stage3': 'عرض المشروع على المستثمرين',
    'stage4': 'اكتساب العملاء والتسويق',
    'stage5': 'التوسع والنمو',
    'stage6': 'العمليات والتحسين',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang === 'en' || savedLang === 'ar') {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update HTML dir attribute for RTL support
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }

  useEffect(() => {
    // Set initial dir and lang attributes
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
