"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { ShoppingCart, User, Search, Heart, Menu, X, Bell } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar navbar berubah transparansi (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
      ? "bg-indigo-950/80 backdrop-blur-md py-3 shadow-lg" 
      : "bg-indigo-950 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO - Responsif Text Size */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-amber-500 p-2 rounded-xl shadow-lg shadow-amber-500/20">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-indigo-950 fill-current" />
            </div>
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter">
              DIFABEL<span className="text-amber-500">ZONE</span>
            </span>
          </Link>

          {/* DESKTOP NAV - Menggunakan spacing dinamis */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/karya">Karya</NavLink>
            <NavLink href="/donasi">Donasi</NavLink>
            
            <div className="h-6 w-[1px] bg-indigo-800 mx-4" />

            {/* Modern Search Bar */}
            <div className="relative group ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 group-focus-within:text-amber-500" />
              <Input
                type="text"
                placeholder="Cari kebaikan..."
                className="pl-10 pr-4 py-2 w-48 xl:w-64 bg-indigo-900/40 border-indigo-700 text-white placeholder:text-indigo-400 rounded-full focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          {/* RIGHT SECTION (Icons) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifikasi - Penting untuk User Exp jaman sekarang */}
            <Button variant="ghost" size="icon" className="hidden sm:flex text-indigo-100 hover:text-amber-400 hover:bg-indigo-900/50">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-indigo-100 hover:text-amber-400 hover:bg-indigo-900/50 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-[10px] font-bold text-indigo-950 w-4 h-4 flex items-center justify-center rounded-full border-2 border-indigo-950">
                2
              </span>
            </Button>

            {/* Desktop User Dropdown */}
            <div className="hidden md:block">
              <UserDropdown />
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-indigo-100 hover:bg-indigo-900 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER (Modern Overlay) --- */}
      <div className={`lg:hidden fixed inset-0 top-[72px] bg-indigo-950 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <Input className="pl-11 bg-indigo-900/50 border-indigo-700 text-white h-12 rounded-xl" placeholder="Cari produk..." />
          </div>

          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Beranda</MobileNavLink>
            <MobileNavLink href="/karya" onClick={() => setIsMenuOpen(false)}>Karya Difabel</MobileNavLink>
            <MobileNavLink href="/donasi" onClick={() => setIsMenuOpen(false)}>Donasi</MobileNavLink>
          </div>

          <div className="pt-6 border-t border-indigo-800 space-y-4">
            <p className="text-indigo-400 text-sm font-medium px-4">Akun Saya</p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-indigo-700 text-white hover:bg-indigo-900 h-12 rounded-xl">
                Login
              </Button>
              <Button className="bg-amber-500 text-indigo-950 hover:bg-amber-400 h-12 rounded-xl font-bold">
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Sub-komponen agar kode rapi dan mudah diatur (Refactoring)
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="px-4 py-2 text-indigo-100 hover:text-amber-400 font-medium rounded-lg hover:bg-indigo-900/30 transition-all duration-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block px-4 py-4 text-xl font-semibold text-white bg-indigo-900/30 rounded-2xl active:scale-95 transition-transform"
    >
      {children}
    </Link>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 text-indigo-100 hover:bg-indigo-900/50 px-2 rounded-full">
          <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center border border-indigo-500">
            <User className="w-5 h-5 text-indigo-200" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 mt-2 bg-indigo-950 border-indigo-800 text-white rounded-2xl shadow-2xl">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">Selamat Datang</p>
          <p className="text-xs text-indigo-400 truncate">user@difabelzone.com</p>
        </div>
        <DropdownMenuSeparator className="bg-indigo-800" />
        <DropdownMenuItem className="focus:bg-indigo-900 focus:text-amber-400 cursor-pointer rounded-lg py-2">Profil Saya</DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-indigo-900 focus:text-amber-400 cursor-pointer rounded-lg py-2">Pesanan</DropdownMenuItem>
        <DropdownMenuSeparator className="bg-indigo-800" />
        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer rounded-lg py-2 font-semibold">Keluar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}