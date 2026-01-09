"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/lib/auth-guard";
import { 
  Heart, 
  Users, 
  Zap, 
  ShieldCheck,
  X,
  Loader2,
  AlertCircle,
  Coins,
  HandHeart,
  Target,
  Trophy,
  ArrowRight
} from "lucide-react";

const DONATION_PLANS = [
  {
    id: 1,
    title: "Program Pelatihan Membatik",
    description: "Membantu biaya instruktur ahli untuk melatih 10 teman disabilitas baru agar memiliki skill membatik profesional.",
    target: 15000000,
    collected: 8500000,
    donors: 42,
    image: "/Pelatihan.png",
    impact: "10 Orang mandiri"
  },
  {
    id: 2,
    title: "Alat Bantu Kerja Ergonomis",
    description: "Pengadaan kursi roda elektrik dan meja kerja khusus untuk pengrajin dengan keterbatasan fisik berat.",
    target: 25000000,
    collected: 12000000,
    donors: 89,
    image: "/kursiroda.png",
    impact: "Produktivitas naik 2x lipat"
  }
];

const QUICK_AMOUNTS = [25000, 50000, 100000, 250000];

export default function DonasiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Donasi Umum");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { protectAction } = useAuthGuard();

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) setUser(JSON.parse(session));

    const pendingAmount = localStorage.getItem("pending_donation_amount");
    const pendingProgram = localStorage.getItem("pending_donation_program");

    if (session && pendingAmount) {
      setAmount(pendingAmount);
      setSelectedProgram(pendingProgram || "Donasi Umum");
      setIsModalOpen(true);
      localStorage.removeItem("pending_donation_amount");
      localStorage.removeItem("pending_donation_program");
    }

    const midtransScriptUrl = "https://app.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (clientKey) {
      const scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      scriptTag.setAttribute("data-client-key", clientKey);
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
      return () => {
        const existingScript = document.querySelector(`script[src="${midtransScriptUrl}"]`);
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, []);

  const handleAmountChange = (val: string) => {
    if (val === "" || (Number(val) >= 0 && !val.includes("-"))) {
      setAmount(val);
    }
  };

  const openDonationModal = (programTitle: string) => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      localStorage.setItem("pending_donation_amount", amount);
      localStorage.setItem("pending_donation_program", programTitle);
      protectAction(() => setIsModalOpen(true));
      return;
    }
    setSelectedProgram(programTitle);
    setIsModalOpen(true);
  };

  const handleSendDonation = async () => {
    if (!amount || Number(amount) < 10000) {
      alert("Minimal donasi adalah Rp 10.000");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api/donasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          fullName: user?.fullName || "Hamba Allah",
          email: user?.email || "anonim@mail.com",
          program: selectedProgram
        })
      });

      const data = await response.json();
      if (data.token) {
        (window as any).snap.pay(data.token, {
          onSuccess: () => {
            alert("Terima kasih! Kebaikan Anda sangat berarti bagi mereka.");
            setIsModalOpen(false);
            setAmount("");
          },
          onPending: () => alert("Harap selesaikan pembayaran."),
          onError: () => alert("Terjadi kesalahan pembayaran."),
          onClose: () => alert("Jendela pembayaran ditutup.")
        });
      }
    } catch (err) {
      alert("Gagal menghubungi sistem pembayaran.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-24 bg-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <HandHeart className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-100">Jembatan Kebaikan Inklusif</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Ubah Donasi Menjadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic font-serif">Kemandirian Nyata.</span>
          </h1>

          <p className="text-indigo-100/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Setiap rupiah yang Anda berikan bukan sekadar bantuan, tapi investasi untuk alat kerja dan pelatihan para pengrajin disabilitas tangguh.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-3">
              <div className="flex-grow relative">
                <span className="absolute left-7 top-1/2 -translate-y-1/2 text-amber-400 font-black text-xl">Rp</span>
                <input 
                  type="number" 
                  min="0"
                  placeholder="Masukkan nominal donasi..." 
                  className="w-full h-16 pl-16 rounded-[1.8rem] bg-indigo-900/50 text-white font-black focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xl placeholder:text-indigo-300/50"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => openDonationModal("Donasi Umum")}
                className="bg-amber-500 hover:bg-amber-400 h-16 px-12 rounded-[1.8rem] font-black text-indigo-950 shadow-lg transition-all active:scale-95 group"
              >
                Kirim Kebaikan <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-indigo-950 transition-all text-xs font-black tracking-widest uppercase"
                >
                  Rp {amt.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT STATS --- */}
      <section className="max-w-6xl mx-auto px-4 -translate-y-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, label: "Pengrajin Berdaya", value: "150+", color: "bg-blue-500" },
            { icon: Target, label: "Program Aktif", value: "12", color: "bg-amber-500" },
            { icon: ShieldCheck, label: "Tersalurkan", value: "98%", color: "bg-emerald-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className={`w-16 h-16 ${stat.color} rounded-3xl flex items-center justify-center mb-6 text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-4xl font-black text-indigo-950 mb-2">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CAMPAIGNS --- */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs mb-4">Target Perubahan</h2>
            <h3 className="text-4xl md:text-5xl font-black text-indigo-950 leading-tight">
              Pilih Fokus <br /> Dukungan Anda
            </h3>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm md:text-right italic">
            "Satu dukungan kecil Anda adalah langkah besar bagi mobilitas dan karya mereka."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {DONATION_PLANS.map((plan) => (
            <div key={plan.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl flex flex-col group hover:shadow-2xl transition-all duration-500">
              <div className="h-[300px] relative overflow-hidden">
                <img src={plan.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={plan.title} />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-indigo-950 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-amber-500" /> Dampak: {plan.impact}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-indigo-950 mb-4 leading-tight">{plan.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                  {plan.description}
                </p>
                
                <div className="mt-auto space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em]">
                      <span className="text-indigo-600">Terkumpul: Rp {plan.collected.toLocaleString("id-ID")}</span>
                      <span className="text-slate-400">Target: Rp {plan.target.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-50 p-1">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${(plan.collected / plan.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => openDonationModal(plan.title)}
                    className="w-full bg-indigo-600 hover:bg-indigo-950 text-white font-black rounded-[1.5rem] h-14 shadow-xl transition-all active:scale-95"
                  >
                    Salurkan Dukungan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL DONASI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 border-t-[10px] border-amber-500">
            <div className="bg-white p-8 pb-4 text-indigo-950 relative border-b border-slate-50">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
                <X className="w-7 h-7" />
              </button>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <h2 className="text-3xl font-black">Konfirmasi Donasi</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
                Program: <span className="text-indigo-600">{selectedProgram}</span>
              </p>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block text-center">Nominal Yang Diberikan</label>
                <div className="relative">
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-amber-500 text-xl">Rp</span>
                   <input 
                    type="number" 
                    min="0"
                    className="w-full h-20 pl-16 pr-6 rounded-[2rem] border-2 border-slate-100 focus:border-indigo-600 focus:outline-none font-black text-3xl text-indigo-950 text-center shadow-inner transition-colors"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
                  {QUICK_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    >
                      + {amt.toLocaleString("id-ID")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atas Nama</span>
                  <span className="text-sm font-bold text-indigo-950">{user?.fullName || "Hamba Allah"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                  <span className="text-sm font-bold text-indigo-950">{user?.email || "anonim@mail.com"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                  Metode pembayaran (QRIS, VA, Kartu) akan Anda pilih di jendela pembayaran Midtrans sesaat setelah klik tombol di bawah.
                </p>
              </div>

              <Button 
                onClick={handleSendDonation}
                disabled={isProcessing || !amount || Number(amount) < 10000}
                className="w-full h-16 rounded-[2rem] bg-indigo-600 hover:bg-indigo-950 text-white font-black text-xl shadow-2xl shadow-indigo-100 gap-3"
              >
                {isProcessing ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                  <>
                    <Coins className="w-6 h-6" />
                    Konfirmasi Pembayaran
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[9px] text-slate-300 font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Partner Resmi Midtrans Indonesia
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}