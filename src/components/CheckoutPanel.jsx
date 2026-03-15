import { useState } from 'react'
import {
  Send,
  Wallet,
  ArrowRight,
  Loader2,
  CreditCard,
  User,
  Mail,
  Phone,
  AlertCircle,
  Shield,
} from 'lucide-react'

export default function CheckoutPanel({
  result,
  nominal,
  setNominal,
  customNominal,
  setCustomNominal,
  isCustom,
  setIsCustom,
  sender,
  setSender,
  paying,
  onPay,
  payError,
  nominalOptions,
  formatRp,
}) {
  const [touched, setTouched] = useState({})
  const markTouched = (f) => setTouched(t => ({ ...t, [f]: true }))

  const amt = isCustom ? Number(customNominal) || 0 : nominal
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender.email.trim())
  const mobileOk = /^(\+62|62|0)\d{8,12}$/.test(sender.mobile.replace(/[\s-]/g, ''))
  const nameOk = sender.name.trim().length > 0
  const amtValid = amt >= 1000
  const senderValid = nameOk && emailOk && mobileOk
  const canPay = senderValid && amtValid && !paying

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-gold-400 to-gold-600" />
        <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Kirim & Bayar</h2>
      </div>

      <div className="flex-1 glass rounded-[20px] sm:rounded-[28px] p-4 sm:p-7 shadow-xl shadow-emerald-900/[0.04]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200/60">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">Kado THR Visual untuk {result.nama}</h3>
            <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">Pilih nominal, isi data, lalu kirim kartunya</p>
          </div>
        </div>

        {/* Nominal Cepat */}
        <div className="mb-4 sm:mb-5">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Pilih Nominal</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {nominalOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setNominal(opt.value); setIsCustom(false); setCustomNominal('') }}
                className={`rounded-xl py-2.5 sm:py-3 px-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  !isCustom && nominal === opt.value
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-[1.03]'
                    : 'bg-white/80 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Nominal */}
        <div className="mb-5 sm:mb-6">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Atau nominal lain</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
            <input
              type="number"
              min="1000"
              placeholder="Ketik jumlah sendiri"
              value={customNominal}
              onChange={(e) => { const v = e.target.value; setCustomNominal(v); setIsCustom(v.length > 0) }}
              className="w-full rounded-xl border border-gray-200/60 bg-white/80 pl-11 pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition"
            />
          </div>
          {isCustom && customNominal && Number(customNominal) < 1000 && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Minimal Rp 1.000
            </p>
          )}
        </div>

        {/* Sender Info */}
        <div className="border-t border-gray-200/60 pt-4 sm:pt-5 mb-5 sm:mb-6">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Dari Siapa?</p>
          <div className="space-y-2 sm:space-y-2.5">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Namamu"
                value={sender.name}
                onChange={(e) => setSender({ ...sender, name: e.target.value })}
                onBlur={() => markTouched('name')}
                className={`w-full rounded-xl border bg-white/80 pl-10 pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition placeholder:text-gray-400 ${touched.name && !nameOk ? 'border-red-300' : 'border-gray-200/60'}`}
              />
              {touched.name && !nameOk && (
                <p className="text-[11px] text-red-500 mt-1 ml-1">Isi nama pengirim</p>
              )}
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email aktif"
                value={sender.email}
                onChange={(e) => setSender({ ...sender, email: e.target.value })}
                onBlur={() => markTouched('email')}
                className={`w-full rounded-xl border bg-white/80 pl-10 pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition placeholder:text-gray-400 ${touched.email && sender.email && !emailOk ? 'border-red-300' : 'border-gray-200/60'}`}
              />
              {touched.email && sender.email && !emailOk && (
                <p className="text-[11px] text-red-500 mt-1 ml-1">Format email tidak valid</p>
              )}
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                placeholder="No. WhatsApp"
                value={sender.mobile}
                onChange={(e) => setSender({ ...sender, mobile: e.target.value })}
                onBlur={() => markTouched('mobile')}
                className={`w-full rounded-xl border bg-white/80 pl-10 pr-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition placeholder:text-gray-400 ${touched.mobile && sender.mobile && !mobileOk ? 'border-red-300' : 'border-gray-200/60'}`}
              />
              {touched.mobile && sender.mobile && !mobileOk && (
                <p className="text-[11px] text-red-500 mt-1 ml-1">Format nomor tidak valid (contoh: 0812...)</p>
              )}
            </div>
          </div>
        </div>

        {/* Total & Pay */}
        <div className="bg-gradient-to-br from-emerald-50/80 to-white rounded-2xl p-4 sm:p-5 border border-emerald-100/60 shadow-inner shadow-emerald-100/40">
          {/* Summary */}
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Nominal THR</span>
              <span className="font-semibold text-gray-700">{formatRp(amt)}</span>
            </div>
            <div className="h-px bg-emerald-200/40" />
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-bold">Total Bayar</span>
              <span className="text-xl sm:text-3xl font-black bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">{formatRp(amt)}</span>
            </div>
          </div>

          {/* Pay Error */}
          {payError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50/80 border border-red-200/60 text-red-700 text-xs mb-3 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>{payError}</span>
            </div>
          )}

          <button
            onClick={onPay}
            disabled={!canPay}
            className={`
              w-full flex items-center justify-center gap-2.5 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-300 cursor-pointer
              ${canPay
                ? `bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.01] ${!paying ? 'btn-shimmer' : ''}`
                : 'bg-gray-300 cursor-not-allowed shadow-none'
              }
            `}
          >
            {paying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menyiapkan pembayaran...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Kirim THR Sekarang
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {!senderValid && !paying && (
            <p className="text-center text-[10px] sm:text-[11px] text-amber-600 mt-2.5">
              Isi dulu data pengirim di atas untuk lanjut
            </p>
          )}

          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-emerald-200/30">
            <p className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Transaksi terenkripsi
            </p>
            <div className="w-px h-3 bg-gray-200" />
            <p className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              Diproses aman oleh Mayar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
