"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  CheckCircle2, 
  Truck, 
  ShieldCheck,
  Info,
  ChevronRight,
  Check,
  ArrowRight,
  Loader2,
  Package,
  HandHeart,
  Fingerprint,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function DetailProduk() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [jumlah, setJumlah] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        const productId = params.id; 
        if (!productId) return;

        const { data, error } = await supabase
          .from('produk')
          .select(`*, pengrajin (*)`)
          .eq('id', productId)
          .single();

        if (error) throw error;
        setProduct(data);
        
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsFavorite(savedWishlist.some((item: any) => item.id === data.id));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchInitialData();
  }, [params.id, supabase]);

  const ensureAuth = (callback: () => void) => {
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }
    callback();
  };

  const addToCart = () => {
    ensureAuth(() => {
      setIsAdding(true);
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingIndex = currentCart.findIndex((item: any) => item.id === product.id);

      if (existingIndex > -1) {
        currentCart[existingIndex].jumlah += jumlah;
      } else {
        currentCart.push({
          id: product.id,
          nama: product.nama,
          harga: product.harga,
          image: product.image_url,
          pengrajin: product.pengrajin?.nama,
          jumlah: jumlah
        });
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => setIsAdding(false), 1000);
    });
  };

  const toggleWishlist = () => {
    ensureAuth(() => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      let updated;
      
      if (isFavorite) {
        updated = savedWishlist.filter((item: any) => item.id !== product.id);
        setIsFavorite(false);
      } else {
        const simpleProduct = {
          id: product.id,
          nama: product.nama,
          harga: product.harga,
          image: product.image_url,
          pengrajin: product.pengrajin?.nama || "Pengrajin" 
        };
        updated = [...savedWishlist, simpleProduct];
        setIsFavorite(true);
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlistUpdated"));
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4 opacity-20" />
        <p className="text-indigo-950 font-black uppercase tracking-[0.3em] text-[10px]">Menyentuh Detail Karya...</p>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20">Produk tidak ditemukan.</div>;

  const hargaAngka = Number(product.harga);

  return (
    <main className="min-h-screen bg-white">
      {/* Handmade Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-0" />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-36 pb-24 relative z-10">
        {/* Breadcrumb yang lebih bergaya */}
        <nav className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-12">
          <Link href="/karya" className="hover:text-indigo-950 transition-colors">Koleksi Karya</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-400 truncate max-w-[200px]">{product.nama}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* KOLOM KIRI: Visual & Pengrajin */}
          <div className="lg:col-span-6 space-y-12">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl group">
              {product.is_discount && (
                <div className="absolute top-10 left-10 z-10 bg-indigo-950 text-amber-400 px-6 py-2 rounded-2xl font-black text-[10px] tracking-widest shadow-2xl flex items-center gap-2">
                  <Zap className="w-3 h-3 fill-current" /> PENAWARAN KHUSUS
                </div>
              )}

              <img 
                src={product.image_url} 
                alt={product.nama} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              
              <div className="absolute top-10 right-10">
                <button 
                  onClick={toggleWishlist}
                  className={`p-6 rounded-[2rem] backdrop-blur-xl border border-white/20 transition-all shadow-2xl active:scale-90 ${
                      isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-slate-400 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-7 h-7 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
            
            {/* Kartu Profil Pengrajin yang Diperkuat */}
            <div className="bg-indigo-50/50 rounded-[3.5rem] p-10 border border-indigo-100 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-50 group-hover:bg-amber-100 transition-colors" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 text-center md:text-left">
                  <div className="relative shrink-0">
                    <img 
                      src={product.pengrajin?.image_url} 
                      className="w-28 h-28 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white rotate-3 group-hover:rotate-0 transition-transform duration-500"
                      alt={product.pengrajin?.nama}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-2xl border-2 border-white">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-amber-600 font-black uppercase tracking-[0.3em] mb-2">Sosok Di Balik Karya</h4>
                    <h5 className="font-black text-3xl text-indigo-950 mb-1 leading-none">{product.pengrajin?.nama}</h5>
                    <p className="text-sm font-bold text-indigo-400 mb-4">{product.pengrajin?.peran}</p>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm italic">
                      "{product.pengrajin?.deskripsi}"
                    </p>
                  </div>
                </div>
                <Link 
                  href={`/pengrajin/${product.pengrajin?.id}`} 
                  className="flex items-center justify-center w-full bg-indigo-950 py-4 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl"
                >
                  Buka Portofolio Pengrajin <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Konten & Transaksi */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                  {product.kategori}
                </span>
                <div className="flex items-center text-amber-500 bg-white px-5 py-2 rounded-2xl border border-slate-100 shadow-sm">
                  <Star className="w-4 h-4 fill-current mr-2" />
                  <span className="text-[11px] font-black text-slate-700">{product.rating || "5.0"}</span>
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> Ready Stock
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-[1] mb-8 tracking-tighter">
                {product.nama}
              </h1>

              <div className="inline-flex flex-col items-start">
                <p className="text-[10px] text-slate-300 uppercase font-black tracking-[0.3em] mb-4">Investasi Karya</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-6xl font-black text-indigo-600 tracking-tighter">
                    <span className="text-xl mr-2">Rp</span>
                    {hargaAngka.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* IMPACT SECTION: Transparency Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <HandHeart className="w-6 h-6 text-indigo-600 mb-4" />
                  <h6 className="text-[10px] font-black uppercase tracking-widest text-indigo-950 mb-2">Dampak Ekonomi</h6>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Keuntungan produk ini digunakan untuk pengembangan kemandirian ekonomi {product.pengrajin?.nama.split(' ')[0]}.</p>
               </div>
               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <Sparkles className="w-6 h-6 text-amber-500 mb-4" />
                  <h6 className="text-[10px] font-black uppercase tracking-widest text-indigo-950 mb-2">Kurasi DifabelZone</h6>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Produk telah melalui 3 tahap pengecekan kualitas standar inklusif DifabelZone.</p>
               </div>
            </div>

            <div className="space-y-10 mb-12">
              <div>
                <h4 className="flex items-center gap-2 font-black text-indigo-950 uppercase text-xs tracking-[0.2em] mb-4">
                  <Info className="w-4 h-4 text-indigo-400" /> Cerita Di Balik Produk
                </h4>
                <p className="text-slate-500 leading-relaxed font-medium text-lg">
                  {product.deskripsi || "Setiap goresan dan jahitan pada produk ini dibuat dengan ketelitian tinggi, mencerminkan semangat yang tak terbatas dari pengrajin kami."}
                </p>
              </div>

              {product.detail && (
                <div className="grid grid-cols-2 gap-4">
                  {product.detail.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                      <span className="text-[10px] font-black text-indigo-950 uppercase tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION AREA */}
            <div className="mt-auto pt-10 border-t border-slate-100 space-y-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center bg-slate-100 rounded-[1.8rem] p-1.5 w-full md:w-auto">
                  <button 
                    onClick={() => setJumlah(Math.max(1, jumlah - 1))} 
                    className="w-14 h-14 flex items-center justify-center font-black text-xl bg-white rounded-2xl shadow-sm hover:text-indigo-600 transition-all"
                  >-</button>
                  <span className="w-16 text-center font-black text-2xl text-indigo-950">{jumlah}</span>
                  <button 
                    onClick={() => setJumlah(Math.min(product.stok || 10, jumlah + 1))} 
                    className="w-14 h-14 flex items-center justify-center font-black text-xl bg-white rounded-2xl shadow-sm hover:text-indigo-600 transition-all"
                  >+</button>
                </div>
                <div className="hidden md:block">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right mb-1">Kapasitas Produksi</p>
                   <p className="font-black text-indigo-950 text-right">{product.stok || 10} Unit Tersisa</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Button 
                  onClick={addToCart}
                  disabled={isAdding}
                  variant="outline"
                  className={`h-24 rounded-[2rem] border-2 font-black text-xl gap-4 transition-all active:scale-95 shadow-2xl ${
                    isAdding ? "border-emerald-500 text-emerald-500 bg-emerald-50" : "border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-indigo-100/30"
                  }`}
                >
                  {isAdding ? <><Check className="w-7 h-7" /> Masuk Keranjang</> : <><ShoppingBag className="w-7 h-7" /> + Keranjang</>}
                </Button>

                <Button 
                  onClick={() => {
                    ensureAuth(() => {
                      addToCart(); 
                      router.push("/cart");
                    });
                  }}
                  className="h-24 rounded-[2rem] bg-indigo-600 hover:bg-indigo-950 text-white font-black text-xl shadow-2xl shadow-indigo-200 gap-4 transition-all hover:-translate-y-1 active:scale-95 group"
                >
                  Dukung Sekarang <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 py-6 border-y border-slate-50">
                <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <ShieldCheck className="w-5 h-5 text-indigo-600" /> Payment Aman
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <Truck className="w-5 h-5 text-amber-500" /> Logistik Prioritas
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <Package className="w-5 h-5 text-emerald-500" /> Eco-Packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}