import { Gift } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/40 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Gift className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">Mayarin AI</span> — Ramadhan 1447 H
          </span>
        </div>
        <p className="text-xs text-gray-400">Karya Vibecoding Ramadhan 2026 — dibuat dengan ❤️ dan sedikit AI</p>
      </div>
    </footer>
  )
}
