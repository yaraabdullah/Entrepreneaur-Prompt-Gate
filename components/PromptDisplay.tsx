'use client'

import { useState } from 'react'

interface PromptDisplayProps {
  prompt: string
}

export default function PromptDisplay({ prompt }: PromptDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-slideIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          ✨ Generated Prompt
        </h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
        >
          {copied ? (
            <>
              <span className="text-green-300">✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed overflow-x-auto">
          {prompt}
        </pre>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> This prompt has been optimized with best practices including SEO, accessibility, modern design principles, and technical specifications. Just copy and paste it into your preferred AI website builder!
        </p>
      </div>
    </div>
  )
}

