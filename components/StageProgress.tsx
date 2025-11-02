'use client'

import { stages } from '@/lib/stages'

interface StageProgressProps {
  currentStageIndex: number
  onStageSelect: (index: number) => void
}

export default function StageProgress({
  currentStageIndex,
  onStageSelect
}: StageProgressProps) {
  return (
    <div className="border-t border-gray-900 pt-12 pb-12">
      <div className="flex flex-wrap gap-x-12 gap-y-8">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            onClick={() => onStageSelect(index)}
            className={`text-left ${
              index === currentStageIndex
                ? 'border-b border-gray-900 pb-2'
                : 'opacity-40 hover:opacity-60 transition-opacity'
            }`}
          >
            <div className="text-xs font-normal text-gray-900 uppercase tracking-wider mb-1">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="text-sm font-light text-gray-900 leading-relaxed">
              {stage.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
