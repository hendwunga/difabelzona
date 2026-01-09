"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Heart, 
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Efek Selebrasi Confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-40 pb-20 flex flex-col items-center text-center">
        {/* Ikon Sukses Animatif */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-emerald-500 text-white p-6 rounded-full shadow-2xl shadow-emerald-200">
            <CheckCircle2 className="w-16 h-16" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tight">
          Pesanan Terkirim!
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mb-12 font-medium">
          Terima kasih telah menjadi bagian dari perubahan. Pesanan Anda telah kami teruskan ke admin dan pengrajin via WhatsApp.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Instruksi Selanjutnya */}
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-left">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mb-4">1</div>
            <h3 className="font-black text-indigo-950 mb-2 uppercase text-xs tracking-widest">Langkah Selanjutnya</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Selesaikan pembayaran sesuai instruksi admin di WhatsApp. Jangan lupa kirimkan bukti transfernya ya!
            </p>
          </div>

          <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 text-left">
            <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mb-4">2</div>
            <h3 className="font-black text-amber-950 mb-2 uppercase text-xs tracking-widest">Dukungan Moral</h3>
            <p className="text-sm text-amber-700/70 leading-relaxed">
              Pesan semangatmu akan dicetak dan diberikan kepada pengrajin bersamaan dengan proses pembuatan karyamu.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
            className="h-16 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-100 gap-3 transition-all active:scale-95"
          >
            <MessageCircle className="w-6 h-6" /> Chat Admin Lagi
          </Button>
          
          <Link href="/karya" className="w-full">
            <Button 
              variant="outline"
              className="w-full h-16 rounded-2xl border-2 border-slate-100 text-slate-600 font-black text-lg hover:bg-slate-50 gap-3 transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" /> Belanja Lagi
            </Button>
          </Link>
        </div>

        {/* Share Section */}
        <div className="mt-20 pt-10 border-t border-slate-100 w-full flex flex-col items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Heart className="w-3 h-3 text-red-500 fill-current" /> Bagikan Kebahagiaan Ini
          </p>
          <div className="flex gap-4">
             {['Facebook', 'Twitter', 'Instagram'].map((social) => (
               <button key={social} className="px-6 py-2 rounded-full border border-slate-100 text-xs font-bold text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                 {social}
               </button>
             ))}
          </div>
        </div>
      </div>
    </main>
  );
}