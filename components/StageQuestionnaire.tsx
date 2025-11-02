'use client'

import { Stage, Question, StageAnswers } from '@/lib/stages'

interface StageQuestionnaireProps {
  stage: Stage
  answers: StageAnswers
  onAnswerChange: (questionId: string, value: string) => void
}

export default function StageQuestionnaire({
  stage,
  answers,
  onAnswerChange
}: StageQuestionnaireProps) {
  return (
    <div className="border-t border-gray-900 pt-12">
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-4 text-gray-900">
          {stage.title}
        </h2>
        <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl">
          {stage.description}
        </p>
      </div>

      <div className="space-y-12">
        {stage.questions.map((question) => (
          <div key={question.id}>
            <label className="block text-xs font-normal text-gray-900 mb-6 uppercase tracking-wider">
              {question.label}
              {question.required && <span className="ml-2">*</span>}
            </label>
            {question.type === 'textarea' ? (
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                required={question.required}
                rows={4}
                className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm font-light text-gray-900 resize-none placeholder-gray-400 focus:outline-none"
              />
            ) : (
              <input
                type={question.type}
                value={answers[question.id] || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                required={question.required}
                className="w-full px-0 py-4 border-0 border-b border-gray-300 focus:border-gray-900 transition-colors bg-transparent text-sm font-light text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
