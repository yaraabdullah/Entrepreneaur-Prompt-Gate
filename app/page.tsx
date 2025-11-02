'use client'

import { useState } from 'react'
import { stages, StageAnswers, generatePromptForStage } from '@/lib/stages'
import StageQuestionnaire from '@/components/StageQuestionnaire'
import StageProgress from '@/components/StageProgress'
import PromptDisplay from '@/components/PromptDisplay'
import NavigationButtons from '@/components/NavigationButtons'

export default function Home() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [allAnswers, setAllAnswers] = useState<{ [stageId: string]: StageAnswers }>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [showPrompt, setShowPrompt] = useState(false)

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

  const generatePrompt = () => {
    const prompt = generatePromptForStage(currentStage.id, currentAnswers)
    setGeneratedPrompt(prompt)
    setShowPrompt(true)
  }

  const canGeneratePrompt = () => {
    return currentStage.questions
      .filter(q => q.required)
      .every(q => currentAnswers[q.id]?.trim())
  }

  const handleSendToAI = () => {
    // Navigate to deployment platforms section
    const element = document.getElementById('deployment-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-24 border-t border-gray-900 pt-12">
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
            Entrepreneur Journey
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl uppercase tracking-wider">
            A guided approach to building your entrepreneurial project, stage by stage
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
            <div className="mt-16">
              <button
                onClick={generatePrompt}
                disabled={!canGeneratePrompt()}
                className={`w-full border-t border-b border-gray-900 py-6 text-sm font-normal text-gray-900 uppercase tracking-wider transition-opacity ${
                  canGeneratePrompt()
                    ? 'hover:opacity-60'
                    : 'opacity-20 cursor-not-allowed'
                }`}
              >
                Generate Prompt
              </button>
            </div>
          </div>

          {/* Prompt Display Section */}
          <div>
            {showPrompt && (
              <>
                <PromptDisplay
                  prompt={generatedPrompt}
                  stageTitle={currentStage.title}
                  onSendToAI={handleSendToAI}
                />
                <div id="deployment-section" className="mt-24">
                  <NavigationButtons prompt={generatedPrompt} />
                </div>
              </>
            )}
            {!showPrompt && (
              <div className="border-t border-gray-900 pt-12">
                <p className="text-xs font-light text-gray-600 leading-relaxed uppercase tracking-wider">
                  Complete the questions and generate your optimized prompt
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-48 pt-24 border-t border-gray-900">
          <p className="text-xs font-light text-gray-600 uppercase tracking-wider text-center">
            Enterprise-grade prompt generation for entrepreneurial journeys
          </p>
        </div>
      </div>
    </main>
  )
}