"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { 
  Heart, 
  ShoppingBag, 
  Users, 
  Star, 
  ArrowRight, 
  Quote, 
  Loader2,
  Handshake,
  Sprout,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

interface Pengrajin {
  id: string;
  nama: string;
  image_url: string;
  peran: string;
  keahlian: string;
  deskripsi: string;
  created_at?: string;
}

export default function Home() {
  const supabase = createClient();
  const [pengrajinData, setPengrajinData] = useState<Pengrajin[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPengrajin = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('pengrajin')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setPengrajinData(data);
      } catch (error) {
        console.error("Error fetching pengrajin:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPengrajin();
  }, []);

  const displayedPengrajin = showAll ? pengrajinData : pengrajinData.slice(0, 3);

  return (
    <main className="bg-white min-h-screen selection:bg-amber-200">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-[#FDFDFF]">
        {/* Dekorasi Tekstur - Memberikan kesan "Craft" */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-50 rounded-full blur-[120px] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-100 px-4 py-2 rounded-full text-amber-700">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black tracking-widest uppercase">Pemberdayaan Disabilitas Kreatif</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-[1.1] tracking-tight">
                Karya Tanpa <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-indigo-700">
                  Batas Suara.
                </span>
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Di <strong>DifabelZone</strong>, kami percaya bahwa disabilitas bukan penghalang kreativitas. Kami membawa karya seni pengrajin tangguh langsung ke genggaman Anda.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                <Link href="/karya">
                  <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white h-16 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1">
                    Beli Karya Mereka <ShoppingBag className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/donasi">
                  <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-indigo-950 hover:bg-slate-50 h-16 px-10 text-lg font-bold rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm">
                    Donasi Inklusi
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 group-hover:rotate-0 rotate-3">
                <img 
                  src="/hero.png" 
                  alt="Crafting" 
                  className="w-full h-[550px] object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 z-20 bg-amber-400 p-8 rounded-full shadow-2xl animate-pulse hidden md:block">
                <div className="text-center">
                  <p className="text-indigo-950 font-black text-xs uppercase">Impact</p>
                  <p className="text-indigo-950 font-black text-2xl leading-none">100%</p>
                  <p className="text-indigo-950 font-medium text-[8px]">Handmade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Handshake, title: "Kemitraan Adil", desc: "Kami memastikan pengrajin menerima harga yang adil untuk setiap tetes keringat mereka." },
              { icon: Sprout, title: "Ramah Lingkungan", desc: "Sebagian besar produk kami menggunakan bahan alam dan teknik ecoprint." },
              { icon: ShieldCheck, title: "Kualitas Terkurasi", desc: "Setiap karya melewati tahap kontrol kualitas yang ketat sebelum dikirim." },
            ].map((value, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                  <value.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-indigo-950 text-lg mb-2">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PENGRAJIN SPOTLIGHT --- */}
      <section className="py-24 bg-[#F8FAFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs mb-4">The Heroes</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Sosok di Balik Layar
            </h3>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Kenali lebih dekat teman-teman disabilitas yang mengubah keterbatasan menjadi karya seni bernilai tinggi.</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
              <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Menghubungkan Talenta...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">
              {displayedPengrajin.map((item) => (
                <Link href={`/pengrajin/${item.id}`} key={item.id} className="group cursor-pointer">
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 h-[480px]">
                    <img 
                      src={item.image_url} 
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/30 to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-indigo-950 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {item.peran}
                      </span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-8 bg-amber-400" />
                        <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">{item.keahlian}</p>
                      </div>
                      <h4 className="text-3xl font-black mb-2">{item.nama}</h4>
                      <p className="text-indigo-50/70 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
             <Button 
                onClick={() => setShowAll(!showAll)}
                className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-10 h-14 rounded-2xl font-black shadow-lg transition-all"
              >
                {showAll ? "Lihat Lebih Sedikit" : "Jelajahi Semua Sosok Hebat"}
             </Button>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Quote className="w-16 h-16 text-amber-400/20 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
            "Seni tidak butuh mata yang sempurna untuk melihat, atau kaki yang kuat untuk berdiri. Ia hanya butuh hati yang bebas."
          </h2>
          <Link href="/donasi">
            <Button className="bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black px-12 h-16 rounded-2xl text-xl shadow-2xl shadow-amber-500/20">
              Dukung Perjuangan Kami
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}