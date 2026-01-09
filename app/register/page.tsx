"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  AtSign,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.username.trim()) newErrors.username = "Username wajib diisi";
    else if (formData.username.length < 4) newErrors.username = "Username minimal 4 karakter";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email tidak valid";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    else if (formData.password.length < 8) newErrors.password = "Password minimal 8 karakter";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { 
            full_name: formData.fullName,
            username: formData.username
          },
        },
      });
      if (error) setErrors({ server: error.message });
      else {
        alert("Pendaftaran Berhasil! Silakan cek email Anda untuk verifikasi akun.");
        router.push("/login");
      }
    } catch (err) {
      setErrors({ server: "Terjadi kesalahan koneksi. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      {/* Background Texture - Ciri khas DifabelZone */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      {/* Dekorasi Cahaya */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100 rounded-full blur-[120px] opacity-50" />

      <div className="w-full max-w-6xl bg-white rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row relative z-10 border border-slate-100">
        
        {/* INFO SECTION: The Heart of DifabelZone */}
        <div className="lg:w-1/2 bg-indigo-950 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Accent Shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center space-x-3 mb-16 group">
              <div className="bg-amber-500 p-3 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/20">
                <Heart className="w-7 h-7 text-indigo-950 fill-current" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">
                Difabel<span className="text-amber-500">Zone</span>
              </span>
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-100">Bergabung Menjadi Pejuang Inklusi</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
                Karya Kecil, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Dampak Besar.</span>
              </h1>
              <p className="text-indigo-100/70 text-lg font-medium max-w-md leading-relaxed">
                Buat akunmu dan jadilah bagian dari perubahan untuk mendukung kemandirian ekonomi pengrajin difabel di seluruh Indonesia.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6">
              {[
                { t: "Kemandirian Ekonomi", d: "Membantu difabel hidup berdaya" },
                { t: "Karya Terkurasi", d: "Akses ke produk handmade premium" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-3xl border border-white/5">
                  <div className="bg-amber-500 p-1.5 rounded-lg shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-indigo-950" />
                  </div>
                  <div>
                    <p className="font-black text-sm text-white leading-tight">{item.t}</p>
                    <p className="text-xs text-indigo-300/60 mt-0.5">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4 relative z-10">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-950 bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-indigo-200">
              <span className="text-white">1,200+</span> Orang telah bergabung
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="lg:w-1/2 p-10 lg:p-20 bg-white">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-indigo-950 tracking-tighter mb-2">Buat Akun Baru</h2>
            <div className="h-1.5 w-20 bg-amber-500 rounded-full" />
          </div>

          {errors.server && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 rounded-[2rem] flex items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="bg-red-500 p-2 rounded-xl text-white">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-xs font-black uppercase tracking-wide">{errors.server}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-indigo-900/40 ml-1 tracking-[0.2em]">Nama Lengkap</label>
                <div className="relative group">
                  <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.fullName ? "text-red-500" : "text-slate-400 group-focus-within:text-indigo-600"}`} />
                  <Input 
                    placeholder="Budi Santoso" 
                    className={`pl-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold placeholder:text-slate-300 border-2 focus:ring-0 focus:border-indigo-600 transition-all ${errors.fullName ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-indigo-900/40 ml-1 tracking-[0.2em]">Username</label>
                <div className="relative group">
                  <AtSign className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.username ? "text-red-500" : "text-slate-400 group-focus-within:text-indigo-600"}`} />
                  <Input 
                    placeholder="budi_art" 
                    className={`pl-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold placeholder:text-slate-300 border-2 focus:ring-0 focus:border-indigo-600 transition-all ${errors.username ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-indigo-900/40 ml-1 tracking-[0.2em]">Alamat Email</label>
              <div className="relative group">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.email ? "text-red-500" : "text-slate-400 group-focus-within:text-indigo-600"}`} />
                <Input 
                  type="email" 
                  placeholder="budi@email.com" 
                  className={`pl-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold placeholder:text-slate-300 border-2 focus:ring-0 focus:border-indigo-600 transition-all ${errors.email ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-indigo-900/40 ml-1 tracking-[0.2em]">Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.password ? "text-red-500" : "text-slate-400 group-focus-within:text-indigo-600"}`} />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    className={`pl-14 pr-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold placeholder:text-slate-300 border-2 focus:ring-0 focus:border-indigo-600 transition-all ${errors.password ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors z-30"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-indigo-900/40 ml-1 tracking-[0.2em]">Konfirmasi</label>
                <div className="relative group">
                  <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-20 transition-colors ${errors.confirmPassword ? "text-red-500" : "text-slate-400 group-focus-within:text-indigo-600"}`} />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    className={`pl-14 h-16 rounded-[1.5rem] text-indigo-950 font-bold placeholder:text-slate-300 border-2 focus:ring-0 focus:border-indigo-600 transition-all ${errors.confirmPassword ? "border-red-100 bg-red-50/30" : "border-slate-100 bg-slate-50/50"}`}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full h-20 rounded-[2rem] bg-indigo-600 hover:bg-indigo-950 text-white font-black text-xl shadow-2xl shadow-indigo-200 mt-10 transition-all active:scale-[0.95] flex items-center justify-center gap-4 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>MENCATAT KEBAIKAN...</span>
                </>
              ) : (
                <>
                  DAFTAR SEKARANG
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm font-bold text-slate-400 mt-12">
            Sudah punya akun? <Link href="/login" className="text-indigo-600 font-black hover:text-amber-600 transition-colors">Masuk di Sini</Link>
          </p>
        </div>
      </div>
    </main>
  );
}