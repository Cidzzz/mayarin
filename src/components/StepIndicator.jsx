import { Check } from 'lucide-react'

const STEPS = [
  { num: 1, label: 'Isi Data & Foto' },
  { num: 2, label: 'Generate Visual' },
  { num: 3, label: 'Review & Bayar' },
]

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const isDone = current > step.num
        const isActive = current === step.num
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                {isActive && (
                  <div className="absolute -inset-1.5 rounded-full bg-emerald-400/15 animate-ping" style={{ animationDuration: '2s' }} />
                )}
                <div
                  className={`
                    relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                    ${isDone
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : isActive
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-xl shadow-emerald-600/30 ring-[3px] ring-emerald-200/50'
                        : 'bg-white text-gray-300 border-2 border-gray-200/80'
                    }
                  `}
                >
                  {isDone ? <Check className="w-4 h-4" strokeWidth={3} /> : step.num}
                </div>
              </div>
              <span
                className={`text-[10px] sm:text-xs font-semibold hidden sm:block transition-all duration-300 whitespace-nowrap ${
                  isDone ? 'text-emerald-600' : isActive ? 'text-emerald-700' : 'text-gray-300'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-8 sm:w-14 h-[3px] mx-2 sm:mx-3 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700 ease-out ${
                    isDone ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
