'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!email) {
      setError(t('enterEmail'))
      setIsSubmitting(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t('validEmail'))
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('userSignedUp', 'true')
        localStorage.setItem('userEmail', email)
        router.push('/')
      } else {
        setError(data.error || t('loginError'))
      }
    } catch (err) {
      setError(t('errorOccurred'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-8 py-24">
      <div className="max-w-md w-full">
        <div className="mb-16 border-t border-gray-900 pt-12">
          <h2 className="text-5xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            {t('welcomeBack')}
          </h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed uppercase tracking-wider">
            {t('enterLoginInfo')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              {t('email')} <span className="ml-2 text-gray-900">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              required
              className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-all duration-200 bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:pb-6"
              placeholder="your.email@example.com"
            />
          </div>

          {error && (
            <div className="border-t border-b border-gray-300 py-6">
              <p className="text-xs font-light text-gray-600 uppercase tracking-wider whitespace-pre-line leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider transition-opacity ${
              isSubmitting
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:opacity-60'
            }`}
          >
            {isSubmitting ? t('loggingIn') : t('login')}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider">
            {t('noAccount')}{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              {t('goToSignup')}
            </button>
          </p>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-900">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider text-center">
            {t('infoSecure')}
          </p>
        </div>
      </div>
    </main>
  )
}


