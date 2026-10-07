// Initial default knowledge base for PARIRIMBON (Kitab Pengetahuan Produk)
export const initialPages = [
  {
    id: "page-1",
    chapterNumber: 1,
    title: "Pengantar & Filosofi Produk Paririmbon",
    category: "Dasar Produk",
    summary: "Memahami esensi, nilai unggulan, dan etika pelayanan produk bagi seluruh pegawai garda depan.",
    content: `
### 1. Hakikat Produk & Komitmen Mutu
Paririmbon dirancang sebagai panduan tunggal (Single Source of Truth) untuk memastikan setiap pegawai memiliki pemahaman mendalam tentang ekosistem produk yang ditawarkan kepada pelanggan. 

Setiap interaksi dengan pelanggan mencerminkan 3 pilar utama:
1. **Kejelasan Informasi**: Jangan pernah berspekulasi tentang spesifikasi fitur jika belum terverifikasi di Paririmbon.
2. **Kecepatan Respon**: Waktu tanggap awal maksimal 3 menit pada kanal digital, dan 30 detik pada layanan tatap muka.
3. **Solutif Berempati**: Utamakan mendengar kebutuhan pelanggan sebelum menawarkan alternatif solusi.

### 2. Standar Pelayanan Paririmbon
- **Salam Pembuka Standar**: "Selamat [pagi/siang/sore], dengan [Nama Anda] di layanan Paririmbon. Ada yang bisa saya bantu optimalkan untuk produk Anda hari ini?"
- **Kaidah Klarifikasi**: Selalu gunakan teknik *mirroring* untuk mengonfirmasi keluhan atau kebutuhan pelanggan sebelum melangkah ke proses penyelesaian.
    `.trim(),
    tags: ["Onboarding", "Filosofi", "SOP Dasar", "Nilai Layanan"],
    readTime: "3 min",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "page-2",
    chapterNumber: 2,
    title: "Katalog & Matriks Spesifikasi Produk",
    category: "Katalog Produk",
    summary: "Perbandingan fitur, batasan sistem, dan target segmen untuk Paket Standar, Profesional, dan Korporat.",
    content: `
### 1. Matriks Spesifikasi Paket Produk

| Fitur / Layanan | Paket Standar (Silver) | Paket Profesional (Gold) | Paket Korporat (Platinum) |
| :--- | :--- | :--- | :--- |
| **Kapasitas Pengguna** | Maks. 5 Akun | Maks. 25 Akun | Unlimited / Kustom |
| **Penyimpanan Cloud** | 50 GB Terenkripsi | 500 GB Terenkripsi | Dedicated 2 TB+ Multi-Region |
| **SLA Garansi Uptime** | 99.0% | 99.8% | 99.99% dengan Kompensasi |
| **Dukungan Pelanggan** | Email (Maks 24 jam) | Live Chat & Telp (Maks 2 jam) | Dedicated Account Manager (24/7) |
| **Integrasi API** | Dasar (Webhook) | Penuh (REST & GraphQL) | Custom Middleware & Sandbox |

### 2. Batasan Pemakaian Wajar (FUP)
- Pengiriman notifikasi broadcast dibatasi maksimal 10.000 pesan/hari untuk paket non-korporat.
- Backup data otomatis dilakukan setiap pukul 02:00 WIB dini hari.
    `.trim(),
    tags: ["Spesifikasi", "Tiering", "Katalog", "Harga & Fitur"],
    readTime: "5 min",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "page-3",
    chapterNumber: 3,
    title: "SOP Transaksi, Pembayaran & Billing",
    category: "Operasional & Finansial",
    summary: "Prosedur operasional standar rekonsiliasi pembayaran gagal, status invoice tertunda, dan verifikasi QRIS.",
    content: `
### 1. Alur Penanganan Transaksi Menggantung (Pending/Timeout)
Ketika pelanggan melaporkan saldo terpotong namun status transaksi di sistem masih "Menunggu Pembayaran":

1. **Langkah 1: Verifikasi ID Transaksi & RRN**
   - Minta kode referensi pembayaran (RRN / Retrieval Reference Number atau ID Billing dari mutasi rekening pelanggan).
2. **Langkah 2: Sinkronisasi Gateway**
   - Akses Portal Rekonsiliasi Internal > Masukkan Invoice ID > Klik tombol **"Sync Gateway Status"**.
3. **Langkah 3: Ketentuan Settlement Bank**
   - Jika status QRIS "PENDING": Tunggu jendela auto-settlement maksimal 15 menit.
   - Jika setelah 15 menit status tetap tidak berubah: Terbitkan tiket investigasi ke Tim Finance dengan melampirkan bukti potong nasabah.

### 2. Kebijakan Koreksi Faktur (Invoice Revision)
Perubahan nama entitas atau NPWP pada faktur pajak hanya dapat diproses dalam bulan kalender yang sama dengan tanggal transaksi.
    `.trim(),
    tags: ["Billing", "Keuangan", "QRIS", "SOP Transaksi"],
    readTime: "4 min",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "page-4",
    chapterNumber: 4,
    title: "Kebijakan Garansi, Retur & Penggantian Unit",
    category: "Garansi & Retur",
    summary: "Pedoman resmi syarat klaim garansi toko 14 hari, garansi resmi pabrikan, dan kriteria penolakan void.",
    content: `
### 1. Kriteria Klaim Garansi Berlaku
Pelanggan berhak memperoleh penggantian unit baru (One-to-One Replacement) jika memenuhi seluruh kriteria berikut:
- Transaksi dilakukan dalam kurun waktu **maksimal 14 hari kalender** sejak tanggal serah terima.
- Membawa faktur asli fisik atau e-receipt resmi berstempel digital.
- Unit dalam kondisi fisik tanpa retak, tanpa korosi, dan stiker segel garansi dalam keadaan utuh.
- Kelengkapan aksesoris (dus, buku panduan, kabel) lengkap 100%.

### 2. Kondisi Garansi Tidak Berlaku (Void)
- Kerusakan akibat terkena cairan (Liquid Damage) atau lonjakan voltase listrik tidak stabil.
- Indikasi modifikasi perangkat keras atau instalasi firmware tidak resmi (rooting / jailbreak).
- Produk dibeli melalui kanal pihak ketiga yang tidak terdaftar sebagai Authorized Partner.

### 3. Matriks Keputusan Penggantian Dana (Refund)
Pengembalian dana (refund) hanya diizinkan apabila stok unit pengganti kosong lebih dari 7 hari kerja.
    `.trim(),
    tags: ["Garansi", "Retur", "SOP Servis", "Kebijakan"],
    readTime: "6 min",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "page-5",
    chapterNumber: 5,
    title: "Panduan Troubleshooting Gangguan Produk",
    category: "Troubleshooting",
    summary: "Langkah terstruktur isolasi masalah teknis umum perangkat dan layanan software sebelum eskalasi ke Tim Eng.",
    content: `
### 1. Protokol Isolasi Masalah 4-Tahap
Sebelum mengajukan tiket perbaikan ke Tim Engineering, lakukan langkah mandiri:

1. **Cek Status Server & Incident Dashboard**
   - Pastikan bukan dampak pemeliharaan terencana (Maintenance Notice).
2. **Uji Validitas Sesi & Cache Pengguna**
   - Pandu pengguna untuk menghapus cache browser atau melakukan *Force Logout & Re-login*.
3. **Uji Konektivitas Jaringan Pengguna**
   - Minta pengguna beralih sementara ke tethering seluler guna memastikan bukan blokade firewall internal kantor mereka.
4. **Reproduksi Kode Kesalahan (Error Code)**
   - Catat kode HTTP (contoh: 403 Forbidden, 502 Bad Gateway) beserta tangkapan layar penuh konsol browser.

### 2. Matriks Kode Kesalahan Umum
- **ERR-AUTH-009**: Sesi kadaluarsa. Solusi: Refresh token / Login ulang.
- **ERR-LIMIT-042**: Melebihi kuota API per menit. Solusi: Upgrade tier atau terapkan throttling client.
- **ERR-SYNC-105**: Konflik data lokal vs cloud. Solusi: Reset sinkronisasi lokal.
    `.trim(),
    tags: ["Troubleshooting", "Teknis", "SOP Engineering", "Error Code"],
    readTime: "5 min",
    lastUpdated: new Date().toISOString()
  },
  {
    id: "page-6",
    chapterNumber: 6,
    title: "Etika Komunikasi Krisis & Eskalasi Komplain",
    category: "Customer Service",
    summary: "Skrip de-eskalasi emosi pelanggan, penanganan keluhan viral, dan pembagian wewenang supervisor.",
    content: `
### 1. Prinsip De-Eskalasi L.A.S.T
Ketika menghadapi pelanggan dengan nada tinggi atau emosional:
- **L - Listen (Dengarkan)**: Biarkan pelanggan menyelesaikan penjelasannya tanpa memotong kalimat.
- **A - Apologize (Minta Maaf atas Ketidaknyamanan)**: Tunjukkan empati tanpa langsung mengakui kesalahan hukum perusahaan ("Kami memahami betapa krusialnya kendala ini bagi operasional Anda...").
- **S - Solve (Tawarkan Solusi Jelas)**: Berikan rencana aksi bertahap dan estimasi waktu yang masuk akal.
- **T - Thank (Terima Kasih)**: Apresiasi masukan pelanggan karena telah membantu meningkatkan kualitas produk.

### 2. Batas Kewenangan Diskresi Pegawai
- **Petugas Frontline**: Berwenang memberikan kompensasi voucher maksimal Rp 100.000 atau perpanjangan lisensi 7 hari.
- **Team Lead / Supervisor**: Berwenang diskresi penggantian unit langsung tanpa verifikasi laboratorium teknis hingga Rp 2.500.000.
    `.trim(),
    tags: ["Komunikasi", "Komplain", "Eskalasi", "Diskresi"],
    readTime: "4 min",
    lastUpdated: new Date().toISOString()
  }
];

