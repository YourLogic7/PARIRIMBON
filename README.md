# 📖 PARIRIMBON (Knowledge Management System)

> **KMS Interaktif Berkonsep UI/UX Buku & Asisten AI Pintar untuk Pengetahuan Produk Pegawai**

PARIRIMBON dirancang untuk meningkatkan pemahaman dan kecepatan respons pegawai terhadap produk. Menghadirkan pengalaman interaktif seperti membaca buku fisik (bisa dibuka, ditutup, membalik halaman, dan daftar isi interaktif yang langsung menuju bab tujuan), lengkap dengan panel admin (CRUD) dan fitur **AI Assist** dengan dropdown kasus & kondisi untuk memberikan rekomendasi solusi, SLA, dan skrip komunikasi pelanggan.

---

## ✨ Fitur Utama

1. **📚 Interaktif UI/UX Buku ("Paririmbon")**
   - **Cover Buku 3D**: Tampilan buku fisik mewah dengan tekstur kulit, ornamen emas, dan pita penanda buku (*bookmark*).
   - **Buka & Tutup Buku**: Animasi membuka buku dua halaman (*spread*) dan menutup kembali ke cover.
   - **Efek Suara Kertas**: Efek suara membalik halaman kertas yang realistis (menggunakan Web Audio API tanpa file eksternal).
   - **Daftar Isi Interaktif**: Terletak di halaman awal buku. Setiap bab dapat diklik untuk langsung melompat (*flip*) ke halaman konten terkait.
   - **Pencarian & Filter Kategori**: Filter materi berdasarkan kategori produk, SOP, garansi, atau kata kunci.

2. **🤖 AI Assist (Panduan Kasus Pegawai)**
   - **Input Dropdown Bertingkat**:
     - *Jenis Kasus / Masalah*: Klaim garansi, kendala transaksi QRIS/VA, komplain spesifikasi, permintaan refund, error sistem, dll.
     - *Kategori Produk / Layanan*: Elektronik, Layanan Digital SaaS, Retail, Jasa Keuangan.
     - *Status Pelanggan*: VIP / Prioritas, Reguler, Pelanggan Baru (< 1 bulan), B2B.
     - *Kondisi Spesifik*: Segel utuh, human error, saldo terpotong tapi pending, melebihi batas waktu 14 hari, dll.
   - **Rekomendasi Cerdas**:
     - ⚡ Status Urgensi & SLA Penanganan (Jalur Cepat vs Prosedur Standar)
     - 📌 Analisis Kasus & Acuan Kebijakan Perusahaan
     - 🛠️ Langkah Solusi Bertahap (SOP Tindakan Pegawai)
     - 💬 Template Skrip Komunikasi Santun ke Pelanggan (dengan tombol 1-klik salin skrip)
     - ⚠️ Matriks Eskalasi ke Supervisor
     - 📖 Tautan langsung ke Bab Paririmbon terkait

3. **🛡️ Panel Administrator (CRUD)**
   - Manajemen penuh Daftar Isi & Bab Buku:
     - **Tambah Bab Baru**: Nomor bab, judul, kategori, ringkasan, isi konten (mendukung format Markdown & Tabel), estimasi waktu baca, dan tag.
     - **Edit Bab**: Perbarui informasi SOP atau spesifikasi produk yang berubah sewaktu-waktu.
     - **Hapus Bab**: Hapus materi yang sudah tidak relevan.
   - *Kredensial Default*:
     - **Username**: `admin`
     - **Password**: `paririmbon2026`

4. **⚡ Arsitektur Monorepo & Siap Deploy ke Vercel**
   - **Frontend**: Vite + React + Tailwind CSS + Lucide Icons
   - **Backend**: Node.js + Express API / Vercel Serverless Function (`api/index.js`)
   - **Database**: MongoDB (Mongoose) dengan *In-Memory Automatic Fallback* jika MongoDB Atlas belum dihubungkan (aplikasi tetap berjalan 100% tanpa error).

---

## 📁 Struktur Direktori Monorepo

```
PARIRIMBON/
├── package.json              # Root package monorepo
├── vercel.json               # Konfigurasi deployment Vercel
├── .env.example              # Template variabel lingkungan
├── api/
│   └── index.js              # Entrypoint Serverless Function untuk Vercel
├── server/
│   ├── package.json          # Dependency backend
│   └── src/
│       ├── app.js            # Express application & routing
│       ├── index.js          # Local server runner
│       ├── config/db.js      # Koneksi MongoDB & In-Memory fallback store
│       ├── controllers/      # Controller Halaman, AI Assist, dan Admin Auth
│       ├── data/             # Database materi default Paririmbon & aturan kasus
│       ├── models/           # Mongoose schema (Page, CaseRule)
│       └── routes/           # REST API routes (/api/pages, /api/ai, /api/auth)
└── client/
    ├── package.json          # Dependency frontend
    ├── vite.config.js        # Konfigurasi Vite & proxy /api
    ├── tailwind.config.js    # Konfigurasi styling buku Paririmbon
    └── src/
        ├── App.jsx           # Komponen utama
        ├── components/       # BookCover, BookSpread, TableOfContents, BookPage, AiAssistModal, AdminModal
        ├── context/          # BookContext & AuthContext
        └── services/api.js   # Client HTTP untuk berkomunikasi dengan backend
```

---

## 🚀 Panduan Menjalankan Secara Lokal

### 1. Instalasi Dependensi
Jalankan perintah instalasi untuk seluruh workspace:
```bash
npm run install:all
```
*(Atau instal manual: `npm install` di root, `cd server && npm install`, lalu `cd client && npm install`)*

### 2. Konfigurasi Lingkungan (`.env`)
Salin file `.env.example` ke `.env` di folder root atau `server/`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/paririmbon?retryWrites=true&w=majority
JWT_SECRET=paririmbon_secret_key_kms_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=paririmbon2026
GEMINI_API_KEY=
```
> **Catatan**: Jika `MONGODB_URI` dikosongkan, Paririmbon secara otomatis akan berjalan dalam mode **In-Memory Store** bawaan yang sudah terisi data awal materi lengkap.

### 3. Menjalankan Aplikasi
Jalankan frontend dan backend secara bersamaan:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 🌐 Panduan Deploy ke Vercel

Monorepo ini sudah dilengkapi dengan file `vercel.json` dan `api/index.js` yang siap pakai untuk Vercel:

1. Push repositori ini ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Import repositori **PARIRIMBON**.
4. Di bagian **Environment Variables**, tambahkan:
   - `MONGODB_URI`: Connection string MongoDB Atlas Anda.
   - `JWT_SECRET`: Kunci rahasia JWT bebas.
   - `ADMIN_USERNAME`: Username admin (contoh: `admin`).
   - `ADMIN_PASSWORD`: Password admin (contoh: `paririmbon2026`).
   - `GEMINI_API_KEY`: *(Opsional)* API Key Google Gemini untuk penalaran AI dinamis.
5. Klik **Deploy**! Vercel akan otomatis membangun frontend ke `client/dist` dan menjalankan endpoint serverless di `/api/*`.