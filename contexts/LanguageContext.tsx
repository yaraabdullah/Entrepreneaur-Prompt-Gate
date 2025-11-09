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
    'enterEmail': 'Please enter your email address',
    'fillAllFields': 'Please fill in all fields',
    'validEmail': 'Please enter a valid email address',
    'saveError': 'Failed to save information. Please try again.',
    'errorOccurred': 'An error occurred. Please try again.',
    'infoSecure': 'Your information is secure and will only be used for this service',
    'haveAccount': 'Already have an account?',
    'goToLogin': 'Go to login',
    
    // Login page
    'welcomeBack': 'Welcome back',
    'enterLoginInfo': 'Enter your email to continue your journey',
    'login': 'Log in',
    'loggingIn': 'Logging in...',
    'loginError': 'Failed to log in. Please try again.',
    'noAccount': "Don't have an account?",
    'goToSignup': 'Sign up instead',
    
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
    'stage1Description': 'Define your core business concept and validate your idea',
    'stage1Q1Label': 'What is your business idea?',
    'stage1Q1Placeholder': 'Describe your business concept in detail',
    'stage1Q2Label': 'What problem does your idea solve?',
    'stage1Q2Placeholder': 'Describe the specific problem or pain point',
    'stage1Q3Label': 'Who is your target market?',
    'stage1Q3Placeholder': 'Define your ideal customer segments',
    'stage1Q4Label': 'What makes your solution unique?',
    'stage1Q4Placeholder': 'Explain your competitive advantage',
    'stage1Q5Label': 'How will you generate revenue?',
    'stage1Q5Placeholder': 'Describe your revenue streams and business model',
    'stage2Description': 'Build and validate your minimum viable product',
    'stage2Q1Label': 'What are the core features of your MVP?',
    'stage2Q1Placeholder': 'List the essential features that define your MVP',
    'stage2Q2Label': 'What technology stack are you considering?',
    'stage2Q2Placeholder': 'Mention technologies, frameworks, or platforms',
    'stage2Q3Label': 'What is your development timeline?',
    'stage2Q3Placeholder': 'e.g., 3 months, 6 months',
    'stage2Q4Label': 'How will you measure MVP success?',
    'stage2Q4Placeholder': 'Define key metrics and validation criteria',
    'stage2Q5Label': 'What are the main technical challenges?',
    'stage2Q5Placeholder': 'Identify potential technical hurdles',
    'stage3Description': 'Prepare your pitch deck and investor presentation',
    'stage3Q1Label': 'How much funding are you seeking?',
    'stage3Q1Placeholder': 'e.g., $500K seed round',
    'stage3Q2Label': 'How will you use the funding?',
    'stage3Q2Placeholder': 'Break down allocation: development, marketing, operations',
    'stage3Q3Label': 'What traction do you have?',
    'stage3Q3Placeholder': 'Users, revenue, partnerships, metrics',
    'stage3Q4Label': 'What is your addressable market size?',
    'stage3Q4Placeholder': 'Total Addressable Market (TAM) analysis',
    'stage3Q5Label': 'What is your exit strategy?',
    'stage3Q5Placeholder': 'Long-term vision and exit plans',
    'stage4Description': 'Develop your go-to-market strategy',
    'stage4Q1Label': 'Who is your ideal customer?',
    'stage4Q1Placeholder': 'Detailed customer persona and characteristics',
    'stage4Q2Label': 'What marketing channels will you use?',
    'stage4Q2Placeholder': 'Social media, content marketing, paid ads, partnerships',
    'stage4Q3Label': 'What is your pricing strategy?',
    'stage4Q3Placeholder': 'Pricing model and competitive positioning',
    'stage4Q4Label': 'What is your value proposition?',
    'stage4Q4Placeholder': 'Clear value proposition for your target customers',
    'stage4Q5Label': 'What is your customer acquisition cost target?',
    'stage4Q5Placeholder': 'CAC target and LTV:CAC ratio',
    'stage5Description': 'Plan for sustainable growth and scaling',
    'stage5Q1Label': 'What is your growth strategy?',
    'stage5Q1Placeholder': 'Organic growth, partnerships, expansion plans',
    'stage5Q2Label': 'How will you scale your team?',
    'stage5Q2Placeholder': 'Hiring plans and organizational structure',
    'stage5Q3Label': 'What operational challenges do you anticipate?',
    'stage5Q3Placeholder': 'Key operational hurdles in scaling',
    'stage5Q4Label': 'Are you planning geographic or market expansion?',
    'stage5Q4Placeholder': 'Expansion strategy and target markets',
    'stage5Q5Label': 'What strategic partnerships are you pursuing?',
    'stage5Q5Placeholder': 'Partnership opportunities and alliances',
    'stage6Description': 'Optimize operations and improve efficiency',
    'stage6Q1Label': 'What areas need operational optimization?',
    'stage6Q1Placeholder': 'Processes, workflows, systems that need improvement',
    'stage6Q2Label': 'What can be automated?',
    'stage6Q2Placeholder': 'Tasks and processes suitable for automation',
    'stage6Q3Label': 'What are your key operational metrics?',
    'stage6Q3Placeholder': 'KPIs you track for operational performance',
    'stage6Q4Label': 'Where can you optimize costs?',
    'stage6Q4Placeholder': 'Cost reduction opportunities',
    'stage6Q5Label': 'How do you maintain quality standards?',
    'stage6Q5Placeholder': 'Quality assurance processes and standards',
  },
  ar: {
    // Signup page
    'welcome': 'مرحباً بك في بوابة الأوامر لرائد الأعمال',
    'getStarted': 'ابدأ الآن',
    'enterInfo': 'أدخل معلوماتك لبدء رحلتك الريادية',
    'firstName': 'الاسم الأول',
    'lastName': 'اسم العائلة',
    'email': 'البريد الإلكتروني',
    'phone': 'رقم الهاتف',
    'continue': 'متابعة',
    'submitting': 'جاري الإرسال...',
    'enterEmail': 'يرجى إدخال بريدك الإلكتروني',
    'fillAllFields': 'يرجى ملء جميع الحقول',
    'validEmail': 'يرجى إدخال بريد إلكتروني صحيح',
    'saveError': 'فشل حفظ المعلومات. يرجى المحاولة مرة أخرى.',
    'errorOccurred': 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    'infoSecure': 'معلوماتك آمنة وستُستخدم فقط لهذه الخدمة',
    'haveAccount': 'هل لديك حساب بالفعل؟',
    'goToLogin': 'اذهب إلى تسجيل الدخول',
    
    // Login page
    'welcomeBack': 'مرحباً بعودتك',
    'enterLoginInfo': 'أدخل بريدك الإلكتروني لمتابعة رحلتك',
    'login': 'تسجيل الدخول',
    'loggingIn': 'جاري تسجيل الدخول...',
    'loginError': 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.',
    'noAccount': 'ليس لديك حساب؟',
    'goToSignup': 'سجل الآن',
    
    // Main page
    'entrepreneurJourney': 'رحلة رائد الأعمال',
    'guidedApproach': 'نهج موجه لبناء مشروعك الريادي، مرحلة بمرحلة',
    'generatePrompt': 'إنشاء الأمر',
    'generating': 'جاري الإنشاء...',
    'generatedPrompt': 'الأمر المُنشأ',
    'copy': 'نسخ',
    'copied': 'تم النسخ',
    'sendToAI': 'إرسال إلى نموذج الذكاء الاصطناعي',
    'reviewPrompt': 'راجع الأمر المُنشأ أعلاه. اضغط "إرسال إلى نموذج الذكاء الاصطناعي" للمتابعة مع منصة النشر.',
    'completeQuestions': 'أكمل الأسئلة وأنشئ أمرمك المحسّن',
    'deploymentPlatforms': 'منصات النشر',
    'selectPlatform': 'اختر منصة النشر والصق الأمر المُنشأ لبدء العمل.',
    'enterpriseGrade': 'إنشاء الأمر احترافي لرحلات ريادة الأعمال',
    'loading': 'جاري التحميل...',
    
    // Stages
    'stage1': 'توليد الأفكار ونموذج العمل',
    'stage2': 'تطوير النموذج الأولي',
    'stage3': 'عرض المشروع على المستثمرين',
    'stage4': 'اكتساب العملاء والتسويق',
    'stage5': 'التوسع والنمو',
    'stage6': 'العمليات والتحسين',
    'stage1Description': 'عرّف مفهوم عملك الأساسي وتحقق من صحة فكرتك',
    'stage1Q1Label': 'ما هي فكرتك التجارية؟',
    'stage1Q1Placeholder': 'صف مفهوم عملك بالتفصيل',
    'stage1Q2Label': 'ما المشكلة التي تحلها فكرتك؟',
    'stage1Q2Placeholder': 'اشرح المشكلة أو نقطة الألم المحددة',
    'stage1Q3Label': 'من هو السوق المستهدف لديك؟',
    'stage1Q3Placeholder': 'حدد شرائح العملاء المثالية لديك',
    'stage1Q4Label': 'ما الذي يجعل حلك فريدًا؟',
    'stage1Q4Placeholder': 'اشرح ميزتك التنافسية',
    'stage1Q5Label': 'كيف ستحقق الإيرادات؟',
    'stage1Q5Placeholder': 'صف مصادر الإيرادات ونموذج العمل لديك',
    'stage2Description': 'ابنِ نموذجك الأولي القابل للتطبيق وتحقق من صحته',
    'stage2Q1Label': 'ما هي المزايا الأساسية في نموذجك الأولي؟',
    'stage2Q1Placeholder': 'سجّل الميزات الجوهرية التي تعرّف نموذجك الأولي',
    'stage2Q2Label': 'ما هي حزمة التقنيات التي تفكر باستخدامها؟',
    'stage2Q2Placeholder': 'اذكر التقنيات أو الأطر أو المنصات المقترحة',
    'stage2Q3Label': 'ما هو الجدول الزمني للتطوير؟',
    'stage2Q3Placeholder': 'مثال: 3 أشهر، 6 أشهر',
    'stage2Q4Label': 'كيف ستقيس نجاح النموذج الأولي؟',
    'stage2Q4Placeholder': 'حدد المقاييس الرئيسية ومعايير التحقق',
    'stage2Q5Label': 'ما هي أبرز التحديات التقنية؟',
    'stage2Q5Placeholder': 'حدد العقبات التقنية المحتملة',
    'stage3Description': 'حضّر عرضك التقديمي للمستثمرين ومواد العرض',
    'stage3Q1Label': 'كم يبلغ التمويل الذي تسعى إليه؟',
    'stage3Q1Placeholder': 'مثال: جولة تمويل أولية بقيمة 500 ألف دولار',
    'stage3Q2Label': 'كيف ستستخدم التمويل؟',
    'stage3Q2Placeholder': 'قسّم المبالغ على التطوير، التسويق، العمليات',
    'stage3Q3Label': 'ما مستوى التقدم (traction) الذي حققته؟',
    'stage3Q3Placeholder': 'عدد المستخدمين، الإيرادات، الشراكات، المقاييس',
    'stage3Q4Label': 'ما حجم السوق القابل للاستهداف؟',
    'stage3Q4Placeholder': 'تحليل إجمالي السوق المتاح (TAM)',
    'stage3Q5Label': 'ما هي استراتيجية الخروج لديك؟',
    'stage3Q5Placeholder': 'رؤيتك طويلة المدى وخطط الخروج',
    'stage4Description': 'طوّر استراتيجية دخول السوق واكتساب العملاء',
    'stage4Q1Label': 'من هو عميلك المثالي؟',
    'stage4Q1Placeholder': 'وصف مفصل لشخصية العميل وخصائصه',
    'stage4Q2Label': 'ما قنوات التسويق التي ستستخدمها؟',
    'stage4Q2Placeholder': 'وسائل التواصل، التسويق بالمحتوى، الإعلانات المدفوعة، الشراكات',
    'stage4Q3Label': 'ما هي استراتيجية التسعير لديك؟',
    'stage4Q3Placeholder': 'نموذج التسعير وتموضعه التنافسي',
    'stage4Q4Label': 'ما هي القيمة المقترحة التي تقدمها؟',
    'stage4Q4Placeholder': 'قيمة العرض الواضحة لعملائك المستهدفين',
    'stage4Q5Label': 'ما هو هدفك لتكلفة اكتساب العميل؟',
    'stage4Q5Placeholder': 'هدف تكلفة اكتساب العميل ونسبة القيمة مدى الحياة إلى التكلفة',
    'stage5Description': 'خطط للنمو المستدام والتوسع',
    'stage5Q1Label': 'ما هي استراتيجية النمو لديك؟',
    'stage5Q1Placeholder': 'النمو العضوي، الشراكات، خطط التوسع',
    'stage5Q2Label': 'كيف ستوسع فريقك؟',
    'stage5Q2Placeholder': 'خطط التوظيف وهيكل المنظمة',
    'stage5Q3Label': 'ما التحديات التشغيلية التي تتوقعها؟',
    'stage5Q3Placeholder': 'العقبات التشغيلية الرئيسية أثناء التوسع',
    'stage5Q4Label': 'هل تخطط للتوسع الجغرافي أو القطاعي؟',
    'stage5Q4Placeholder': 'استراتيجية التوسع والأسواق المستهدفة',
    'stage5Q5Label': 'ما الشراكات الاستراتيجية التي تسعى إليها؟',
    'stage5Q5Placeholder': 'فرص الشراكات والتحالفات',
    'stage6Description': 'حسّن العمليات وارفع الكفاءة',
    'stage6Q1Label': 'ما المجالات التي تحتاج تحسينًا تشغيليًا؟',
    'stage6Q1Placeholder': 'العمليات، مسارات العمل، الأنظمة التي تحتاج تحسينًا',
    'stage6Q2Label': 'ما الذي يمكن أتمتته؟',
    'stage6Q2Placeholder': 'المهام والعمليات المناسبة للأتمتة',
    'stage6Q3Label': 'ما هي مؤشراتك التشغيلية الرئيسية؟',
    'stage6Q3Placeholder': 'مؤشرات الأداء الرئيسية التي تتابعها',
    'stage6Q4Label': 'أين يمكنك تحسين التكاليف؟',
    'stage6Q4Placeholder': 'فرص خفض التكاليف',
    'stage6Q5Label': 'كيف تحافظ على معايير الجودة؟',
    'stage6Q5Placeholder': 'عمليات وإجراءات ضمان الجودة',
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