// Initial pre-configured AI Assist rules with Case, Conditions, and Resolution guidelines
export const initialCaseRules = [
  {
    id: "case-1",
    caseType: "Klaim Garansi & Penggantian Unit Rusak",
    productType: "Produk Fisik Elektronik",
    customerType: "Pelanggan Member VIP / Prioritas",
    conditionDetail: "Segel Utuh & Bukti Pembelian Lengkap",
    severity: "Prioritas Cepat (Fast-Track SLA 2 Jam)",
    targetPageNumber: 4,
    analysis: "Pelanggan VIP berhak mendapatkan layanan jalur khusus penggantian unit langsung (One-to-One Replacement) tanpa harus menunggu pemeriksaan lab 7 hari, selama segel utuh dan transaksi dalam kurun waktu 14 hari.",
    steps: [
      "Verifikasi identitas nomor member VIP dan validasi e-receipt pembelian.",
      "Lakukan inspeksi fisik singkat memastikan segel utuh dan tidak ada tanda terkena air.",
      "Keluarkan unit pengganti baru dari buffer stock khusus VIP.",
      "Bantu pemindahan data atau setup awal perangkat di counter jika diinginkan pelanggan.",
      "Tutup tiket dengan status 'Resolved - Fast Track VIP Replacement'."
    ],
    script: "Selamat [Pagi/Siang/Sore] Bapak/Ibu [Nama]. Mengingat Bapak/Ibu adalah anggota Prioritas kami dan seluruh syarat kelengkapan terpenuhi, kami akan langsung menggantikan unit baru saat ini juga tanpa perlu menunggu antrean servis reguler.",
    escalationNote: "Bila buffer stock kosong, segera hubungi Store Manager untuk mengambil alokasi dari toko mitra terdekat dengan pengantaran kurir instan."
  },
  {
    id: "case-2",
    caseType: "Klaim Garansi & Penggantian Unit Rusak",
    productType: "Produk Fisik Elektronik",
    customerType: "Pelanggan Reguler",
    conditionDetail: "Indikasi Kerusakan Pengguna (Human Error / Terkena Air)",
    severity: "Prosedur Standar & Penjelasan Santun",
    targetPageNumber: 4,
    analysis: "Kerusakan akibat cairan atau benturan fisik berada di luar cakupan garansi pabrik resmi (Void Warranty). Pegawai harus mengedukasi dengan santun dan menawarkan opsi perbaikan bersubsidi/diskon servis.",
    steps: [
      "Perlihatkan indikator sensor kelembaban (LDI) atau dokumentasikan keretakan fisik bersama pelanggan.",
      "Buka Paririmbon Halaman 4 Pasal 2 mengenai Kebijakan Pengecualian Garansi.",
      "Sampaikan secara empatik bahwa unit tidak dapat ditukar baru secara gratis.",
      "Tawarkan opsi reparasi resmi dengan estimasi biaya dan diskon suku cadang 15% untuk pelanggan terdaftar.",
      "Jika pelanggan setuju, buatkan tanda terima servis berbayar."
    ],
    script: "Mohon maaf yang sebesar-besarnya Bapak/Ibu. Berdasarkan pengecekan sensor cairan internal, unit mengalami kelembaban tinggi yang masuk dalam pengecualian garansi pabrikan. Namun, kami ingin tetap membantu dengan menawarkan biaya perbaikan resmi dengan diskon khusus 15% untuk suku cadang aslinya.",
    escalationNote: "Jika pelanggan menolak dan bersikeras menuntut pergantian gratis, eskalasikan ke Supervisor Duty untuk mediasi lebih lanjut."
  },
  {
    id: "case-3",
    caseType: "Kendala Pembayaran & Transaksi Gagal",
    productType: "Layanan Berlangganan Digital",
    customerType: "Pelanggan Member VIP / Prioritas",
    conditionDetail: "Saldo Terpotong tapi Invoice Tertunda (Pending)",
    severity: "Segera / Jalur Ekspres",
    targetPageNumber: 3,
    analysis: "Kendala sinkronisasi gateway pembayaran bank. Jangan biarkan pelanggan VIP menunggu 1x24 jam untuk aktivasi layanan.",
    steps: [
      "Minta screenshot bukti potong mutasi rekening / ID RRN.",
      "Lakukan manual override di Dashboard Admin Billing untuk mengaktifkan lisensi secara instan (Grace Period 3 hari).",
      "Input nomor tiket sinkronisasi internal ke Tim Finansial untuk penyelesaian rekonsiliasi otomatis.",
      "Kirimkan notifikasi WhatsApp konfirmasi bahwa akses layanan sudah aktif kembali."
    ],
    script: "Terima kasih atas konfirmasinya Bapak/Ibu. Bukti pembayaran sudah kami terima. Agar tidak mengganggu operasional Bapak/Ibu, sistem telah kami aktifkan secara langsung saat ini juga selagi tim keuangan kami menyelesaikan sinkronisasi perbankan.",
    escalationNote: "Waktu penanganan maksimal 15 menit sejak bukti diterima."
  },
  {
    id: "case-4",
    caseType: "Kendala Pembayaran & Transaksi Gagal",
    productType: "Produk Fisik Elektronik",
    customerType: "Pelanggan Reguler",
    conditionDetail: "Saldo Terpotong tapi Invoice Tertunda (Pending)",
    severity: "SOP Standar Rekonsiliasi",
    targetPageNumber: 3,
    analysis: "Transaksi QRIS/Virtual Account mengalami delay interkoneksi settlement antar bank. Prosedur membutuhkan pengecekan RRN sistem.",
    steps: [
      "Buka menu Paririmbon Halaman 3 (SOP Transaksi & Pembayaran).",
      "Ambil nomor RRN atau referensi bank dari nasabah.",
      "Lakukan klik 'Sync Gateway Status' di portal kasir/billing.",
      "Jika status tetap belum terupdate dalam 15 menit, buatkan tiket laporan investigasi perbankan dengan SLA 1x24 jam.",
      "Berikan nomor referensi tiket penanganan kepada nasabah."
    ],
    script: "Mohon ditunggu sebentar Bapak/Ibu, kami sedang melakukan sinkronisasi status pembayaran dengan pihak penyedia gateway perbankan. Biasanya proses ini memerlukan waktu sekitar 5-15 menit untuk konfirmasi pembaruan saldo.",
    escalationNote: "Bila dalam 1x24 jam dana belum kembali atau terbit invoice, eskalasikan ke Helpdesk Keuangan Pusat."
  },
  {
    id: "case-5",
    caseType: "Komplain Ketidaksesuaian Spesifikasi Produk",
    productType: "Layanan Berlangganan Digital",
    customerType: "Pelanggan Baru (< 1 Bulan)",
    conditionDetail: "Fitur Tertentu Tidak Tersedia di Paket yang Dibeli",
    severity: "Edukasi & Opsi Upgrade Khusus",
    targetPageNumber: 2,
    analysis: "Pelanggan baru sering kali berasumsi fitur korporat tersedia di paket standar. Pegawai harus menggunakan Matriks Spesifikasi Produk di Bab 2 untuk mengedukasi dan menawarkan promosi upgrade selisih harga.",
    steps: [
      "Buka Paririmbon Halaman 2 (Matriks Spesifikasi Paket).",
      "Perlihatkan dengan sopan batas fitur Paket Standar vs Paket Profesional.",
      "Tawarkan program 'Prorate Upgrade' (hanya membayar selisih harga tanpa hangus biaya langganan sebelumnya).",
      "Berikan demo singkat fitur yang diinginkan selama 7 hari gratis (Trial Extension) jika disetujui."
    ],
    script: "Kami memahami kebutuhan fitur tersebut sangat penting untuk operasional Bapak/Ibu. Di paket yang saat ini aktif, fitur tersebut memang dialokasikan pada tier Profesional. Sebagai apresiasi telah bergabung bersama kami, kami dapat menawarkan opsi upgrade hanya dengan membayar selisihnya saja, plus kami sertakan bonus pendampingan setup.",
    escalationNote: "Jika pelanggan merasa merasa tersesat oleh informasi tim sales lama, laporkan ke Tim Quality Assurance Sales."
  },
  {
    id: "case-6",
    caseType: "Permintaan Refund / Pembatalan Pesanan",
    productType: "Jasa & Layanan Keuangan",
    customerType: "Pelanggan Reguler",
    conditionDetail: "Melebihi Batas Waktu Ketentuan Kebijakan (> 14 Hari)",
    severity: "Penjelasan Kebijakan Tegas & Solutif",
    targetPageNumber: 4,
    analysis: "Permintaan refund di luar 14 hari tidak dapat diproses sesuai kepatuhan regulasi, namun pegawai dapat menawarkan pengalihan saldo kredit layanan (Service Credit) yang dapat digunakan di masa depan.",
    steps: [
      "Sampaikan empati dan jelaskan batas ketentuan regulasi keuangan 14 hari secara transparan.",
      "Alih-alih penolakan kaku, tawarkan konversi saldo menjadi 'Credit Balance' yang tidak memiliki masa kedaluwarsa.",
      "Kredit dapat digunakan untuk pembelian produk lain atau dipindahtangankan ke entitas afiliasi pengguna.",
      "Dokumentasikan persetujuan pelanggan di sistem."
    ],
    script: "Sesuai dengan ketentuan perbankan dan kebijakan layanan di Halaman 4 Paririmbon, pengembalian dana tunai hanya dapat diproses maksimal 14 hari sejak transaksi. Namun, kami tidak ingin dana Bapak/Ibu terbuang sia-sia, kami dapat mengalihkan saldo tersebut menjadi Saldo Kredit Layanan aktif yang dapat digunakan kapan saja.",
    escalationNote: "Pengecualian refund uang tunai hanya dapat diotorisasi oleh Direktur Operasional dengan alasan force majeure."
  }
];

