"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShoppingBag,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState<UserData | null>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/karya?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const syncStatus = useCallback(async () => {
    // JANGAN sinkronisasi user jika sedang di halaman auth untuk mencegah flicker profil
    const isAuthPage = pathname === "/login" || pathname === "/register";

    try {
      // 1. Sinkronisasi Keranjang
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((acc: number, item: any) => acc + (item.jumlah || 0), 0);
      setCartCount(total);

      // 2. Cek Sesi Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && !isAuthPage) {
        // Ambil data dari tabel profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const userData = {
            id: session.user.id,
            fullName: profile.full_name || "User",
            email: session.user.email || "",
            avatarUrl: profile.avatar_url
          };
          setUser(userData);
          localStorage.setItem("user_session", JSON.stringify(userData));
        } else {
          // Jika sesi ada tapi profil belum dibuat (delay trigger), 
          // gunakan data sementara dari metadata auth
          setUser({
            id: session.user.id,
            fullName: session.user.user_metadata.full_name || "User",
            email: session.user.email || "",
          });
        }
      } else {
        // Jika tidak ada sesi ATAU sedang di halaman login/register, pastikan user null
        setUser(null);
        if (!isAuthPage) localStorage.removeItem("user_session");
      }
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [supabase, pathname]);

  useEffect(() => {
    syncStatus();

    window.addEventListener("authUpdated", syncStatus);
    window.addEventListener("cartUpdated", syncStatus);
    window.addEventListener("storage", syncStatus);

    return () => {
      window.removeEventListener("authUpdated", syncStatus);
      window.removeEventListener("cartUpdated", syncStatus);
      window.removeEventListener("storage", syncStatus);
    };
  }, [syncStatus]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user_session");
    setUser(null);
    window.dispatchEvent(new Event("authUpdated"));
    router.push("/");
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      isScrolled ? "bg-indigo-950/90 backdrop-blur-xl py-3 border-b border-white/10" : "bg-indigo-950 py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="bg-amber-500 p-2 rounded-xl">
              <Heart className="w-6 h-6 text-indigo-950 fill-current" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Difabel<span className="text-amber-500">Zone</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-2 py-1.5 rounded-2xl">
            <NavLink href="/" active={pathname === "/"}>Beranda</NavLink>
            <NavLink href="/karya" active={pathname.startsWith("/karya")}>Karya</NavLink>
            <NavLink href="/donasi" active={pathname.startsWith("/donasi")}>Donasi</NavLink>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:relative md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 group-focus-within:text-amber-500 transition-colors" />
              <Input 
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-40 xl:w-60 bg-white/5 border-white/10 text-white rounded-xl pl-10 focus:w-72 transition-all outline-none" 
                placeholder="Cari karya..."
              />
            </div>

            <Link href="/wishlist" className="relative p-2 text-indigo-100 hover:text-red-400 transition-colors">
              <Heart className="w-6 h-6" />
            </Link>

            <Link href="/cart" className="relative p-2 text-indigo-100 hover:text-amber-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-black text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-950">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden md:block">
              {isInitialLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-indigo-300" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 pl-3 pr-1 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all outline-none">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-indigo-950 font-black shadow-lg overflow-hidden text-xs uppercase">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
                        ) : (
                          user.fullName.charAt(0)
                        )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-indigo-950 border-white/10 text-white rounded-2xl p-2 shadow-2xl">
                    <DropdownMenuLabel className="px-4 py-3">
                      <p className="text-sm font-bold truncate">{user.fullName}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <Link href="/dashboard/profile">
                      <DropdownMenuItem className="flex gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer outline-none">
                        <User className="w-4 h-4 text-indigo-400" /> Profil Saya
                      </DropdownMenuItem>
                    </Link>
                    {/* <Link href="/dashboard/orders">
                      <DropdownMenuItem className="flex gap-3 p-3 rounded-xl focus:bg-white/5 cursor-pointer outline-none">
                        <ShoppingBag className="w-4 h-4 text-indigo-400" /> Pesanan Saya
                      </DropdownMenuItem>
                    </Link> */}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="flex gap-3 p-3 rounded-xl focus:bg-red-500/10 text-red-400 cursor-pointer font-black outline-none"
                    >
                      <LogOut className="w-4 h-4" /> KELUAR
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" className="text-white font-bold hover:text-amber-500">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-amber-500 text-indigo-950 font-black rounded-xl hover:bg-amber-400 shadow-lg">Daftar</Button>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`px-5 py-2 text-sm font-bold transition-colors ${
        active ? "text-amber-500" : "text-indigo-100 hover:text-amber-500"
      }`}
    >
      {children}
    </Link>
  );
}