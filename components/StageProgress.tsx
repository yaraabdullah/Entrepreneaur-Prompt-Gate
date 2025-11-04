'use client'

import { stages } from '@/lib/stages'
import { useLanguage } from '@/contexts/LanguageContext'

interface StageProgressProps {
  currentStageIndex: number
  onStageSelect: (index: number) => void
}

export default function StageProgress({
  currentStageIndex,
  onStageSelect
}: StageProgressProps) {
  const { t } = useLanguage()
  
  const stageTitles = [
    t('stage1'),
    t('stage2'),
    t('stage3'),
    t('stage4'),
    t('stage5'),
    t('stage6'),
  ]
  return (
    <div className="border-t border-gray-900 pt-12 pb-12">
      <div className="flex flex-wrap gap-x-12 gap-y-8">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            onClick={() => onStageSelect(index)}
            className={`text-left transition-all duration-300 ${
              index === currentStageIndex
                ? 'border-b-2 border-gray-900 pb-2'
                : 'opacity-40 hover:opacity-70 hover:translate-y-[-2px]'
            }`}
          >
            <div className={`text-xs font-normal uppercase tracking-wider mb-1 transition-colors ${
              index === currentStageIndex ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className={`text-sm font-light leading-relaxed transition-colors ${
              index === currentStageIndex ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {stageTitles[index]}
            </div>
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="relative h-px bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-500 ease-out"
            style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
