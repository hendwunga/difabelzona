# ♿ DifabelZone — Seni Melampaui Batas

> **Empowering Artisan Abilities through Modern Technology**

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://difabelzona.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase_Powered-3FC68D?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🌟 Visi & Misi

**DifabelZone** adalah platform _social enterprise_ yang dirancang untuk mendigitalisasi karya para pengrajin disabilitas di Indonesia. Kami bertransformasi dari sekadar katalog produk menjadi ekosistem inklusif yang memprioritaskan kemandirian ekonomi melalui teknologi mutakhir.

Kami percaya bahwa keterbatasan fisik bukanlah penghalang bagi kreativitas dan kemandirian finansial. DifabelZone hadir sebagai jembatan yang menghubungkan **karya tulus** dengan **apresiasi tulus**.

---

## 🔄 Evolusi Teknis: Migrasi Laravel ke Next.js 15

Proyek ini telah melalui transformasi arsitektur yang signifikan untuk mencapai performa _enterprise-grade_ dan pengalaman pengguna yang lebih responsif.

| Dimensi       | Legacy System (Laravel) | Modern System (Next.js 15) | Dampak Performa                |
| :------------ | :---------------------- | :------------------------- | :----------------------------- |
| **Rendering** | Server-Side (Blade)     | Hybrid (SSR & ISR)         | Akses halaman 60% lebih cepat  |
| **State**     | Session-based           | TanStack Query & Context   | UI lebih fluid tanpa refresh   |
| **Keamanan**  | Manual Auth             | Supabase Auth (JWT)        | Enkripsi data standar industri |
| **Typing**    | Dynamic (PHP)           | Static (TypeScript)        | Mengurangi bug saat runtime    |

---

## ✨ Fitur Utama & Inklusivitas

### 🎨 Katalog "Karya Hati"

Etalase produk yang dikurasi secara estetik, menampilkan detail tekstur, bahan, dan narasi di balik setiap kerajinan tangan menggunakan optimasi gambar `next/image`.

### ♿ Aksesibilitas Web (WCAG Compliance)

Kami membangun dengan prinsip inklusi digital:

- **Semantic HTML**: Struktur yang ramah bagi _Screen Readers_.
- **High Contrast Support**: Navigasi yang jelas bagi pengguna dengan gangguan penglihatan.
- **Keyboard Friendly**: Seluruh fitur dapat diakses tanpa menggunakan mouse.

### 🛡️ Transaksi Aman & Personal

- **Seamless Checkout**: Integrasi dengan Midtrans untuk pembayaran otomatis.
- **Hybrid Support**: Pilihan checkout via WhatsApp Admin untuk membantu pengguna yang lebih nyaman dengan komunikasi personal.

---

## 🛠️ Arsitektur Teknologi

Aplikasi ini dibangun menggunakan _Tech Stack_ kelas dunia untuk menjamin skalabilitas:

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **UI Library**: Shadcn UI & Framer Motion (untuk animasi yang halus).
- **Backend as a Service**: Supabase (PostgreSQL, Auth, Storage).
- **Payment Gateway**: Midtrans Integration.
- **Monitoring**: Vercel Analytics.

---

## 📂 Struktur Folder Proyek

```text
src/
├── app/              # Routing & Server Components
├── components/
│   ├── ui/           # Komponen dasar (Atom)
│   ├── shared/       # Layout, Navbar, Footer
│   └── modules/      # Logika fitur (Cart, Product, Auth)
├── hooks/            # Custom React Hooks
├── lib/              # Konfigurasi SDK (Supabase, Midtrans)
├── types/            # Definisi Interface TypeScript
└── store/            # State Management

```

---

## 🚀 Memulai Pengembangan Lokal

1. **Clone Repositori**

```bash
git clone [https://github.com/hendwunga/difabelzona.git](https://github.com/hendwunga/difabelzona.git)
cd difabelzone

```

2. **Instalasi Dependensi**

```bash
npm install

```

3. **Konfigurasi Environment Variable**
   Buat file `.env.local` dan lengkapi data berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
MIDTRANS_SERVER_KEY=your_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key

```

4. **Jalankan Mode Pengembangan**

```bash
npm run dev

```

---

## 🗺️ Roadmap Masa Depan

- [ ] **Multi-language Support**: Dukungan Bahasa Inggris untuk pasar internasional.
- [ ] **Artisan Story Video**: Integrasi video pendek untuk setiap profil pengrajin.
- [ ] **AI Recommendation**: Rekomendasi produk berdasarkan minat pengguna.
- [ ] **PWA (Progressive Web App)**: Akses lebih ringan di perangkat mobile dengan koneksi rendah.

---

**DifabelZone** — _Seni Melampaui Batas, Karya Menembus Keterbatasan._
