'use client'

import { useState } from 'react'

interface FormData {
  entrepreneurName: string
  companyName: string
  sourcesOfIncome: string
  companyDescription: string
  targetAudience: string
  uniqueValue: string
  industry: string
  businessGoals: string
  preferredStyle: string
  keyFeatures: string
  contactInfo: string
}

interface FormSectionProps {
  formData: FormData
  setFormData: (data: FormData) => void
}

export default function FormSection({ formData, setFormData }: FormSectionProps) {
  const [isExpanded, setIsExpanded] = useState({
    basic: true,
    business: false,
    design: false,
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 animate-slideIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📝 Business Information
      </h2>

      {/* Basic Information Section */}
      <div className="border-b pb-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, basic: !isExpanded.basic })}
          className="flex items-center justify-between w-full text-left font-semibold text-lg text-gray-700 mb-3 hover:text-blue-600 transition-colors"
        >
          <span>📋 Basic Information</span>
          <span className="transform transition-transform">{isExpanded.basic ? '▼' : '▶'}</span>
        </button>

        {isExpanded.basic && (
          <div className="space-y-4 ml-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.entrepreneurName}
                onChange={(e) => updateField('entrepreneurName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tech Innovations Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Technology, Healthcare, E-commerce, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.companyDescription}
                onChange={(e) => updateField('companyDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe what your company does, its mission, and vision..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Business Details Section */}
      <div className="border-b pb-4">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, business: !isExpanded.business })}
          className="flex items-center justify-between w-full text-left font-semibold text-lg text-gray-700 mb-3 hover:text-blue-600 transition-colors"
        >
          <span>💼 Business Details</span>
          <span className="transform transition-transform">{isExpanded.business ? '▼' : '▶'}</span>
        </button>

        {isExpanded.business && (
          <div className="space-y-4 ml-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sources of Income
              </label>
              <textarea
                value={formData.sourcesOfIncome}
                onChange={(e) => updateField('sourcesOfIncome', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Product sales, Subscription services, Consulting fees..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Small businesses, Young professionals, Tech enthusiasts..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unique Value Proposition
              </label>
              <textarea
                value={formData.uniqueValue}
                onChange={(e) => updateField('uniqueValue', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="What makes your business special? Why should customers choose you?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Goals
              </label>
              <textarea
                value={formData.businessGoals}
                onChange={(e) => updateField('businessGoals', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Increase online presence, Generate leads, Build brand awareness..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Information
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={(e) => updateField('contactInfo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="email@company.com, +1234567890"
              />
            </div>
          </div>
        )}
      </div>

      {/* Design Preferences Section */}
      <div className="pb-2">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, design: !isExpanded.design })}
          className="flex items-center justify-between w-full text-left font-semibold text-lg text-gray-700 mb-3 hover:text-blue-600 transition-colors"
        >
          <span>🎨 Design Preferences</span>
          <span className="transform transition-transform">{isExpanded.design ? '▼' : '▶'}</span>
        </button>

        {isExpanded.design && (
          <div className="space-y-4 ml-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Style
              </label>
              <select
                value={formData.preferredStyle}
                onChange={(e) => updateField('preferredStyle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select a style...</option>
                <option value="Modern & Minimalist">Modern & Minimalist</option>
                <option value="Bold & Creative">Bold & Creative</option>
                <option value="Professional & Corporate">Professional & Corporate</option>
                <option value="Playful & Vibrant">Playful & Vibrant</option>
                <option value="Elegant & Sophisticated">Elegant & Sophisticated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Features to Include
              </label>
              <textarea
                value={formData.keyFeatures}
                onChange={(e) => updateField('keyFeatures', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Online booking, Product catalog, Customer testimonials, Blog section..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

