'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PromptDisplayProps {
  prompt: string
  stageTitle: string
  onSendToAI: () => void
}

export default function PromptDisplay({
  prompt,
  stageTitle,
  onSendToAI
}: PromptDisplayProps) {
  const { t } = useLanguage()
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

  if (!prompt) return null

  return (
    <div className="border-t border-gray-900 pt-12 animate-in fade-in duration-500">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-wider">
            {t('generatedPrompt')}
          </h2>
          <button
            onClick={copyToClipboard}
            className={`text-xs font-normal text-gray-900 uppercase tracking-wider border-b border-gray-900 transition-all duration-200 ${
              copied ? 'opacity-60' : 'hover:opacity-60'
            }`}
          >
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <p className="text-xs font-light text-gray-600 uppercase tracking-wider">
          {stageTitle}
        </p>
      </div>

      <div className="border-t border-b border-gray-300 py-8 mb-12 bg-gradient-to-b from-gray-50 to-transparent">
        <pre className="whitespace-pre-wrap text-xs text-gray-900 font-light leading-relaxed">
          {prompt}
        </pre>
      </div>

      <div className="space-y-6">
        <button
          onClick={onSendToAI}
          className="w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider hover:opacity-60 transition-all duration-200 hover:bg-gray-50"
        >
          {t('sendToAI')}
        </button>
        <p className="text-xs font-light text-gray-600 leading-relaxed">
          {t('reviewPrompt')}
        </p>
      </div>
    </div>
  )
}

