import { Moon, Star, Heart, Pencil, Check, AlertCircle, Share2, FileText, Image as ImageIcon } from 'lucide-react'

export default function ResultCard({
  result,
  editing,
  editText,
  setEditText,
  onStartEdit,
  onSaveEdit,
  onPrepareShareDraft,
  shareDraftMessage,
  readOnly = false,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
        <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Amplop THR Digital</h2>
      </div>

      <div data-export-target="thr-visual-card" className="flex-1 relative rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-2xl shadow-emerald-900/20 animate-pulse-glow">
        {/* Multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.15),transparent_60%)]" />

        {/* Gold frames */}
        <div className="absolute inset-[3px] sm:inset-[4px] rounded-[17px] sm:rounded-[24px] border border-gold-400/20" />
        <div className="absolute inset-[10px] sm:inset-[12px] rounded-[13px] sm:rounded-[20px] border border-gold-400/10" />

        {/* Corner ornaments */}
        {[
          'top-3 left-3',
          'top-3 right-3 scale-x-[-1]',
          'bottom-3 left-3 scale-y-[-1]',
          'bottom-3 right-3 scale-[-1]',
        ].map((pos, i) => (
          <svg key={i} className={`absolute ${pos} w-12 h-12 sm:w-16 sm:h-16 text-gold-400/20`} viewBox="0 0 64 64" fill="none">
            <path d="M4 28V4h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="4" cy="4" r="2" fill="currentColor" />
          </svg>
        ))}

        {/* Floating decorative */}
        <div className="absolute top-8 right-8 animate-spin-slow opacity-[0.05] hidden sm:block">
          <svg className="w-40 h-40 text-gold-400" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 8" />
          </svg>
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-[0.06]">
          <Moon className="w-32 h-32 sm:w-48 sm:h-48 text-gold-400" />
        </div>

        {/* Card content */}
        <div className="relative z-10 p-5 sm:p-10 lg:p-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/15 mb-8 sm:mb-10 animate-stamp">
            <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400" />
            <span className="text-gold-400 text-[10px] sm:text-xs font-semibold tracking-wide">THR RAMADHAN 1447 H</span>
          </div>

          {/* Recipient */}
          <p className="text-emerald-300/50 text-[10px] uppercase tracking-[0.2em] mb-1.5">Khusus untuk</p>
          <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-1 leading-tight">
            {result.nama}
          </h3>
          {result.hubungan && (
            <p className={`text-emerald-300/50 text-sm italic ${result.ucapan ? 'mb-3' : 'mb-8 sm:mb-10'}`}>{result.hubungan}</p>
          )}

          {/* Personal greeting */}
          {result.ucapan && (
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
              {result.ucapan}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
            <div className="flex gap-1">
              <Star className="w-2.5 h-2.5 text-gold-400/30 fill-gold-400/30 animate-sparkle" />
              <Star className="w-3 h-3 text-gold-400/50 fill-gold-400/50 animate-sparkle" style={{ animationDelay: '0.5s' }} />
              <Star className="w-2.5 h-2.5 text-gold-400/30 fill-gold-400/30 animate-sparkle" style={{ animationDelay: '1s' }} />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />
          </div>

          {/* Visual area */}
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3.5">
            {result.imageUrl ? (
              <div className="relative overflow-hidden rounded-xl h-36 sm:h-44 lg:h-52">
                <img src={result.imageUrl} alt="Visual hadiah THR" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/45 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 border border-white/15 text-[10px] text-white/90">
                    <ImageIcon className="w-3 h-3" />
                    Kado THR Visual
                  </span>
                  <span className="text-[10px] text-white/80 truncate max-w-[55%]">{result.imageName || 'Foto hadiah'}</span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl h-32 sm:h-36 border border-dashed border-white/15 flex items-center justify-center text-white/45 text-xs">
                Tambahkan foto dari form untuk membuat kartu lebih visual
              </div>
            )}
          </div>

          {/* Fallback notice */}
          {result.isFallback && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-400/25 mb-5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-200/90">AI sedang sibuk — ini ucapan cadangan. Kamu bisa <span className="underline underline-offset-2">edit</span> atau <span className="underline underline-offset-2">buat ulang</span>.</span>
            </div>
          )}

          {/* Pantun box */}
          <div className="relative bg-white/[0.04] backdrop-blur rounded-2xl p-5 sm:p-7 mb-5 border border-white/[0.06] overflow-hidden">
            <div className="absolute top-2 left-3 text-gold-400/10 text-5xl sm:text-6xl font-serif leading-none select-none">&ldquo;</div>
            {editing ? (
              <textarea
                rows={5}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="relative z-10 w-full bg-white/10 text-white text-sm sm:text-base lg:text-lg leading-relaxed rounded-xl p-3 border border-white/20 focus:outline-none focus:border-gold-400/50 resize-none placeholder:text-white/30 font-serif"
                placeholder="Ketik versimu sendiri di sini..."
                autoFocus
              />
            ) : (
              <div className="relative z-10 space-y-0.5">
                {result.pantun.split('\n').map((line, i) => (
                  <p key={i} className="pantun-line text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed font-serif italic">{line}</p>
                ))}
              </div>
            )}
          </div>

          {/* Edit / Save */}
          {!readOnly && (
            <div className="mb-6 sm:mb-8">
              {editing ? (
                <button
                  onClick={onSaveEdit}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Simpan Perubahan
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onStartEdit}
                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-300/40 hover:text-gold-400 transition cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit isi ucapan
                  </button>
                  <button
                    onClick={onPrepareShareDraft}
                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-200/60 hover:text-emerald-100 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Siapkan draft share
                  </button>
                  <button
                    type="button"
                    disabled
                    className="flex items-center gap-1.5 text-xs font-medium text-white/25 cursor-not-allowed"
                    title="Struktur export siap, rendering PDF akan ditambahkan selanjutnya"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Export PDF (Soon)
                  </button>
                </div>
              )}
              {shareDraftMessage && (
                <p className="text-[11px] text-emerald-200/65 mt-2.5">{shareDraftMessage}</p>
              )}
            </div>
          )}

          {/* Footer of card */}
          <div className="flex items-center gap-3 mb-1">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
          </div>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-1.5 text-emerald-300/30 text-[10px] tracking-wide">
              <Heart className="w-3 h-3 fill-current" />
              {result.isFallback ? 'Ucapan cadangan' : 'Ditulis oleh Mayarin AI'}
            </div>
            <span className="text-emerald-300/20 text-[10px] tracking-wider font-semibold">MAYARIN AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
