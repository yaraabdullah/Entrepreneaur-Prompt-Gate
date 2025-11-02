'use client'

import { useState } from 'react'

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
    <div className="border-t border-gray-900 pt-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-normal text-gray-900 uppercase tracking-wider">
            Generated Prompt
          </h2>
          <button
            onClick={copyToClipboard}
            className="text-xs font-normal text-gray-900 uppercase tracking-wider border-b border-gray-900 hover:opacity-60 transition-opacity"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-xs font-light text-gray-600 uppercase tracking-wider">
          {stageTitle}
        </p>
      </div>

      <div className="border-t border-b border-gray-300 py-8 mb-12">
        <pre className="whitespace-pre-wrap text-xs text-gray-900 font-light leading-relaxed">
          {prompt}
        </pre>
      </div>

      <div className="space-y-6">
        <button
          onClick={onSendToAI}
          className="w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider hover:opacity-60 transition-opacity"
        >
          Send to AI Model
        </button>
        <p className="text-xs font-light text-gray-600 leading-relaxed">
          Review the generated prompt above. Click "Send to AI Model" to proceed with your deployment platform.
        </p>
      </div>
    </div>
  )
}

