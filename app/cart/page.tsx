"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  ChevronLeft,
  Store,
  Sparkles,
  HeartHandshake,
  PackageCheck
} from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      // Trigger event untuk update badge navbar jika ada
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cartItems, mounted]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.jumlah + delta);
        return { ...item, jumlah: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.harga * item.jumlah), 0);
  const ongkir = cartItems.length > 0 ? 15000 : 0;
  const total = subtotal + ongkir;

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-36 pb-24 relative z-10">
        
        {/* --- BREADCRUMB & HEADER --- */}
        <div className="mb-12">
          <Link href="/karya" className="inline-flex items-center text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-6 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Galeri Karya
          </Link>
          <h1 className="text-5xl md:text-6xl font-black text-indigo-950 tracking-tighter">
            Siap Untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Berdaya?</span>
          </h1>
          <p className="text-slate-400 font-medium mt-2">Pastikan pesanan Anda sudah sesuai sebelum lanjut memberi dukungan.</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* --- LIST ITEM (KIRI) --- */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="group bg-white p-4 md:p-6 rounded-[3rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-8 shadow-sm hover:shadow-xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-40 aspect-square shrink-0 overflow-hidden rounded-[2.2rem] bg-slate-50">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.nama} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                        <Store className="w-3 h-3" /> {item.pengrajin}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-indigo-950 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {item.nama}
                    </h3>
                    <p className="text-2xl font-black text-slate-900">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Controls Wrapper */}
                  <div className="flex flex-row sm:flex-col items-center gap-4">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-red-500 hover:shadow-md transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-black text-indigo-950 text-lg">{item.jumlah}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Additional Impact Info */}
              <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-indigo-950 text-lg tracking-tight">Setiap Karya Adalah Cerita</h4>
                  <p className="text-sm text-amber-900/70 font-medium">Pembelian Anda hari ini berkontribusi langsung pada biaya terapi dan alat bantu mobilitas bagi para pengrajin di DifabelZone.</p>
                </div>
              </div>
            </div>

            {/* --- RINGKASAN PEMBAYARAN (KANAN) --- */}
            <div className="lg:col-span-4">
              <div className="bg-indigo-950 p-10 rounded-[4rem] text-white shadow-2xl sticky top-36 overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  Ringkasan <PackageCheck className="w-6 h-6 text-amber-400" />
                </h2>
                
                <div className="space-y-5 mb-10 relative z-10">
                  <div className="flex justify-between text-indigo-200/60 font-black text-[10px] uppercase tracking-widest">
                    <span>Subtotal ({cartItems.length} Karya)</span>
                    <span className="text-white">Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-indigo-200/60 font-black text-[10px] uppercase tracking-widest">
                    <span>Estimasi Ongkir</span>
                    <span className="text-white">Rp {ongkir.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase text-indigo-300 tracking-[0.2em]">Total Tagihan</span>
                    <span className="text-4xl font-black text-amber-400 tracking-tighter">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-20 bg-amber-500 hover:bg-white text-indigo-950 font-black text-xl rounded-[2rem] shadow-xl shadow-amber-500/10 transition-all hover:-translate-y-1 active:scale-95 group">
                    Beli & Berdayakan
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>

                <div className="mt-10 space-y-4 border-t border-white/5 pt-8">
                  <div className="flex items-center gap-4 text-[9px] font-black text-indigo-200/40 uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" /> Transaksi Terenkripsi & Aman
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-black text-indigo-200/40 uppercase tracking-[0.2em]">
                    <Truck className="w-5 h-5 text-amber-500" /> Pengiriman Prioritas DifabelZone
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="bg-slate-50 rounded-[5rem] py-32 px-10 text-center border-2 border-dashed border-slate-200">
            <div className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-100 rotate-6">
              <ShoppingBag className="w-14 h-14 text-indigo-200" />
            </div>
            <h2 className="text-4xl font-black text-indigo-950 mb-4 tracking-tighter">Keranjangmu Sedang Rehat</h2>
            <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium text-lg leading-relaxed">
              Jelajahi koleksi unik kami dan jadilah bagian dari perjalanan kemandirian teman-teman difabel.
            </p>
            <Link href="/karya">
              <Button className="bg-indigo-600 hover:bg-indigo-950 text-white px-12 h-20 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 group">
                Mulai Telusuri Karya
                <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}