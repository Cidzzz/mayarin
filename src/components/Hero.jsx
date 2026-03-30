import { Moon, Star, Sparkles } from 'lucide-react'

export default function Hero({ showCta, onCtaClick }) {
  return (
    <header className="relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] animate-float hidden sm:block" style={{ animationDelay: '0s' }}>
        <Moon className="w-8 h-8 text-emerald-200/40" />
      </div>
      <div className="absolute top-40 left-[8%] animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
        <Star className="w-6 h-6 text-gold-400/30 fill-gold-400/30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-8 sm:pb-14 text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-emerald-200/60 shadow-sm mb-6 sm:mb-8">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span className="text-xs font-semibold text-emerald-700">THR Visual: ucapan AI + kartu hadiah digital</span>
          </div>
          <div className="w-px h-3 bg-emerald-200" />
          <span className="text-xs text-gray-500">Ramadhan 1447 H</span>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in text-2xl sm:text-5xl lg:text-[3.5rem] leading-[1.15] tracking-tight text-gray-900 mb-4 sm:mb-6" style={{ animationDelay: '100ms' }}>
          <span className="font-semibold">Lebaran makin berkesan</span>
          <br />
          <span className="font-serif font-black italic bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift">
            dengan THR + pantun AI.
          </span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in text-sm sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed" style={{ animationDelay: '200ms' }}>
          Cukup isi nama, cerita singkat, lalu tambahkan foto favorit. AI akan buat ucapan + pantun, lalu jadikan kartu THR digital premium siap kirim lewat{' '}
          <span className="font-semibold text-emerald-600">Mayar.</span>{' '}Simpel, personal, bikin senyum.
        </p>

        {/* How it works — 3 steps */}
        {showCta && (
          <div className="animate-fade-in mt-10 sm:mt-12" style={{ animationDelay: '350ms' }}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-[11px] sm:text-sm text-gray-400 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                Ceritakan penerima
              </span>
              <span className="text-gray-300 hidden sm:inline">→</span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                Generate kartu visual
              </span>
              <span className="text-gray-300 hidden sm:inline">→</span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                Kirim & bayar
              </span>
            </div>
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.02] cursor-pointer text-sm sm:text-base"
            >
              <Moon className="w-4 h-4" />
              Buat THR Sekarang
            </button>
            <p className="text-gray-300 mt-4 text-lg animate-bounce" style={{ animationDuration: '2.5s' }}>↓</p>
          </div>
        )}
      </div>
    </header>
  )
}
