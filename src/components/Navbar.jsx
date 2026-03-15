import { Gift, Moon } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-emerald-100/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight">
            <span className="text-emerald-800">Mayarin</span>
            <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent"> AI</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100">
          <Moon className="w-3.5 h-3.5 text-gold-500" />
          <span className="text-xs font-medium text-emerald-700">Ramadhan 1447 H</span>
        </div>
      </div>
    </nav>
  )
}
