"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  ChevronRight,
  ShoppingBasket,
  LayoutGrid,
  Sparkles,
  HandHeart,
  Fingerprint
} from "lucide-react";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setItems(savedWishlist);
  }, []);

  const removeItem = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const clearAll = () => {
    if (confirm("Hapus semua karya dari daftar favorit Anda?")) {
      setItems([]);
      localStorage.removeItem("wishlist");
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Texture Overlay untuk kesan Handmade */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-36 pb-24 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-100 pb-10">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:opacity-70 transition-opacity">Beranda</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-indigo-950">Kurasi Favorit</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-black text-indigo-950 tracking-tighter leading-none mb-4">
              Karya Yang <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">Anda Kagumi.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Daftar ini adalah bentuk apresiasi Anda terhadap ketekunan para pengrajin disabilitas kami.
            </p>
          </div>

          {items.length > 0 && (
            <button 
              onClick={clearAll}
              className="group text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-all"
            >
              <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Bersihkan Semua
            </button>
          )}
        </div>

        {/* --- CONTENT SECTION --- */}
        {items.length > 0 ? (
          <div className="grid gap-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white p-2 md:p-3 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8"
              >
                {/* Image Wrap */}
                <div className="w-full md:w-64 aspect-[4/3] md:aspect-square shrink-0 overflow-hidden rounded-[3rem] relative">
                  <img 
                    src={item.image} 
                    alt={item.nama} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-indigo-950/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Info Center */}
                <div className="flex-grow px-4 md:px-0 text-center md:text-left py-4">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Fingerprint className="w-3 h-3" /> Handmade
                    </span>
                    <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Edisi Spesial
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-indigo-950 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {item.nama}
                  </h3>
                  
                  <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-2 text-sm uppercase tracking-widest mb-6">
                    Karya <span className="text-indigo-600 border-b-2 border-indigo-100 pb-0.5">
                      {item.pengrajin && typeof item.pengrajin === 'object' 
                        ? item.pengrajin.nama 
                        : item.pengrajin || "Pengrajin Hebat"}
                    </span>
                  </p>

                  <p className="text-3xl font-black text-indigo-950">
                    <span className="text-xs text-slate-300 mr-2 font-black uppercase">Harga</span>
                    Rp {item.harga.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Actions Panel */}
                <div className="flex flex-col gap-3 w-full md:w-auto md:pr-8 pb-8 md:pb-0 px-6">
                  <Link href={`/karya/${item.id}`} className="w-full">
                    <Button className="w-full bg-indigo-950 hover:bg-indigo-800 text-white font-black h-16 px-10 rounded-[2rem] shadow-xl transition-all hover:-translate-y-1 active:scale-95">
                      <ShoppingBag className="w-5 h-5 mr-3" />
                      Detail Karya
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="h-16 px-10 rounded-[2rem] text-slate-400 hover:text-red-500 hover:bg-red-50 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                  >
                    Hapus Favorit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE DENGAN FILOSOFI --- */
          <div className="bg-slate-50 rounded-[5rem] py-24 md:py-32 px-8 text-center border-2 border-dashed border-slate-200">
            <div className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-100 rotate-6">
              <HandHeart className="w-16 h-16 text-indigo-200" />
            </div>
            <h2 className="text-4xl font-black text-indigo-950 mb-4 tracking-tighter">Belum Ada Karya Pilihan</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-12 text-lg font-medium leading-relaxed">
              Jelajahi setiap karya unik dan dukung semangat inklusivitas pengrajin kami.
            </p>
            <Link href="/karya">
              <Button className="bg-indigo-600 hover:bg-indigo-950 text-white px-12 h-20 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-2 group">
                <LayoutGrid className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform" />
                Buka Galeri Karya
              </Button>
            </Link>
          </div>
        )}

        {/* --- WISHLIST IMPACT BOX --- */}
        {items.length > 0 && (
          <div className="mt-24 bg-indigo-950 rounded-[4rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Dampak Nyata</span>
                </div>
                <h4 className="text-white font-black text-3xl md:text-4xl mb-4 tracking-tight">Wujudkan Satu Langkah Kemandirian</h4>
                <p className="text-indigo-200/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed italic">
                  "Menyimpan karya di favorit adalah langkah awal apresiasi. Membelinya adalah langkah nyata mengubah hidup seorang pengrajin."
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/karya">
                    <Button className="bg-white hover:bg-amber-400 text-indigo-950 font-black rounded-2xl h-14 px-10 transition-all">
                      Tambah Karya Lain
                    </Button>
                  </Link>
                </div>
             </div>
          </div>
        )}
      </div>
    </main>
  );
}