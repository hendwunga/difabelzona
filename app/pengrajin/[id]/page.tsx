"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Award, 
  ShoppingBag, 
  ArrowLeft,
  Loader2,
  Heart,
  ExternalLink,
  Quote,
  Sparkles,
  // Verify,
  Fingerprint,
  Users
} from "lucide-react";
import Link from "next/link";

export default function ProfilPengrajin() {
  const params = useParams();
  const supabase = createClient();
  
  const [artisan, setArtisan] = useState<any>(null);
  const [artisanProducts, setArtisanProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtisanData = async () => {
      try {
        setIsLoading(true);
        const { data: artisanData, error: artisanError } = await supabase
          .from('pengrajin')
          .select('*')
          .eq('id', params.id)
          .single();

        if (artisanError) throw artisanError;
        setArtisan(artisanData);

        const { data: productsData, error: productsError } = await supabase
          .from('produk')
          .select('*')
          .eq('pengrajin_id', params.id);

        if (productsError) throw productsError;
        setArtisanProducts(productsData || []);
      } catch (err) {
        console.error("Error fetching artisan:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchArtisanData();
  }, [params.id, supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4 opacity-20" />
        <p className="text-indigo-950 font-black uppercase tracking-[0.3em] text-[10px]">Menyusun Cerita Hebat...</p>
      </div>
    );
  }

  if (!artisan) return <div className="text-center py-20">Pengrajin tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />

      {/* Hero Section Profil */}
      <section className="pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Link href="/karya" className="inline-flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 hover:text-indigo-600 transition-all group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Galeri Karya
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Foto & Status (Sticky Kolom Kiri) */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-500 rounded-[3.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                <img 
                  src={artisan.image_url} 
                  alt={artisan.nama}
                  className="relative w-full aspect-square rounded-[3.5rem] object-cover border-8 border-white shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-indigo-950 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-2xl whitespace-nowrap">
                  <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-xs font-black uppercase tracking-widest">Partner Terverifikasi</span>
                </div>
              </div>

              {/* Stats Personal */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100">
                  <p className="text-2xl font-black text-indigo-950">{artisanProducts.length}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Karya Unik</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100">
                  <p className="text-2xl font-black text-indigo-950">4.9</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</p>
                </div>
              </div>
            </div>

            {/* Konten Profil (Kolom Kanan) */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {artisan.keahlian}
                    </span>
                    <span className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest gap-1">
                      <MapPin className="w-3 h-3" /> Indonesia
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-indigo-950 mb-6 leading-none tracking-tighter">
                    {artisan.nama}
                  </h1>
                </div>

                <div className="relative p-10 bg-indigo-50/50 rounded-[3rem] border border-indigo-100/50">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-indigo-200/50 -scale-x-100" />
                  <p className="relative z-10 text-xl md:text-2xl text-indigo-900/80 leading-relaxed font-serif italic pl-8">
                    {artisan.deskripsi}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-indigo-950 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-amber-500" /> Filosofi Karya
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Setiap kerajinan yang dibuat oleh {artisan.nama.split(' ')[0]} merupakan manifestasi dari ketekunan tinggi, seringkali menghabiskan waktu berminggu-minggu untuk satu detail pola yang sempurna.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-indigo-950 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" /> Dampak Sosial
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Dengan membeli karya ini, Anda secara langsung mendukung terapi kemandirian dan penyediaan alat bantu aksesibilitas bagi {artisan.nama}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Produk Pengrajin - Gaya Galeri Seni */}
      <section className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-slate-100 pb-8 gap-4">
          <div>
            <h2 className="text-4xl font-black text-indigo-950 tracking-tight">Koleksi Terbatas</h2>
            <p className="text-slate-400 font-medium mt-1">Edisi eksklusif buatan tangan oleh {artisan.nama}</p>
          </div>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full uppercase tracking-widest">
            {artisanProducts.length} Items Tersedia
          </span>
        </div>

        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {artisanProducts.map((product) => (
              <Link 
                href={`/karya/${product.id}`} 
                key={product.id} 
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 bg-slate-50">
                  <img 
                    src={product.image_url} 
                    alt={product.nama} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-6 right-6">
                    <div className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-slate-400 group-hover:text-red-500 transition-all shadow-xl">
                      <Heart className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {product.nama}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                       <Star className="w-3 h-3 fill-current text-amber-500" />
                       <span className="text-[10px] font-black text-slate-700">5.0</span>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-indigo-950 mt-1">
                    <span className="text-[10px] text-slate-400 mr-1">IDR</span>
                    {Number(product.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-6 opacity-50" />
            <h4 className="text-indigo-950 font-black text-xl mb-2">Studio Sedang Mempersiapkan Karya</h4>
            <p className="text-slate-400 font-medium max-w-xs mx-auto text-sm">Nantikan koleksi terbaru dari {artisan.nama} dalam waktu dekat.</p>
          </div>
        )}
      </section>

      {/* CTA Section - Lebih Personal */}
      <section className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        <div className="bg-indigo-950 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-6 shadow-xl">
               <Heart className="w-10 h-10 text-indigo-950 fill-current" />
            </div>
            <h3 className="text-white text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              Dukung Perjalanan <br className="hidden md:block" /> {artisan.nama.split(' ')[0]} Secara Langsung
            </h3>
            <p className="text-indigo-200/70 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
              Keuntungan dari setiap karya dialokasikan 70% untuk pengrajin dan 30% untuk pengembangan workshop disabilitas kolektif.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donasi" className="w-full sm:w-auto">
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-indigo-950 font-black px-12 h-16 rounded-2xl shadow-xl shadow-amber-500/20 text-lg transition-all hover:-translate-y-1">
                  Donasi untuk {artisan.nama.split(' ')[0]}
                </Button>
              </Link>
              <Link href="/karya" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-16 px-12 rounded-2xl font-black">
                  Lihat Karya Lainnya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}