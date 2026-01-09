"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ArrowLeft,
  Quote
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "", server: "" };
    let isValid = true;
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ ...errors, server: "Email atau password salah. Silakan coba lagi." });
        setIsLoading(false);
      } else if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata.full_name || "User", 
        };
        localStorage.setItem("user_session", JSON.stringify(userData));
        window.dispatchEvent(new Event("authUpdated"));
        const redirectTo = localStorage.getItem("redirect_after_login");
        if (redirectTo) {
          localStorage.removeItem("redirect_after_login");
          router.push(redirectTo);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setErrors({ ...errors, server: "Terjadi kesalahan sistem. Coba lagi nanti." });
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />

      {/* SISI KIRI: Form Login */}
      <div className="flex items-center justify-center p-8 md:p-16 relative z-10 border-r border-slate-50">
        <div className="w-full max-w-md space-y-10">
          
          <div className="flex flex-col gap-8">
            <Link href="/" className="group flex items-center space-x-3 w-fit">
              <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-100">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kembali ke Beranda</span>
            </Link>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Selamat Datang Kembali</span>
              </div>
              <h1 className="text-5xl font-black text-indigo-950 tracking-tighter leading-tight">
                Masuk ke <br />
                <span className="italic text-indigo-600">Difabel<span className="text-amber-500">Zone</span></span>
              </h1>
              <p className="text-slate-400 font-medium text-lg">Lanjutkan dukunganmu untuk karya inklusif.</p>
            </div>
          </div>

          {errors.server && (
            <div className="p-5 bg-red-50 border border-red-100 text-red-600 rounded-[2rem] flex items-center gap-4 text-xs font-black animate-in fade-in zoom-in duration-300">
              <div className="bg-red-500 p-2 rounded-xl text-white">
                <AlertCircle className="w-4 h-4" />
              </div>
              <p className="uppercase tracking-wide leading-relaxed">{errors.server}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-900/40 ml-1">Alamat Email</label>
              <div className="relative group">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.email ? "text-red-500" : "text-slate-300 group-focus-within:text-indigo-600"}`} />
                <Input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if(errors.email) setErrors({...errors, email: ""});
                  }}
                  placeholder="nama@email.com" 
                  className={`pl-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold border-2 placeholder:text-slate-300 focus:bg-white focus:ring-0 focus:border-indigo-600 transition-all ${errors.email ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`} 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-900/40">Kata Sandi</label>
                <Link href="#" className="text-[10px] font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Lupa Password?</Link>
              </div>
              <div className="relative group">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.password ? "text-red-500" : "text-slate-300 group-focus-within:text-indigo-600"}`} />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    if(errors.password) setErrors({...errors, password: ""});
                  }}
                  placeholder="••••••••" 
                  className={`pl-14 pr-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold border-2 placeholder:text-slate-300 focus:bg-white focus:ring-0 focus:border-indigo-600 transition-all ${errors.password ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors z-30"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-20 rounded-[2rem] bg-indigo-600 hover:bg-indigo-950 text-white font-black text-xl shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>MEMVERIFIKASI...</span>
                </>
              ) : (
                <>
                  MASUK SEKARANG
                  <div className="bg-white/20 p-1.5 rounded-xl group-hover:translate-x-1 transition-transform">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                </>
              )}
            </Button>
          </form>

          <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
            <p className="text-sm font-bold text-slate-400">
              Baru di DifabelZone? <Link href="/register" className="text-indigo-600 font-black hover:text-amber-600 transition-colors">Buat Akun Kebaikan</Link>
            </p>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Branding & Artisanal Showcase */}
      <div className="hidden lg:flex relative bg-indigo-950 items-center justify-center overflow-hidden">
        {/* Dekorasi Cahaya */}
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 p-20 w-full max-w-2xl text-center">
          <div className="relative mb-12">
             <div className="absolute inset-0 bg-amber-500 rounded-[4rem] rotate-6 scale-95 opacity-20 animate-pulse" />
             <img 
               src="./login.png" 
               className="w-full h-[450px] object-cover rounded-[4rem] shadow-2xl relative z-10 -rotate-2 hover:rotate-0 transition-transform duration-700" 
               alt="Handmade Craft" 
             />
             <div className="absolute -bottom-10 -right-6 bg-white p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-start gap-1 z-20 border border-slate-100">
                <div className="flex gap-1 text-amber-500 mb-1">
                   {[1,2,3,4,5].map(i => <Heart key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em]">Rating Produk</span>
                <span className="text-2xl font-black text-indigo-600">4.9/5.0</span>
             </div>
          </div>

          <div className="space-y-6">
            <Quote className="w-12 h-12 text-amber-500/30 mx-auto" />
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              "Bukan sekadar produk, tapi harapan yang dirajut."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <p className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs">DifabelZone Community</p>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}