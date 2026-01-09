"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Settings, 
  ChevronRight
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Profil Saya", href: "/dashboard/profile", icon: User },
  // { name: "Pesanan Saya", href: "/dashboard/orders", icon: ShoppingBag },
  // { name: "Alamat Saya", href: "/dashboard/address", icon: MapPin },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR NAVIGASI (Tanpa Tombol Logout) --- */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100 lg:sticky lg:top-32">
              <div className="px-5 py-6 mb-4 border-b border-slate-50 text-center lg:text-left">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Pusat Akun</p>
                <h2 className="text-2xl font-black text-indigo-950 tracking-tight">Dashboard</h2>
              </div>
              
              <nav className="space-y-1.5">
                {MENU_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                        isActive 
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" 
                        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`} />
                        <span className="font-bold text-sm tracking-tight">{item.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-all ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"}`} />
                    </Link>
                  );
                })}
              </nav>

              {/* Tips Section (Pengganti Logout agar Sidebar tidak kosong di bawah) */}
              {/* <div className="mt-8 p-6 bg-amber-50 rounded-[2rem] border border-amber-100/50 hidden lg:block">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Bantuan</p>
                <p className="text-xs text-amber-900/70 font-medium leading-relaxed">
                  Butuh bantuan terkait pesanan atau profil? Hubungi tim support kami di WhatsApp.
                </p>
              </div> */}
            </div>
          </aside>

          {/* --- AREA KONTEN UTAMA --- */}
          <main className="flex-grow">
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-slate-100 min-h-[600px] animate-in fade-in slide-in-from-bottom-2 duration-700">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}