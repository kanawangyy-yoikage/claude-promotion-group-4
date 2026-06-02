# Claude AI — Landing Page
### Proyek Kelompok 4

Website landing page informatif tentang Claude AI dari Anthropic, dibuat sebagai proyek kelompok. Menampilkan fitur, kemampuan, perbandingan, testimoni, dan demo interaktif Claude AI dalam Bahasa Indonesia.

---

## 🚀 Demo

> Deploy ke Vercel untuk melihat hasilnya secara langsung (panduan di bawah).

---

## ✨ Fitur Halaman

- **Hero Section** — animasi partikel, counter statistik, dan CTA
- **Tentang Claude** — penjelasan Constitutional AI dan keunggulan konteks
- **Fitur Unggulan** — grid 6 kartu fitur utama
- **Demo Interaktif** — tab percakapan, coding, dan analisis data
- **Cara Kerja** — 4 langkah mudah mulai menggunakan Claude
- **Use Cases** — target pengguna: developer, penulis, pelajar, profesional
- **Keamanan** — Constitutional AI dan privasi data
- **Perbandingan** — tabel keunggulan vs AI lain
- **Testimoni** — carousel auto-scroll
- **FAQ** — accordion pertanyaan umum
- **Section Tim** — profil anggota Kelompok 4
- **Dark/Light Mode** — toggle tema dengan persistensi `localStorage`
- **Responsif** — mobile-friendly dengan hamburger menu

---

## 🗂️ Struktur Proyek

```
claude-ai-kelompok4/
├── index.html              # Halaman utama (single-page)
├── vercel.json             # Konfigurasi deploy Vercel
├── .gitignore
├── README.md
├── css/
│   └── style.css           # Semua styling dan animasi
├── js/
│   └── main.js             # Semua interaktivitas JavaScript
└── assets/
    └── images/
        └── claude-color.png  # Logo Claude
```

---

## 🛠️ Cara Menjalankan Lokal

Tidak memerlukan build tool atau package manager — cukup buka langsung di browser.

**Opsi 1 — Buka langsung:**
```
Buka file index.html di browser (double-click)
```

**Opsi 2 — Live server (direkomendasikan):**
```bash
# Menggunakan Python
python3 -m http.server 3000

# Atau menggunakan Node.js (npx)
npx serve .
```
Kemudian buka `http://localhost:3000` di browser.

---

## ☁️ Deploy ke Vercel

### Cara 1 — Via Vercel Dashboard (Termudah)

1. Push proyek ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik **"Add New Project"** → import repository
4. Vercel otomatis mendeteksi sebagai **Static Site**
5. Klik **Deploy** — selesai! 🎉

### Cara 2 — Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Di dalam folder proyek, jalankan:
vercel

# Ikuti instruksi (login, nama proyek, dll.)
# Untuk production deployment:
vercel --prod
```

### Cara 3 — Drag & Drop

1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop seluruh folder proyek ke halaman tersebut
3. Deploy otomatis berjalan

---

## 👥 Tim Kelompok 4

| Nama | Handle |
|------|--------|
| M. Haikal Khamdi | [@haikalkhamdi24](https://www.tiktok.com/@haikalkhamdi24) |
| M. Tsaqib Ashfahani | [@ttiktok654](https://www.tiktok.com/@ttiktok654) |
| Octa Aditya Pratama | [@oczzb](https://www.tiktok.com/@oczzb) |
| Wangsit Bagus Satriatama | [@kanawangyy](https://github.com/kanawangyy) |

---

## 🛠️ Teknologi

- **HTML5** — struktur semantik
- **CSS3** — animasi, variabel, grid, flexbox
- **Vanilla JavaScript** — tanpa framework, tanpa dependency

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademis. Konten dan merek Claude AI adalah milik [Anthropic](https://anthropic.com).
