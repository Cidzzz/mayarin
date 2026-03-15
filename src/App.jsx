import { useState, useCallback, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StepIndicator from './components/StepIndicator'
import RecipientForm from './components/RecipientForm'
import ResultCard from './components/ResultCard'
import CheckoutPanel from './components/CheckoutPanel'
import PaymentResultView from './components/PaymentResultView'
import Footer from './components/Footer'

/* ── AI config (Gemini via siputzx) ───────────────────────────── */
const API_BASE = 'https://api.siputzx.my.id/api/ai/gemini-lite'
const MODEL = 'gemini-2.5-flash'

const SYSTEM_PERSONA = `[SYSTEM PERSONA]
Kamu adalah "Mayarin", sastrawan jalanan Indonesia yang jago bikin ucapan THR wholesome.
Gaya bahasamu santai, hangat, kayak ngobrol sama temen.

TUGAS:
Tulis ucapan THR digital: 1 kalimat sapaan hangat + 1 pantun 4 baris.

FORMAT (IKUTI PERSIS):
[UCAPAN]
{1 kalimat sapaan personal, hangat, sebutkan nama penerima, 1 emoji}

[PANTUN]
{4 baris pantun, rima a-b-a-b}

CONTOH OUTPUT:
[UCAPAN]
Ramadhan tahun ini spesial banget buat kamu, Raka — semoga makin berkah! 🤲

[PANTUN]
Beli lontong di gang sempit,
Abang ojol nunggu di tikungan.
THR buat kamu yang selalu sip,
Semoga rezekinya gak ada ujungan! 🌙

ATURAN PANTUN:
1. Tepat 4 baris. Rima a-b-a-b.
2. Baris 1-2 sampiran (lucu/sehari-hari), baris 3-4 isi (THR + doa).
3. Wajib 1-2 emoji di akhir (🌙 ✨ 🕌 🤲 💫).
4. Bahasa gaul/santai, BUKAN bahasa baku. Boleh slang ringan.

ATURAN UCAPAN:
1. Tepat 1 kalimat, hangat dan personal.
2. Sebutkan nama penerima.
3. 1 emoji.

PENTING: Tulis HANYA sesuai format di atas. Tanpa pembuka, penutup, penjelasan, tanda kutip.`

const FALLBACK_RESULTS = [
  { pantun: 'Makan ketupat di rumah Mamat,\nTHR meluncur buat sahabat!\nSemoga rezekinya tambah berlipat,\nDari ujung kaki sampai ubun-ubun rapat. 🌙' },
  { pantun: 'Beli rendang di pasar Minggu,\nLebaran tiba hatiku rindu.\nTerima THR jangan malu,\nDoa terbaik kukirim selalu! ✨' },
]

/* ── Parse AI response into ucapan + pantun ───────────────── */
function parseAIResponse(text) {
  const clean = text.replace(/^"+|"+$/g, '').trim()
  const um = clean.match(/\[UCAPAN\]\s*\n([\s\S]*?)(?=\n\s*\[PANTUN\])/i)
  const pm = clean.match(/\[PANTUN\]\s*\n([\s\S]*?)$/i)
  if (um && pm) return { ucapan: um[1].trim(), pantun: pm[1].trim() }
  const parts = clean.split(/\n\s*\n/)
  if (parts.length >= 2) return { ucapan: parts[0].trim(), pantun: parts.slice(1).join('\n').trim() }
  return { ucapan: '', pantun: clean }
}

/* ── Nominal presets ───────────────────────────────────────── */
const NOMINAL_OPTIONS = [
  { label: 'Rp 50rb', value: 50000 },
  { label: 'Rp 100rb', value: 100000 },
  { label: 'Rp 300rb', value: 300000 },
]

/* ── Mayar config ─────────────────────────────────────────── */
const MAYAR_API = 'https://api.mayar.id/hl/v1/payment/create'
const MAYAR_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMzVmN2UyMy04N2Q5LTRiOTItOWZlNi0zNjA4NjNhMWVjMjQiLCJhY2NvdW50SWQiOiJkYzYxNTBmNC1kMDEwLTRlNTMtYTVmMS03NDY2NTBhNWMxZjAiLCJjcmVhdGVkQXQiOiIxNzczMDMwNDYwOTE0Iiwicm9sZSI6ImRldmVsb3BlciIsInN1YiI6ImR3aWFndW5nMjIyNUBnbWFpbC5jb20iLCJuYW1lIjoiTWF5YXJpbiBBSSIsImxpbmsiOiJtYXlhcmluLWFpIiwiaXNTZWxmRG9tYWluIjpudWxsLCJpYXQiOjE3NzMwMzA0NjB9.IyjJFuHDvENElrGx2xvpnzLlRITGeFLuBRBw9l-HTw06FrHdPXuEtq_Y-kmQkl0RXCedehHUByU4iBnuQzBkB59ZPQb4PdLsC04ex_GG7biPDflQx-i-Qq5Oy-vhq9wj8VBV43Av4xFJyvB3EDengwtVqgtHspvXi7EMFhqdGkvWV55x295e7nq5aUldIjTwAfq8l_lHkeEUBgGMTb3JXNgGeudFyerte0NdliLMDD9EXQSG06731TdhJAtFlxIPAAyunSRFZ-KspomhPvRnvZNinkfc9bgruSUQNSSmIr5fP8aXHqOCvrmktTy6TVp0NQlIMZdbTLni1xIXM6zxIA'
const PAYMENT_DRAFT_KEY = 'mayarin:last-thr-draft'

/* ── Reveal sparkles on result appear ────────────────────── */
function RevealSparkles() {
  const [burst, setBurst] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setBurst(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const particles = [
    { x: -55, y: -65, c: '#facc15', s: 5 },
    { x: 65, y: -45, c: '#10b981', s: 6 },
    { x: -75, y: 35, c: '#34d399', s: 4 },
    { x: 55, y: 55, c: '#facc15', s: 5 },
    { x: -35, y: -75, c: '#10b981', s: 4 },
    { x: 80, y: 15, c: '#facc15', s: 5 },
  ]

  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-30">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.s,
            height: p.s,
            backgroundColor: p.c,
            opacity: burst ? 0 : 1,
            transform: burst
              ? `translate(${p.x}px, ${p.y}px) scale(0)`
              : 'translate(0, 0) scale(1)',
            transition: `all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   APP — Orchestrator
   ══════════════════════════════════════════════════════════════ */
export default function App() {
  /* ── State ──────────────────────────────────────────────── */
  const [form, setForm] = useState({ nama: '', hubungan: '', cerita: '' })
  const [result, setResult] = useState(null)
  const [visualImageUrl, setVisualImageUrl] = useState('')
  const [visualImageName, setVisualImageName] = useState('')
  const [shareDraftMessage, setShareDraftMessage] = useState('')
  const [nominal, setNominal] = useState(50000)
  const [customNominal, setCustomNominal] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState(null)
  const [sender, setSender] = useState({ name: '', email: '', mobile: '' })
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [paymentReceipt, setPaymentReceipt] = useState(null)
  const [postPaymentNotice, setPostPaymentNotice] = useState(null)

  /* ── Payment return URL check ──────────────────────────── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('status') || params.get('payment_status') || params.get('state')
    if (!status) return

    const normalizedStatus =
      status === 'success' || status === 'completed'
        ? 'success'
        : status === 'pending'
          ? 'pending'
          : 'failed'

    setPaymentStatus(normalizedStatus)

    const txId =
      params.get('transaction_id') ||
      params.get('trx_id') ||
      params.get('invoice') ||
      params.get('id') ||
      '-'

    const amountParam = Number(params.get('amount') || 0)
    const draftRaw = localStorage.getItem(PAYMENT_DRAFT_KEY)
    let draft = null
    try {
      draft = draftRaw ? JSON.parse(draftRaw) : null
    } catch {
      draft = null
    }

    setPaymentReceipt({
      status: normalizedStatus,
      transactionId: txId,
      amount: amountParam > 0 ? amountParam : draft?.amount || 0,
      recipient: draft?.recipient || null,
      sender: draft?.sender || null,
      content: draft?.content || null,
      giftLink: `${window.location.origin}${window.location.pathname}`,
      paidAt: new Date().toISOString(),
    })

    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  /* ── Derived step ──────────────────────────────────────── */
  // 1 = input, 2 = AI generating, 3 = checkout
  const currentStep = result ? 3 : generating ? 2 : 1

  /* ── Handlers ──────────────────────────────────────────── */
  const handleImageSelected = useCallback((file) => {
    if (!file) {
      setVisualImageUrl('')
      setVisualImageName('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setVisualImageUrl(String(reader.result || ''))
      setVisualImageName(file.name)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!form.nama.trim()) return
    setGenerating(true)
    setAiError(null)

    const userMsg = [
      `Nama penerima: ${form.nama}`,
      form.hubungan && `Hubungan: ${form.hubungan}`,
      form.cerita && `Tentang dia: ${form.cerita}`,
      'Buatkan ucapan THR Lebaran yang personal untuk orang ini (sapaan + pantun).',
    ].filter(Boolean).join('\n')

    const fullPrompt = `${SYSTEM_PERSONA}\n\n[USER]\n${userMsg}\n\n[ASSISTANT]`

    const url = new URL(API_BASE)
    url.searchParams.set('prompt', fullPrompt)
    url.searchParams.set('model', MODEL)

    try {
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(60000) })
      if (!res.ok) throw new Error(`Server error (${res.status})`)

      const raw = await res.text()
      let pantun

      try {
        const json = JSON.parse(raw)
        pantun =
          json?.data?.parts?.[0]?.text ??
          json?.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          json?.data?.text ??
          json?.result ??
          json?.response ??
          json?.text ??
          json?.answer ??
          json?.message ??
          raw.trim()
      } catch {
        pantun = raw.trim()
      }

      const rawText = String(pantun).trim()
      if (!rawText) throw new Error('Empty response')

      const parsed = parseAIResponse(rawText)
      setResult({
        ...parsed,
        nama: form.nama,
        hubungan: form.hubungan,
        imageUrl: visualImageUrl,
        imageName: visualImageName,
      })
      setEditing(false)
      setShareDraftMessage('')
      setTimeout(() => setShowResult(true), 50)
    } catch (err) {
      if (err.name === 'TimeoutError' || err.name === 'AbortError') {
        setAiError('Request timeout (60s) — coba lagi.')
      } else {
        setAiError(`${err.message}`)
        const fb = FALLBACK_RESULTS[Math.floor(Math.random() * FALLBACK_RESULTS.length)]
        setResult({
          ucapan: `Selamat Lebaran, ${form.nama}! Semoga penuh berkah 🤲`,
          pantun: fb.pantun,
          nama: form.nama,
          hubungan: form.hubungan,
          imageUrl: visualImageUrl,
          imageName: visualImageName,
          isFallback: true,
        })
        setEditing(false)
        setShareDraftMessage('')
        setTimeout(() => setShowResult(true), 50)
      }
    } finally {
      setGenerating(false)
    }
  }, [form, visualImageUrl, visualImageName])

  const createMayarPayment = useCallback(async () => {
    const amt = isCustom ? Number(customNominal) : nominal
    setPayError(null)

    if (!amt || amt < 1000) {
      setPayError('Nominal minimal Rp 1.000 ya')
      return
    }
    if (!sender.name.trim() || !sender.email.trim() || !sender.mobile.trim()) {
      setPayError('Isi dulu nama, email, dan no. HP kamu sebagai pengirim.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender.email.trim())) {
      setPayError('Format email tidak valid.')
      return
    }
    if (!/^(\+62|62|0)\d{8,12}$/.test(sender.mobile.replace(/[\s-]/g, ''))) {
      setPayError('Format nomor HP tidak valid (contoh: 0812...).')
      return
    }

    setPaying(true)
    try {
      const res = await fetch(MAYAR_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MAYAR_KEY}`,
        },
        body: JSON.stringify({
          amount: amt,
          name: sender.name.trim(),
          email: sender.email.trim(),
          mobile: sender.mobile.trim(),
          description: `THR untuk ${result?.nama || 'Penerima'}`,
        }),
      })
      const json = await res.json()
      if (json?.data?.link) {
        localStorage.setItem(PAYMENT_DRAFT_KEY, JSON.stringify({
          amount: amt,
          sender: {
            name: sender.name.trim(),
            email: sender.email.trim(),
            mobile: sender.mobile.trim(),
          },
          recipient: {
            nama: result?.nama || 'Penerima',
            hubungan: result?.hubungan || '',
          },
          content: {
            ucapan: result?.ucapan || '',
            pantun: result?.pantun || '',
            imageUrl: result?.imageUrl || '',
            imageName: result?.imageName || '',
            isFallback: Boolean(result?.isFallback),
          },
          createdAt: new Date().toISOString(),
        }))
        window.location.href = json.data.link
      } else {
        setPayError(json?.messages || 'Link pembayaran gagal dibuat — coba sekali lagi.')
      }
    } catch (err) {
      setPayError(`Koneksi bermasalah: ${err.message}`)
    } finally {
      setPaying(false)
    }
  }, [isCustom, customNominal, nominal, result, sender])

  const formatRp = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

  const handleRegenerate = () => {
    setShowResult(false)
    setShareDraftMessage('')
    setTimeout(() => { setResult(null); handleGenerate() }, 300)
  }

  const handleStartOver = () => {
    setShowResult(false)
    setPaymentStatus(null)
    setPaymentReceipt(null)
    setPostPaymentNotice(null)
    localStorage.removeItem(PAYMENT_DRAFT_KEY)
    setShareDraftMessage('')
    setTimeout(() => {
      setResult(null)
      setForm({ nama: '', hubungan: '', cerita: '' })
      setVisualImageUrl('')
      setVisualImageName('')
      setAiError(null)
      setPayError(null)
    }, 300)
  }

  const handleSaveEdit = () => {
    if (editText.trim()) setResult({ ...result, pantun: editText.trim() })
    setEditing(false)
  }

  const handlePrepareShareDraft = useCallback(async () => {
    if (!result) return
    const payload = {
      type: 'thr-visual-card',
      version: 1,
      generatedAt: new Date().toISOString(),
      recipient: {
        nama: result.nama,
        hubungan: result.hubungan,
      },
      content: {
        ucapan: result.ucapan,
        pantun: result.pantun,
      },
      visual: {
        hasImage: Boolean(result.imageUrl),
        imageName: result.imageName || '',
      },
      exportTargets: ['share-image', 'pdf'],
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
      setShareDraftMessage('Draft share/export tersalin. Siap dipakai untuk fitur kirim gambar/PDF nanti.')
    } catch {
      setShareDraftMessage('Draft share/export siap di state. Clipboard ditolak browser ini.')
    }
  }, [result])

  const handleCopyUcapan = useCallback(async () => {
    const ucapan = paymentReceipt?.content?.ucapan || ''
    const pantun = paymentReceipt?.content?.pantun || ''
    const text = [ucapan, pantun].filter(Boolean).join('\n\n')
    if (!text) {
      setPostPaymentNotice({ type: 'error', text: 'Ucapan belum tersedia untuk disalin.' })
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setPostPaymentNotice({ type: 'success', text: 'Ucapan berhasil disalin.' })
    } catch {
      setPostPaymentNotice({ type: 'error', text: 'Clipboard ditolak browser. Coba lagi.' })
    }
  }, [paymentReceipt])

  const handleCopyGiftLink = useCallback(async () => {
    const link = paymentReceipt?.giftLink || `${window.location.origin}${window.location.pathname}`
    try {
      await navigator.clipboard.writeText(link)
      setPostPaymentNotice({ type: 'success', text: 'Link hadiah berhasil disalin.' })
    } catch {
      setPostPaymentNotice({ type: 'error', text: 'Gagal menyalin link hadiah.' })
    }
  }, [paymentReceipt])

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#f8fdfb] text-gray-800 overflow-x-hidden flex flex-col">
      {/* BG Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-emerald-300/10 rounded-full blur-[80px]" />
      </div>

      <Navbar />

      {/* Payment return page */}
      {paymentStatus && (
        <PaymentResultView
          status={paymentStatus}
          receipt={paymentReceipt}
          formatRp={formatRp}
          notice={postPaymentNotice}
          onCopyUcapan={handleCopyUcapan}
          onCopyGiftLink={handleCopyGiftLink}
          onStartOver={handleStartOver}
        />
      )}

      <main className="flex-1">
        {/* Hero — collapses once form is visible */}
        <Hero
          showCta={!result && !paymentStatus}
          onCtaClick={() => {
            document.getElementById('main-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        <div id="main-section" />

        <div className="max-w-xl mx-auto px-5 sm:px-6 mb-4">
          <StepIndicator current={currentStep} />
        </div>

        {/* Step 1: Form */}
        {!result && (
          <RecipientForm
            form={form}
            setForm={setForm}
            visualImageUrl={visualImageUrl}
            visualImageName={visualImageName}
            onImageSelected={handleImageSelected}
            onGenerate={handleGenerate}
            generating={generating}
            aiError={aiError}
          />
        )}

        {/* Step 2 & 3: Result + Checkout */}
        {result && (
          <section className={`relative max-w-6xl mx-auto px-5 sm:px-6 pb-16 sm:pb-20 transition-all duration-500 ease-out ${
            showResult ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            {showResult && <RevealSparkles />}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
              {/* Left — Card preview (3/5) */}
              <div className={`lg:col-span-3 ${showResult ? 'animate-reveal-card' : ''}`}>
                <ResultCard
                  result={result}
                  editing={editing}
                  editText={editText}
                  setEditText={setEditText}
                  onStartEdit={() => { setEditText(result.pantun); setEditing(true) }}
                  onSaveEdit={handleSaveEdit}
                  onPrepareShareDraft={handlePrepareShareDraft}
                  shareDraftMessage={shareDraftMessage}
                />
              </div>

              {/* Right — Checkout (2/5) */}
              <div className={`lg:col-span-2 ${showResult ? 'animate-slide-right' : ''}`}>
                <CheckoutPanel
                  result={result}
                  nominal={nominal}
                  setNominal={setNominal}
                  customNominal={customNominal}
                  setCustomNominal={setCustomNominal}
                  isCustom={isCustom}
                  setIsCustom={setIsCustom}
                  sender={sender}
                  setSender={setSender}
                  paying={paying}
                  onPay={createMayarPayment}
                  payError={payError}
                  nominalOptions={NOMINAL_OPTIONS}
                  formatRp={formatRp}
                />
              </div>
            </div>

            {/* Action bar */}
            <div className="flex items-center justify-center gap-5 mt-8 sm:mt-10">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition cursor-pointer group"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Buat ulang
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button
                onClick={handleStartOver}
                className="text-sm text-gray-400 hover:text-emerald-600 transition cursor-pointer"
              >
                ← Ganti penerima
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
