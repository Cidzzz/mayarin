import { CheckCircle2, Clock, XCircle, Copy, Link as LinkIcon, Moon } from 'lucide-react'
import ResultCard from './ResultCard'

export default function PaymentResultView({
  status,
  receipt,
  formatRp,
  notice,
  onCopyUcapan,
  onCopyGiftLink,
  onStartOver,
}) {
  const statusMap = {
    success: {
      icon: CheckCircle2,
      title: 'THR Berhasil Terkirim!',
      desc: 'Transaksi sukses. Kartu THR digital kamu siap dibagikan.',
      badge: 'bg-emerald-500/15 text-emerald-700 border-emerald-200/70',
      iconBg: 'from-emerald-500 to-emerald-700 shadow-emerald-600/25',
    },
    pending: {
      icon: Clock,
      title: 'Pembayaran Masih Diproses',
      desc: 'Status transaksi masih pending. Kamu tetap bisa menyalin ucapan dan link hadiah.',
      badge: 'bg-amber-500/15 text-amber-700 border-amber-200/70',
      iconBg: 'from-amber-400 to-amber-600 shadow-amber-500/25',
    },
    failed: {
      icon: XCircle,
      title: 'Pembayaran Gagal',
      desc: 'Transaksi belum berhasil. Coba lagi kapan saja.',
      badge: 'bg-red-500/15 text-red-700 border-red-200/70',
      iconBg: 'from-red-400 to-red-600 shadow-red-500/25',
    },
  }

  const meta = statusMap[status] || statusMap.failed
  const Icon = meta.icon

  const cardResult = receipt?.content
    ? {
        nama: receipt?.recipient?.nama || 'Penerima',
        hubungan: receipt?.recipient?.hubungan || '',
        ucapan: receipt.content.ucapan || '',
        pantun: receipt.content.pantun || '',
        imageUrl: receipt.content.imageUrl || '',
        imageName: receipt.content.imageName || '',
        isFallback: Boolean(receipt.content.isFallback),
      }
    : null

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="glass rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-900/[0.04]">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.iconBg} flex items-center justify-center shadow-xl mb-5`}>
              <Icon className="w-8 h-8 text-white" />
            </div>

            <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${meta.badge}`}>
              {status.toUpperCase()}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{meta.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{meta.desc}</p>

            <div className="rounded-2xl border border-emerald-100/70 bg-emerald-50/40 p-4 mb-4">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Ringkasan Transaksi</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">ID Transaksi</span>
                  <span className="font-semibold text-gray-700">{receipt?.transactionId || '-'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Penerima</span>
                  <span className="font-semibold text-gray-700">{receipt?.recipient?.nama || '-'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Nominal</span>
                  <span className="font-semibold text-emerald-700">{formatRp(receipt?.amount || 0)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 mb-4">
              <button
                onClick={onCopyUcapan}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-700 transition"
              >
                <Copy className="w-4 h-4" />
                Copy Ucapan
              </button>
              <button
                onClick={onCopyGiftLink}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-700 transition"
              >
                <LinkIcon className="w-4 h-4" />
                Copy Link Hadiah
              </button>
            </div>

            {notice && (
              <div
                className={`text-xs rounded-xl p-3 border mb-4 ${
                  notice.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {notice.text}
              </div>
            )}

            <button
              onClick={onStartOver}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
            >
              <Moon className="w-4 h-4" />
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          {cardResult ? (
            <ResultCard
              result={cardResult}
              editing={false}
              editText=""
              setEditText={() => {}}
              onStartEdit={() => {}}
              onSaveEdit={() => {}}
              onPrepareShareDraft={() => {}}
              shareDraftMessage=""
              readOnly
            />
          ) : (
            <div className="glass rounded-3xl p-6 sm:p-8 border border-emerald-100/70 text-center">
              <p className="text-sm text-gray-500">Kartu THR belum tersedia di sesi ini.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
