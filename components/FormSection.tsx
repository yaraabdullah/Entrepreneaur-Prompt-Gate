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
    <div className="border border-gray-200 p-10">
      <h2 className="text-lg font-medium text-gray-900 mb-8 uppercase tracking-wide">
        Business Information
      </h2>

      {/* Basic Information Section */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, basic: !isExpanded.basic })}
          className="flex items-center justify-between w-full text-left font-normal text-sm text-gray-900 mb-6 uppercase tracking-wide hover:text-gray-700 transition-colors"
        >
          <span>Basic Information</span>
          <span className="text-xs">{isExpanded.basic ? '—' : '+'}</span>
        </button>

        {isExpanded.basic && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Your Name <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                value={formData.entrepreneurName}
                onChange={(e) => updateField('entrepreneurName', e.target.value)}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Company Name <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Industry <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm"
                placeholder="Technology, Healthcare, Financial Services"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Company Description <span className="text-gray-900">*</span>
              </label>
              <textarea
                value={formData.companyDescription}
                onChange={(e) => updateField('companyDescription', e.target.value)}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="Describe your company's mission, vision, and core services"
              />
            </div>
          </div>
        )}
      </div>

      {/* Business Details Section */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <button
          onClick={() => setIsExpanded({ ...isExpanded, business: !isExpanded.business })}
          className="flex items-center justify-between w-full text-left font-normal text-sm text-gray-900 mb-6 uppercase tracking-wide hover:text-gray-700 transition-colors"
        >
          <span>Business Details</span>
          <span className="text-xs">{isExpanded.business ? '—' : '+'}</span>
        </button>

        {isExpanded.business && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Sources of Income
              </label>
              <textarea
                value={formData.sourcesOfIncome}
                onChange={(e) => updateField('sourcesOfIncome', e.target.value)}
                rows={3}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="Product sales, subscription services, consulting fees"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Target Audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                rows={3}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="Define your primary customer segments"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Unique Value Proposition
              </label>
              <textarea
                value={formData.uniqueValue}
                onChange={(e) => updateField('uniqueValue', e.target.value)}
                rows={3}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="What differentiates your business from competitors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Business Goals
              </label>
              <textarea
                value={formData.businessGoals}
                onChange={(e) => updateField('businessGoals', e.target.value)}
                rows={3}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="Primary objectives for online presence"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Contact Information
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={(e) => updateField('contactInfo', e.target.value)}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm"
                placeholder="email@company.com"
              />
            </div>
          </div>
        )}
      </div>

      {/* Design Preferences Section */}
      <div>
        <button
          onClick={() => setIsExpanded({ ...isExpanded, design: !isExpanded.design })}
          className="flex items-center justify-between w-full text-left font-normal text-sm text-gray-900 mb-6 uppercase tracking-wide hover:text-gray-700 transition-colors"
        >
          <span>Design Preferences</span>
          <span className="text-xs">{isExpanded.design ? '—' : '+'}</span>
        </button>

        {isExpanded.design && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Preferred Style
              </label>
              <select
                value={formData.preferredStyle}
                onChange={(e) => updateField('preferredStyle', e.target.value)}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm"
              >
                <option value="">Select style</option>
                <option value="Modern & Minimalist">Modern & Minimalist</option>
                <option value="Professional & Corporate">Professional & Corporate</option>
                <option value="Elegant & Sophisticated">Elegant & Sophisticated</option>
                <option value="Bold & Creative">Bold & Creative</option>
                <option value="Clean & Functional">Clean & Functional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Key Features
              </label>
              <textarea
                value={formData.keyFeatures}
                onChange={(e) => updateField('keyFeatures', e.target.value)}
                rows={3}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm resize-none"
                placeholder="Essential website functionalities"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

