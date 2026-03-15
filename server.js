import 'dotenv/config'
import express from 'express'
import rateLimit from 'express-rate-limit'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3030

const MAYAR_API_URL = process.env.MAYAR_API_URL
const MAYAR_API_KEY = process.env.MAYAR_API_KEY

if (!MAYAR_API_URL || !MAYAR_API_KEY) {
  console.warn('[server] Warning: MAYAR_API_URL or MAYAR_API_KEY not set. Payment endpoint will return errors.')
}

app.use(express.json())

// Rate limiter for payment endpoint
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 payment requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Terlalu banyak permintaan pembayaran. Coba lagi nanti.' },
})

// Serve static files from the Vite build output
app.use(express.static(join(__dirname, 'dist')))

// Payment proxy endpoint — keeps MAYAR_API_KEY server-side only
app.post('/api/payment', paymentLimiter, async (req, res) => {
  const { amount, name, email, mobile, description } = req.body

  if (!amount || !name || !email || !mobile) {
    return res.status(400).json({ error: 'Missing required fields: amount, name, email, mobile' })
  }

  if (!MAYAR_API_KEY || !MAYAR_API_URL) {
    console.error('[payment] MAYAR_API_KEY or MAYAR_API_URL is not configured')
    return res.status(500).json({ error: 'Payment service is not configured' })
  }

  try {
    const response = await fetch(MAYAR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAYAR_API_KEY}`,
      },
      body: JSON.stringify({ amount, name, email, mobile, description }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.messages || 'Payment request failed',
      })
    }

    // Only return the payment link to the client — no sensitive data
    res.json({ link: data?.data?.link || null })
  } catch (err) {
    console.error('[payment] Proxy error:', err.message)
    res.status(502).json({ error: 'Failed to connect to payment service' })
  }
})

// SPA fallback — serve index.html for all unmatched routes
app.use((_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Mayarin server running on port ${PORT}`)
})