// Dropdown options lists for AI Assist UI
export const caseOptionsList = [
  "Klaim Garansi & Penggantian Unit Rusak",
  "Kendala Pembayaran & Transaksi Gagal",
  "Komplain Ketidaksesuaian Spesifikasi Produk",
  "Permintaan Refund / Pembatalan Pesanan",
  "Gangguan Teknis Sistem / Error Tidak Terduga",
  "Komplain Keterlambatan Pengiriman & Layanan"
];

export const productOptionsList = [
  "Produk Fisik Elektronik",
  "Layanan Berlangganan Digital",
  "Produk Konsumsi / Retail",
  "Jasa & Layanan Keuangan"
];

export const customerOptionsList = [
  "Pelanggan Member VIP / Prioritas",
  "Pelanggan Reguler",
  "Pelanggan Baru (< 1 Bulan)",
  "Mitra Bisnis / Reseller B2B"
];

export const conditionOptionsList = [
  "Segel Utuh & Bukti Pembelian Lengkap",
  "Indikasi Kerusakan Pengguna (Human Error / Terkena Air)",
  "Saldo Terpotong tapi Invoice Tertunda (Pending)",
  "Fitur Tertentu Tidak Tersedia di Paket yang Dibeli",
  "Melebihi Batas Waktu Ketentuan Kebijakan (> 14 Hari)",
  "Bukti Transaksi Fisik Hilang / Tidak Terbaca",
  "Sistem Mengeluarkan Kode Error 500 / 502"
];
