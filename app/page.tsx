'use client'

import { useState } from 'react'
import FormSection from '@/components/FormSection'
import PromptDisplay from '@/components/PromptDisplay'
import NavigationButtons from '@/components/NavigationButtons'

export default function Home() {
  const [formData, setFormData] = useState({
    entrepreneurName: '',
    companyName: '',
    sourcesOfIncome: '',
    companyDescription: '',
    targetAudience: '',
    uniqueValue: '',
    industry: '',
    businessGoals: '',
    preferredStyle: '',
    keyFeatures: '',
    contactInfo: '',
  })

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [showPrompt, setShowPrompt] = useState(false)

  const generatePrompt = () => {
    const prompt = `Create a modern, professional website for ${formData.companyName}, founded by ${formData.entrepreneurName}.

BUSINESS OVERVIEW:
${formData.companyDescription}

TARGET AUDIENCE:
${formData.targetAudience}

UNIQUE VALUE PROPOSITION:
${formData.uniqueValue}

INDUSTRY & NICHE:
${formData.industry}

REVENUE STREAMS:
${formData.sourcesOfIncome}

BUSINESS GOALS:
${formData.businessGoals}

DESIGN REQUIREMENTS:
- Style: ${formData.preferredStyle}
- Key Features: ${formData.keyFeatures}
- Modern, responsive design
- Fast loading times
- SEO optimized
- Mobile-first approach

FUNCTIONAL REQUIREMENTS:
${formData.contactInfo ? `- Contact form: ${formData.contactInfo}` : ''}
- Clear call-to-action buttons
- Professional color scheme aligned with brand
- User-friendly navigation
- Accessibility compliant (WCAG 2.1 AA)

TECHNICAL SPECIFICATIONS:
- Responsive design (mobile, tablet, desktop)
- Fast page load speeds
- SEO-friendly structure
- Clean, semantic HTML
- Modern CSS with animations
- Best practices for web development

Please create a complete, production-ready website that represents ${formData.companyName} professionally while incorporating all the specified business goals and features. Ensure the design is visually appealing, user-friendly, and optimized for conversions.`

    setGeneratedPrompt(prompt)
    setShowPrompt(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slideIn">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🚀 Entrepreneur Prompt Gate
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate the perfect AI prompt for your business website. Get professional results from GenSpark, Manus, and Lovable.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <FormSection formData={formData} setFormData={setFormData} />
            <button
              onClick={generatePrompt}
              disabled={!formData.companyName || !formData.companyDescription}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ✨ Generate Perfect Prompt
            </button>
          </div>

          {/* Prompt Display Section */}
          <div className="space-y-6">
            {showPrompt && (
              <PromptDisplay prompt={generatedPrompt} />
            )}
            {showPrompt && <NavigationButtons />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p>Made with ❤️ for entrepreneurs who want to build amazing websites</p>
        </div>
      </div>
    </main>
  )
}

