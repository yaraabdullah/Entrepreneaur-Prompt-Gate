'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={`fixed top-8 z-50 ${language === 'ar' ? 'left-8' : 'right-8'}`}>
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="border-t border-b border-gray-900 py-3 px-6 text-xs font-normal text-gray-900 uppercase tracking-wider hover:opacity-60 transition-opacity"
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>
    </div>
  )
}
