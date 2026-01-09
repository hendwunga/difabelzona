"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Lock,
  Heart,
  ArrowLeft,
  Loader2,
  MessageCircle,
  Sparkles,
  Info
} from "lucide-react";
import Link from "next/link";

interface CartItem {
  id: string | number;
  nama: string;
  harga: number | string;
  image: string;
  pengrajin: string;
  jumlah: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    wa: "",
    alamat: "",
    pesan: ""
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (mounted && savedCart.length === 0) {
      router.push("/karya"); 
    }
    setCartItems(savedCart);
    setMounted(true);
  }, [router, mounted]);

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.harga) * item.jumlah), 0);
  const ongkir = 25000;
  const biayaLayanan = 2000;
  const total = subtotal + ongkir + biayaLayanan;

  const handlePayment = () => {
    if (!form.nama || !form.alamat || !form.wa) {
      alert("Mohon lengkapi Nama, Alamat, dan No. WhatsApp Anda.");
      return;
    }

    setIsProcessing(true);

    const itemLengkap = cartItems.map((item, index) => 
      `${index + 1}. *${item.nama}* (${item.jumlah}x) - Rp${(Number(item.harga) * item.jumlah).toLocaleString("id-ID")}`
    ).join('\n');

    const nomorWA = "6285217331968"; 
    
    const textPesan = 
`Halo Admin DifabelZone! 👋
Saya ingin memesan karya dari pengrajin hebat.

*DETAIL PESANAN:*
${itemLengkap}

*RINGKASAN:*
- Subtotal: Rp${subtotal.toLocaleString("id-ID")}
- Ongkir: Rp${ongkir.toLocaleString("id-ID")}
- Donasi Layanan: Rp${biayaLayanan.toLocaleString("id-ID")}
--------------------------
*TOTAL TAGIHAN: Rp${total.toLocaleString("id-ID")}*

*DATA PENGIRIMAN:*
- Nama: ${form.nama}
- No. WA: ${form.wa}
- Alamat: ${form.alamat}

*PESAN SEMANGAT UNTUK PENGRAJIN:*
"${form.pesan || "Terus semangat berkarya!"}"

Mohon instruksi selanjutnya untuk pembayaran via Rekening/QRIS. Terima kasih! ✨`;

    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(textPesan)}`;

    setTimeout(() => {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      window.open(linkWA, "_blank");
      router.push("/success"); 
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Handmade Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-36 pb-24 relative z-10">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Keranjang
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
          
          {/* --- KOLOM KIRI (DATA) --- */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-5xl font-black text-indigo-950 mb-2 tracking-tighter">Satu Langkah Lagi.</h1>
              <p className="text-slate-500 font-medium">Lengkapi detail pengiriman untuk membawa pulang karya spesial ini.</p>
            </div>

            {/* Bagian 1: Alamat - PERBAIKAN WARNA TEKS */}
<section className="bg-slate-50/50 rounded-[3rem] p-10 border border-slate-100 relative overflow-hidden">
  <div className="flex items-center gap-4 mb-8">
    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
      <MapPin className="w-6 h-6" />
    </div>
    <h2 className="text-2xl font-black text-indigo-950 tracking-tight">Tujuan Pengiriman</h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Input Nama */}
    <div className="space-y-2">
      <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Nama Lengkap</label>
      <Input 
        placeholder="Contoh: Budi Utomo" 
        className="rounded-2xl border-slate-200 h-16 font-bold bg-white text-indigo-950 focus:ring-indigo-500 placeholder:text-slate-300" 
        value={form.nama}
        onChange={(e) => setForm({...form, nama: e.target.value})}
      />
    </div>

    {/* Input WA */}
    <div className="space-y-2">
      <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">No. WhatsApp</label>
      <Input 
        placeholder="0812xxxx" 
        className="rounded-2xl border-slate-200 h-16 font-bold bg-white text-indigo-950 focus:ring-indigo-500 placeholder:text-slate-300" 
        value={form.wa}
        onChange={(e) => setForm({...form, wa: e.target.value})}
      />
    </div>

    {/* Textarea Alamat */}
    <div className="md:col-span-2 space-y-2">
      <label className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest ml-1">Alamat Lengkap</label>
      <textarea 
        placeholder="Tulis alamat rumah, blok, atau patokan lokasi..." 
        className="w-full rounded-[2rem] border border-slate-200 p-6 h-40 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold bg-white text-indigo-950 text-sm placeholder:text-slate-300"
        value={form.alamat}
        onChange={(e) => setForm({...form, alamat: e.target.value})}
      />
    </div>
  </div>
</section>

            {/* Bagian 2: Pesan Semangat (DifabelZone Signature) */}
            <section className="bg-indigo-950 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-amber-500/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="bg-amber-500 p-3 rounded-2xl text-indigo-950">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Beri Dukungan Moral</h2>
                  <p className="text-xs text-indigo-300 font-medium">Opsional: Pesanmu akan kami cetak dan lampirkan di paket.</p>
                </div>
              </div>
              
              <textarea 
                placeholder="Tulis pesan penyemangat untuk pengrajin..." 
                className="w-full rounded-[2rem] border border-white/10 p-6 h-32 focus:ring-2 focus:ring-amber-500 focus:outline-none font-bold bg-white/5 text-white text-sm placeholder:text-white/20 relative z-10"
                value={form.pesan}
                onChange={(e) => setForm({...form, pesan: e.target.value})}
              />
            </section>
          </div>

          {/* --- KOLOM KANAN (RINGKASAN) --- */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-2xl sticky top-36 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-amber-500" /> Ringkasan
                 </h2>
                 <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {cartItems.length} Karya
                 </span>
              </div>

              <div className="space-y-6 mb-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-5 items-center group">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <Image src={item.image} fill className="object-cover group-hover:scale-110 transition-transform" alt={item.nama} />
                    </div>
                    <div className="grow">
                      <p className="text-sm font-black text-indigo-950 line-clamp-1 leading-tight mb-1">{item.nama}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{item.pengrajin}</p>
                      <p className="text-xs text-indigo-600 font-black">{item.jumlah}x Rp {Number(item.harga).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Subtotal Karya</span>
                  <span className="text-indigo-950">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Biaya Pengiriman</span>
                  <span className="text-indigo-950">Rp {ongkir.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <span>Donasi Layanan</span>
                  <span>Rp {biayaLayanan.toLocaleString("id-ID")}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-xs font-black uppercase text-indigo-400 tracking-[0.2em]">Total Tagihan</span>
                  <span className="text-4xl font-black text-indigo-950 tracking-tighter">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Info Pembayaran Via WA */}
              <div className="bg-amber-50 border border-amber-100 p-5 rounded-[2rem] mb-8 flex gap-4 items-start">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                <p className="text-[11px] font-bold text-amber-900 leading-relaxed italic">
                  Pembayaran akan dipandu langsung oleh Admin kami melalui WhatsApp. Anda bisa membayar menggunakan <b>Bank Transfer, QRIS, atau E-Wallet.</b>
                </p>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-20 rounded-[2rem] bg-indigo-600 hover:bg-indigo-950 text-white font-black text-xl shadow-2xl shadow-indigo-200 group transition-all active:scale-95"
              >
                {isProcessing ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <>
                    KONFIRMASI VIA WA
                    <MessageCircle className="ml-3 w-6 h-6 group-hover:scale-125 transition-transform" />
                  </>
                )}
              </Button>

              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> 100% Aman
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <Lock className="w-4 h-4" /> Terenkripsi
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}