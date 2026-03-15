import { ChevronRight } from 'lucide-react'

export default function CategorySection({ categories, selected, onSelect }) {
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-6 pb-8">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">Jenis Kado Digital</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selected === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat)}
              disabled={!cat.enabled}
              className={`
                animate-fade-in relative group rounded-2xl p-4 sm:p-5 text-left transition-all duration-300
                ${isActive ? 'col-span-2 sm:col-span-1' : ''}
                ${
                  cat.enabled
                    ? isActive
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-600/25 scale-[1.02] ring-2 ring-emerald-400/30 ring-offset-2 ring-offset-[#f8fdfb]'
                      : 'glass hover:shadow-lg hover:scale-[1.01] cursor-pointer'
                    : 'bg-gray-50/80 border border-gray-200/60 cursor-not-allowed'
                }
              `}
            >
              {!cat.enabled && (
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                  Segera hadir
                </span>
              )}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${
                isActive ? 'bg-white/20' : cat.enabled ? 'bg-emerald-50' : 'bg-gray-100'
              }`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-gold-400' : cat.enabled ? 'text-emerald-500' : 'text-gray-400'}`} />
              </div>
              <h3 className={`font-bold text-sm sm:text-base ${isActive ? 'text-white' : cat.enabled ? 'text-gray-800' : 'text-gray-400'}`}>
                {cat.label}
              </h3>
              {!cat.enabled && (
                <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{cat.desc}</p>
              )}
              {cat.enabled && !isActive && (
                <ChevronRight className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
