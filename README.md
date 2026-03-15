# 🌙 Mayarin AI - Kirim Kado & THR Digital Dirancang oleh AI

![Vibecoding Ramadhan 2026](https://img.shields.io/badge/Event-Vibecoding_Ramadhan_2026-10b981?style=for-the-badge)
![Powered by Gemini](https://img.shields.io/badge/AI_Engine-Google_Gemini-blue?style=for-the-badge)
![Payment by Mayar](https://img.shields.io/badge/Payment-Mayar_Sandbox-blue?style=for-the-badge)

## 🚀 Tentang Proyek
**Mayarin AI** (plesetan dari "Bayarin" dan "Mayar") adalah platform pengiriman Kado dan THR digital revolusioner yang dirancang khusus untuk menyambut Ramadhan dan Idul Fitri. 

Menggantikan tradisi transfer uang yang kaku, Mayarin AI menggunakan *Generative AI* untuk meracik ucapan personal dan pantun lucu berdasarkan karakter penerima, lalu mengintegrasikannya dengan *payment gateway* untuk pengalaman berbagi THR yang *seamless* dan bermakna.

## 🤖 Proses "Vibecoding" (AI Agentic Development)
Proyek ini dibangun 100% menggunakan metodologi *Vibecoding*. Alih-alih menulis *boilerplate* manual, pengembangan dilakukan dengan mengarahkan LLM sebagai kuli koding:
1. **UI/UX Generation:** Menggunakan prompt deskriptif untuk menghasilkan UI berbasis React & Tailwind dengan nuansa *Modern SaaS* (Emerald Green & Gold) via [v0 by Vercel / Cursor].
2. **Logic & API Integration:** Menjalankan *System Context* (Mega-Prompt) yang menginstruksikan AI untuk membangun *state management* yang menjahit form input, fetch ke Gemini API, dan transisi ke UI hasil secara mulus.

## ✨ Fitur Utama
- **Generative Greeting (Gemini API):** Otomatis membuatkan ucapan dan pantun Lebaran yang hangat dan lucu berdasarkan konteks profil penerima.
- **Split-Layout Result UI:** Menampilkan amplop digital estetik di satu sisi, dan form nominal THR di sisi lainnya.
- **Seamless Checkout (Mayar Integration):** Pembuatan *Payment Link* instan menggunakan API Mayar.

## 🛠️ Tech Stack
- **Frontend:** React.js / Next.js, Tailwind CSS, Lucide Icons
- **AI Engine:** Google Gemini Pro API (REST)
- **Payment Gateway:** Mayar API 

## ⚠️ Catatan Khusus untuk Juri (Integrasi Mayar)
Integrasi *payment gateway* Mayar pada repositori dan *live demo* ini secara sengaja diatur menggunakan **Environment Sandbox (Mode Uji Coba)**. 
Oleh karena itu, saat di-*redirect* ke halaman *checkout* Mayar, opsi pembayaran *live* seperti QRIS atau Virtual Account mungkin tidak ditampilkan oleh sistem Mayar demi alasan keamanan (*unverified testing account*). Logika *API Request* dan integrasi *payload* telah berjalan 100% sukses. Transisi ke *Production* dapat dilakukan hanya dengan menukar `MAYAR_API_KEY` di *Environment Variables* lalu verifikasi akun untuk integrasi nyata dengan sukses.

## 💻 Cara Menjalankan di Lokal (Local Setup)

1. Clone repositori ini:
   ```bash
   git clone [https://github.com/username-kamu/mayarin-ai.git](https://github.com/username-kamu/mayarin-ai.git)
