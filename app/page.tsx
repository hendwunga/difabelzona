"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Heart, ShoppingBag, Users, Star, ArrowRight, 
  CheckCircle2, Quote, ChevronUp 
} from "lucide-react";
import Link from "next/link";

// Data Pengrajin (tetap sama)
const pengrajin = [
  {
    id: 1,
    nama: "Andi Saputra",
    peran: "Tuna Daksa",
    keahlian: "Anyaman Bambu Modern",
    deskripsi: "Mengubah keterbatasan gerak menjadi keajaiban anyaman yang telah menembus pasar Eropa.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=500",
  },
  {
    id: 2,
    nama: "Siti Aminah",
    peran: "Tuna Rungu",
    keahlian: "Lukisan Kanvas Abstrak",
    deskripsi: "Bicara melalui warna. Siti menggunakan melodi visual untuk mengekspresikan dunianya.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500",
  },
  {
    id: 3,
    nama: "Budi Setiawan",
    peran: "Tuna Netra",
    keahlian: "Kerajinan Keramik",
    deskripsi: "Melihat dengan hati, membentuk dengan sentuhan. Keramik Budi adalah definisi presisi.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=500",
  },
  {
    id: 4,
    nama: "Rizky Fauzi",
    peran: "Tuna Wicara",
    keahlian: "Ukiran Kayu Jati",
    deskripsi: "Detail ukiran yang menceritakan filosofi hidup dalam setiap goresan kayunya.",
    image: "https://images.unsplash.com/photo-1621506284811-53b48fdf4671?q=80&w=500",
  },
  {
    id: 5,
    nama: "Maya Sari",
    peran: "Daksa Bawah",
    keahlian: "Fashion Batik Ecoprint",
    deskripsi: "Menyatukan alam dan kain melalui teknik ecoprint yang ramah lingkungan.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500",
  },
  {
    id: 6,
    nama: "Hendra Wijaya",
    peran: "Tuna Rungu",
    keahlian: "Kerajinan Kulit Sapi",
    deskripsi: "Dompet dan tas kulit handmade dengan ketahanan luar biasa dan desain timeless.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=500",
  },
];

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const displayedPengrajin = showAll ? pengrajin : pengrajin.slice(0, 3);

  return (
    <main className="bg-white min-h-screen selection:bg-amber-200">
      <Navbar />

      {/* --- NEW HERO SECTION: LIGHT & BRIGHT --- */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[#FDFDFF]">
        {/* Soft Background Mesh - Memberikan tekstur modern tanpa terlihat penuh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-50 rounded-full blur-[120px] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full text-indigo-700">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span className="text-xs font-bold tracking-widest uppercase">Platform Inklusif No. 1 di Indonesia</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-[1.1] tracking-tight">
                Rayakan Bakat, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                  Lampaui Batas.
                </span>
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                DifabelZone menghubungkan Anda dengan karya kurasi terbaik dari pengrajin disabilitas di seluruh pelosok negeri.
              </p>

             <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
  {/* Tombol Mulai Belanja ke /karya */}
  <Link href="/karya">
    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white h-16 px-10 text-lg font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1">
      Mulai Belanja <ShoppingBag className="ml-2 w-5 h-5" />
    </Button>
  </Link>

  {/* Tombol Pelajari Visi ke /donasi */}
  <Link href="/donasi">
    <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 h-16 px-10 text-lg font-bold rounded-2xl bg-white shadow-sm">
      Pelajari Visi Kami
    </Button>
  </Link>
</div>
            </div>

            <div className="relative">
              {/* Gambar dengan Border yang Soft */}
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=1200" 
                  alt="Crafting" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-indigo-950 leading-tight">500+</p>
                    <p className="text-xs text-slate-500 font-medium">Pengrajin Mandiri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Tetap Putih agar Clean) --- */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Produk Terjual", val: "1.2k+" },
            { label: "Karya Unik", val: "850+" },
            { label: "Donasi Terkumpul", val: "Rp 50M+" },
            { label: "Kota Jangkauan", val: "24+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-indigo-950">{stat.val}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PENGRAJIN SPOTLIGHT (Warna BG diganti ke Indigo sangat Muda) --- */}
      <section id="pengrajin-section" className="py-24 bg-[#F8FAFF] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-sm mb-4">Wajah di Balik Karya</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Tangan Tangguh, <br /> Jiwa yang Melampaui Batas
              </h3>
            </div>
            
            <Button 
              onClick={() => setShowAll(!showAll)}
              variant="ghost" 
              className="hidden md:flex text-indigo-600 font-bold text-lg group p-0 hover:bg-transparent"
            >
              {showAll ? "Sembunyikan" : "Lihat Semua Pengrajin"} 
              <ArrowRight className={`ml-2 w-5 h-5 transition-transform ${showAll ? '-rotate-90' : 'group-hover:translate-x-2'}`} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedPengrajin.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="relative h-[450px] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 to-transparent opacity-80" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="bg-amber-500 text-indigo-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {item.peran}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-amber-400 font-bold text-sm mb-2 uppercase tracking-widest">{item.keahlian}</p>
                    <h4 className="text-3xl font-black mb-3">{item.nama}</h4>
                    <p className="text-indigo-50/80 text-sm leading-relaxed line-clamp-3">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Button 
              onClick={() => setShowAll(!showAll)}
              className="bg-indigo-600 text-white px-8 h-14 rounded-2xl w-full font-bold"
            >
              {showAll ? "Sembunyikan" : `Lihat Semua (${pengrajin.length})`}
            </Button>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL & FOOTER (Tetap dipertahankan untuk kontras) --- */}
      <section className="py-24 bg-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Quote className="w-12 h-12 text-indigo-100 mx-auto mb-8" />
          <h2 className="text-2xl md:text-4xl font-semibold text-indigo-950 leading-relaxed italic">
            Produk DifabelZone membuktikan bahwa keterbatasan hanyalah persepsi. Karya mereka memiliki jiwa yang tidak ditemukan di produk pabrikan.
          </h2>
          <div className="mt-10">
            <p className="font-black text-indigo-950 text-xl tracking-tight">Andini Putri</p>
            <p className="text-indigo-500 font-medium">Kolektor Seni & Pembeli Setia</p>
          </div>
        </div>
      </section>
    </main>
  );
}