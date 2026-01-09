"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Password baru minimal 8 karakter" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // FUNGSI UTAMA SUPABASE UNTUK UPDATE PASSWORD
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Password berhasil diperbarui!" });
        setNewPassword(""); // Reset input
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan sistem." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-10 p-6">
      <div>
        <h1 className="text-3xl font-black text-indigo-950 mb-2">Pengaturan</h1>
        <p className="text-slate-500 text-sm">Kelola keamanan dan preferensi akun Anda.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-indigo-600">
          <ShieldCheck className="w-6 h-6" />
          <h3 className="font-black">Keamanan Kata Sandi</h3>
        </div>
        
        <form onSubmit={handleUpdatePassword} className="grid gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          {/* Feedback Message */}
          {message.text && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-1 ${
              message.type === "error" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
            }`}>
              {message.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password Baru</label>
            <Input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Minimal 8 karakter" 
              className="h-12 rounded-xl bg-white text-indigo-950 font-bold focus:ring-indigo-100" 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-fit bg-indigo-600 hover:bg-indigo-700 rounded-xl font-black mt-2 transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                MEMPROSES...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
}