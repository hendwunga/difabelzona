"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShoppingBag,
  Settings,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // LOGIKA UTAMA: State User (null = guest, object = logged in)
  const [user, setUser] = useState<any>(null);

  // 1. Sinkronisasi Auth & Keranjang
  useEffect(() => {
    const syncStatus = () => {
      // Cek Sesi User
      const session = localStorage.getItem("user_session");
      setUser(session ? JSON.parse(session) : null);

      // Cek Jumlah Keranjang
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((acc: number, item: any) => acc + item.jumlah, 0);
      setCartCount(total);
    };

    // Jalankan saat pertama kali mount
    syncStatus();

    // Dengarkan event custom dari komponen lain (Login/Detail Produk)
    window.addEventListener("authUpdated", syncStatus);
    window.addEventListener("cartUpdated", syncStatus);
    window.addEventListener("storage", syncStatus);

    return () => {
      window.removeEventListener("authUpdated", syncStatus);
      window.removeEventListener("cartUpdated", syncStatus);
      window.removeEventListener("storage", syncStatus);
    };
  }, []);

  // 2. Efek Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("user_session");
    setUser(null);
    window.dispatchEvent(new Event("authUpdated")); // Kabari komponen lain
    router.push("/");
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled 
      ? "bg-indigo-950/80 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl" 
      : "bg-indigo-950 py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform">
              <Heart className="w-6 h-6 text-indigo-950 fill-current" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Difabel<span className="text-amber-500">Zone</span>
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-2 py-1.5 rounded-2xl">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/karya">Karya</NavLink>
            <NavLink href="/donasi">Donasi</NavLink>
          </div>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search (Desktop) */}
            <div className="hidden md:relative md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 group-focus-within:text-amber-500 transition-colors" />
              <Input 
  type="search" // Gunakan type="search", bukan type="text"
  autoComplete="off" // Perintah ke browser agar tidak mengisi otomatis
  name="search-karya" // Beri nama yang unik agar tidak disangka username
  className="w-40 xl:w-60 bg-indigo-900/50 border-white/10 text-white rounded-xl pl-10 focus:ring-amber-500 focus:w-72 transition-all" 
  placeholder="Cari karya..."
/>
            </div>
<Link href="/wishlist" className="relative p-2 text-indigo-100 hover:text-red-400 transition-colors group">
    <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
    {/* Opsional: Jika Anda ingin menambahkan badge jumlah favorit */}
    <span className="sr-only">Wishlist</span>
  </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-indigo-100 hover:text-amber-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-[10px] font-black text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* LOGIKA KONDISIONAL: Avatar vs Login Button */}
            <div className="hidden md:block">
              {user ? (
                // Tampilan JIKA SUDAH LOGIN
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 pl-3 pr-1 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all outline-none">
                      <span className="text-xs font-bold text-indigo-100">{user.fullName.split(' ')[0]}</span>
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-indigo-950 font-black shadow-inner">
                        {user.fullName.charAt(0)}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
<DropdownMenuContent align="end" className="w-64 mt-4 bg-indigo-950 border-white/10 text-white rounded-2xl p-2 shadow-2xl">
  <DropdownMenuLabel className="px-4 py-3">
    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Akun Pembeli</p>
    <p className="text-sm font-bold truncate">{user.fullName}</p>
  </DropdownMenuLabel>
  
  <DropdownMenuSeparator className="bg-white/10" />

  {/* HUBUNGKAN KE PROFIL SAYA */}
  <Link href="/dashboard/profile">
    <DropdownMenuItem className="flex gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer font-medium outline-none">
      <User className="w-4 h-4 text-indigo-400" /> Profil Saya
    </DropdownMenuItem>
  </Link>

  {/* HUBUNGKAN KE PESANAN SAYA */}
  <Link href="/dashboard/orders">
    <DropdownMenuItem className="flex gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer font-medium outline-none">
      <ShoppingBag className="w-4 h-4 text-indigo-400" /> Pesanan Saya
    </DropdownMenuItem>
  </Link>

  <DropdownMenuSeparator className="bg-white/10" />
  
  {/* TOMBOL LOGOUT */}
  <DropdownMenuItem 
    onClick={handleLogout}
    className="flex gap-3 p-3 rounded-xl focus:bg-red-500/10 text-red-400 cursor-pointer font-black outline-none"
  >
    <LogOut className="w-4 h-4" /> KELUAR
  </DropdownMenuItem>
</DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Tampilan JIKA BELUM LOGIN (Guest)
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" className="text-white font-bold hover:text-amber-500">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-amber-500 text-indigo-950 font-black rounded-xl hover:bg-amber-400 shadow-lg shadow-amber-500/20">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <div className={`lg:hidden fixed inset-0 top-[76px] bg-indigo-950 z-40 transition-transform duration-500 border-t border-white/5 ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <MobileLink href="/" active onClick={() => setIsMenuOpen(false)}>Beranda</MobileLink>
            <MobileLink href="/karya" onClick={() => setIsMenuOpen(false)}>Karya Difabel</MobileLink>
            <MobileLink href="/donasi" onClick={() => setIsMenuOpen(false)}>Donasi</MobileLink>
            <Link 
        href="/wishlist" 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-4 text-3xl font-black tracking-tighter text-white"
      >
        Favorit <Heart className="text-red-500 fill-current w-6 h-6" />
      </Link>
          </div>

          <div className="pt-8 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-indigo-950 font-black text-xl shadow-lg">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-black">{user.fullName}</p>
                      <p className="text-indigo-400 text-xs font-medium italic">Pembeli Terverifikasi</p>
                    </div>
                 </div>
                 <Button onClick={handleLogout} variant="destructive" className="h-14 rounded-2xl font-black gap-2">
                   <LogOut className="w-5 h-5" /> KELUAR AKUN
                 </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full h-14 border-white/10 text-white rounded-2xl font-black">MASUK</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button className="w-full h-14 bg-amber-500 text-indigo-950 rounded-2xl font-black">DAFTAR</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Sub-components for cleaner code
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-5 py-2 text-sm font-bold text-indigo-100 hover:text-amber-500 transition-colors rounded-xl">
      {children}
    </Link>
  );
}

function MobileLink({ href, children, active = false, onClick }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block text-3xl font-black tracking-tighter p-2 ${active ? 'text-amber-500' : 'text-white'}`}
    >
      {children}
    </Link>
  );
}