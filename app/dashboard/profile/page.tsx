"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Save, Loader2, User } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [userSession, setUserSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // State Form (Sinkron dengan kolom tabel profiles)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // 1. Ambil Data Profil dari Supabase saat load
  useEffect(() => {
    const loadProfile = async () => {
      const sessionData = localStorage.getItem("user_session");
      if (!sessionData) return;
      
      const session = JSON.parse(sessionData);
      setUserSession(session);

      // Ambil data terbaru langsung dari tabel profiles
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.id)
        .single();

      if (data) {
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
        setAvatarUrl(data.avatar_url || "");
      }
    };

    loadProfile();
  }, [supabase]);

  // 2. Fungsi Upload Foto ke Supabase Storage
  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${userSession.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload ke bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Ambil URL Publik
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error: any) {
      alert(`Error upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // 3. Fungsi Simpan Perubahan
const handleSave = async () => {
    if (!userSession?.id) {
      alert("Error: Sesi login tidak ditemukan. Silakan login kembali.");
      return;
    }
    
    try {
      setLoading(true);
      console.log("Mencoba menyimpan data untuk ID:", userSession.id); // Debug

      const { data, error, status } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userSession.id)
        .select(); // Tambahkan .select() untuk memastikan data kembali

      if (error) throw error;

      if (status === 200 || status === 204) {
        // 1. Update Local Storage
        const updatedData = { 
          ...userSession, 
          fullName: fullName, 
          avatarUrl: avatarUrl 
        };
        localStorage.setItem("user_session", JSON.stringify(updatedData));
        
        // 2. Beritahu Navbar
        window.dispatchEvent(new Event("authUpdated"));

        // 3. Notifikasi Sukses
        alert("✅ Berhasil! Perubahan telah disimpan ke database Supabase.");
        console.log("Data berhasil diupdate:", data);
      }
    } catch (error: any) {
      console.error("Detail Error Simpan:", error);
      alert(`❌ Gagal Simpan: ${error.message || "Izin ditolak (RLS)"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-indigo-950 mb-2">Profil Saya</h1>
        <p className="text-slate-500 text-sm font-medium">Kelola informasi identitas Anda untuk kemudahan transaksi.</p>
      </div>

      <div className="space-y-8">
        {/* AVATAR SECTION */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="relative group">
            <div className="w-28 h-28 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 overflow-hidden border-4 border-white shadow-xl">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              ) : (
                <User className="w-12 h-12 text-indigo-200" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-indigo-600 p-3 rounded-2xl text-white shadow-2xl hover:bg-indigo-700 cursor-pointer transition-all active:scale-90">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              <input type="file" className="hidden" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-black text-indigo-950 text-lg">Foto Profil</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed font-medium">
              Gunakan foto terbaik Anda agar pengrajin mengenali pembelinya.
            </p>
          </div>
        </div>

        {/* INPUT SECTION */}
        <div className="grid gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Nama Lengkap</label>
            <Input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 rounded-2xl border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 font-bold px-6"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">WhatsApp (Tanpa Nol/62)</label>
            <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">+62</span>
                <Input 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="8123456xxx"
                  className="h-14 rounded-2xl border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 font-bold pl-16 pr-6"
                />
            </div>
          </div>

          <div className="space-y-2 opacity-60">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Email Aktif</label>
            <Input 
              value={userSession?.email || ""} 
              disabled 
              className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-slate-500 font-medium px-6 cursor-not-allowed"
            />
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={loading || uploading}
          className="w-full sm:w-auto px-12 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black text-lg gap-3 transition-all active:scale-95 shadow-2xl shadow-indigo-200"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
}