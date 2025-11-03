'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SignUpData {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validation
    if (!formData.email || !formData.phone || !formData.firstName || !formData.lastName) {
      setError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Save to localStorage to remember sign-up
        localStorage.setItem('userSignedUp', 'true')
        localStorage.setItem('userEmail', formData.email)
        
        // Redirect to main page
        router.push('/')
      } else {
        setError(data.error || 'Failed to save information. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-8 py-24">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-16 border-t border-gray-900 pt-12">
          <h2 className="text-sm font-light text-gray-600 uppercase tracking-wider mb-8">
            Welcome to the Entrepreneur Prompt Gate
          </h2>
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            Get Started
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed uppercase tracking-wider">
            Enter your information to begin your entrepreneurial journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              First Name <span className="ml-2 text-gray-900">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
              className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-all duration-200 bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:pb-6"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              Last Name <span className="ml-2 text-gray-900">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
              className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-all duration-200 bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:pb-6"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              Email Address <span className="ml-2 text-gray-900">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-all duration-200 bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:pb-6"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              Phone Number <span className="ml-2 text-gray-900">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
              className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-all duration-200 bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:pb-6"
              placeholder="+1 (555) 123-4567"
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
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-gray-900">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider text-center">
            Your information is secure and will only be used for this service
          </p>
        </div>
      </div>
    </main>
  )
}
