import { Sparkles, ArrowRight, AlertCircle, Moon, Star, ImagePlus, X } from 'lucide-react'

/* Animated loading state for AI generation */
function AILoadingOverlay({ recipientName }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-gentle-float absolute top-[15%] left-[18%]" style={{ animationDelay: '0s' }}>
          <Moon className="w-4 h-4 text-emerald-300/25" />
        </div>
        <div className="animate-gentle-float absolute top-[22%] right-[15%]" style={{ animationDelay: '1.2s' }}>
          <Star className="w-3 h-3 text-gold-400/25 fill-gold-400/25" />
        </div>
        <div className="animate-gentle-float absolute bottom-[25%] left-[25%]" style={{ animationDelay: '0.6s' }}>
          <Star className="w-3.5 h-3.5 text-emerald-400/20 fill-emerald-400/20" />
        </div>
        <div className="animate-gentle-float absolute bottom-[18%] right-[22%]" style={{ animationDelay: '1.8s' }}>
          <Moon className="w-3 h-3 text-gold-400/20" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 text-center px-6 relative z-10">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 flex items-center justify-center shadow-2xl shadow-emerald-600/25">
            <Sparkles className="w-8 h-8 text-white animate-quill" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/30 animate-bounce" style={{ animationDuration: '2s' }}>
            <Moon className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div>
          <p className="text-base font-bold text-gray-800 tracking-tight">Merangkai ucapan spesial...</p>
          <p className="text-xs text-gray-400 mt-1.5">
            {recipientName ? `Sedang menulis untuk ${recipientName} ✍️` : 'Bentar ya, lagi mikirin rima yang cocok ✍️'}
          </p>
        </div>

        <div className="w-36 h-1 rounded-full bg-emerald-100 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ animation: 'progress-indeterminate 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

export default function RecipientForm({
  form,
  setForm,
  visualImageUrl,
  visualImageName,
  onImageSelected,
  onGenerate,
  generating,
  aiError,
}) {
  const isValid = form.nama.trim().length > 0

  return (
    <section className="max-w-xl mx-auto px-5 sm:px-6 pb-16 animate-fade-in-up">
      <div className="relative glass rounded-3xl p-6 sm:p-10 shadow-xl shadow-emerald-900/[0.04]">
        {generating && <AILoadingOverlay recipientName={form.nama} />}

        {/* Section header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Mau kirim THR ke siapa?</h2>
            <p className="text-gray-400 text-xs mt-0.5">Ceritakan orangnya, Mayarin yang urus ucapannya 🌙</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama penerima THR
            </label>
            <input
              type="text"
              placeholder="Siapa yang mau di-THR-in?"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Dia siapamu?</label>
            <input
              type="text"
              placeholder="Teman, adik, sahabat, pacar..."
              value={form.hubungan}
              onChange={(e) => setForm({ ...form, hubungan: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Sedikit tentang dia
              <span className="text-gray-400 font-normal ml-1">(biar pantunnya nyambung)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Suka makan bakso, rajin WFO, fans kucing oren, doyan rebahan..."
              value={form.cerita}
              onChange={(e) => setForm({ ...form, cerita: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition resize-none placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Foto untuk Kado THR Visual
              <span className="text-gray-400 font-normal ml-1">(opsional)</span>
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onImageSelected(e.target.files?.[0] || null)}
              />
              <div className="w-full rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-3.5 text-sm text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-2.5">
                <ImagePlus className="w-4 h-4" />
                <span>{visualImageUrl ? 'Ganti foto visual' : 'Tambah foto agar kartu THR lebih berkesan'}</span>
              </div>
            </label>

            {visualImageUrl && (
              <div className="mt-2.5 rounded-xl border border-emerald-100 bg-white/70 p-2.5 flex items-center gap-2.5">
                <img src={visualImageUrl} alt="Preview visual" className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-800 font-medium truncate">{visualImageName || 'Foto visual dipilih'}</p>
                  <p className="text-[11px] text-gray-400">Foto ini akan masuk ke kartu THR digital</p>
                </div>
                <button
                  type="button"
                  onClick={() => onImageSelected(null)}
                  className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onGenerate}
            disabled={generating || !isValid}
            className={`
              w-full flex items-center justify-center gap-2.5 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 cursor-pointer
              ${isValid && !generating
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.01]'
                : 'bg-gray-300 cursor-not-allowed shadow-none'
              }
            `}
          >
            <Sparkles className="w-5 h-5" />
            <span>Buat Kado THR Visual</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isValid && form.nama !== undefined && (
            <p className="text-center text-xs text-gray-400">Isi nama dulu biar bisa lanjut ☝️</p>
          )}

          {aiError && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50/80 border border-red-200/60 text-red-700 text-sm animate-fade-in">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Waduh, ucapannya gagal dibuat</p>
                <p className="text-xs mt-0.5 opacity-80">{aiError} — coba sekali lagi ya.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
