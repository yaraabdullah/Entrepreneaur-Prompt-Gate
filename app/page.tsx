'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { stages, StageAnswers } from '@/lib/stages'
import StageQuestionnaire from '@/components/StageQuestionnaire'
import StageProgress from '@/components/StageProgress'
import PromptDisplay from '@/components/PromptDisplay'
import NavigationButtons from '@/components/NavigationButtons'

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isChecking, setIsChecking] = useState(true)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [allAnswers, setAllAnswers] = useState<{ [stageId: string]: StageAnswers }>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [showPrompt, setShowPrompt] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Check if user has signed up
    const userSignedUp = localStorage.getItem('userSignedUp')
    if (!userSignedUp) {
      router.push('/login')
    } else {
      setIsChecking(false)
    }
  }, [router])

  const currentStage = stages[currentStageIndex]
  const currentAnswers = allAnswers[currentStage.id] || {}

  const handleAnswerChange = (questionId: string, value: string) => {
    setAllAnswers({
      ...allAnswers,
      [currentStage.id]: {
        ...currentAnswers,
        [questionId]: value
      }
    })
  }

  const generatePrompt = async () => {
    setIsGenerating(true)
    setError('')
    setShowPrompt(false)

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stageId: currentStage.id,
          answers: currentAnswers,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMsg = errorData.error || 'Failed to generate prompt'
        const details = errorData.details || ''
        const suggestion = errorData.suggestion || ''
        const availableModels = errorData.availableModels
        
        let fullError = errorMsg
        if (details) fullError += `\n\n${details}`
        if (suggestion) fullError += `\n\nSuggestion: ${suggestion}`
        if (availableModels && Array.isArray(availableModels) && availableModels.length > 0) {
          fullError += `\n\nAvailable models: ${availableModels.join(', ')}`
        }
        
        setError(fullError)
        setShowPrompt(false)
        return
      }
      
      const data = await response.json()
      setGeneratedPrompt(data.prompt)
      setShowPrompt(true)
      setError('')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred'
      setError(`Failed to generate prompt: ${errorMsg}`)
      setShowPrompt(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const canGeneratePrompt = () => {
    return currentStage.questions
      .filter(q => q.required)
      .every(q => currentAnswers[q.id]?.trim())
  }

  const handleSendToAI = () => {
    const element = document.getElementById('deployment-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Show loading state while checking sign-up
  if (isChecking) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="border-t border-b border-gray-300 py-8 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="w-1 h-1 bg-gray-900 rounded-full animate-pulse"></div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
          </div>
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider">
            {t('loading')}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-24 border-t border-gray-900 pt-12">
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            {t('entrepreneurJourney')}
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl uppercase tracking-wider">
            {t('guidedApproach')}
          </p>
        </div>

        {/* Stage Progress */}
        <StageProgress
          currentStageIndex={currentStageIndex}
          onStageSelect={setCurrentStageIndex}
        />

        <div className="grid lg:grid-cols-2 gap-24 mt-24">
          {/* Question Section */}
          <div>
            <StageQuestionnaire
              stage={currentStage}
              answers={currentAnswers}
              onAnswerChange={handleAnswerChange}
            />
            <div className="mt-16 space-y-4">
              {error && (
                <div className="border-t border-b border-gray-300 py-6">
                  <p className="text-xs font-light text-gray-600 uppercase tracking-wider whitespace-pre-line leading-relaxed">
                    {error}
                  </p>
                </div>
              )}
              <button
                onClick={generatePrompt}
                disabled={!canGeneratePrompt() || isGenerating}
                className={`w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider transition-opacity ${
                  canGeneratePrompt() && !isGenerating
                    ? 'hover:opacity-60'
                    : 'opacity-20 cursor-not-allowed'
                }`}
              >
                {isGenerating ? t('generating') : t('generatePrompt')}
              </button>
            </div>
          </div>

          {/* Prompt Display Section */}
          <div>
            {isGenerating && (
              <div className="border-t border-gray-900 pt-12">
                <div className="space-y-4">
                  <div className="border-t border-b border-gray-300 py-8">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <div className="w-1 h-1 bg-gray-900 rounded-full animate-pulse"></div>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                  </div>
                  <p className="text-xs font-light text-gray-600 uppercase tracking-wider text-center">
                    {t('generating')}...
                  </p>
                </div>
              </div>
            )}
            {showPrompt && !isGenerating && (
              <>
                <PromptDisplay
                  prompt={generatedPrompt}
                  stageTitle={t(currentStage.titleKey)}
                  onSendToAI={handleSendToAI}
                />
                <div id="deployment-section" className="mt-24">
                  <NavigationButtons prompt={generatedPrompt} />
                </div>
              </>
            )}
            {!showPrompt && !isGenerating && (
              <div className="border-t border-gray-900 pt-12">
                <p className="text-xs font-light text-gray-600 leading-relaxed uppercase tracking-wider">
                  {t('completeQuestions')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-48 pt-24 border-t border-gray-900">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider text-center">
            {t('enterpriseGrade')}
          </p>
        </div>
      </div>
    </main>
  )
}