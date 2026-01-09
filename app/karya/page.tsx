"use client";

import { useState, useMemo, useEffect, Suspense } from "react"; // Tambahkan Suspense
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { 
  Star, 
  SlidersHorizontal, 
  Heart,
  Percent,
  X,
  Loader2,
  Award,
  Sparkles,
  Info
} from "lucide-react";

const categories = ["Semua", "Pakaian", "Kain", "Aksesoris", "Tas", "Dekorasi"];

// 1. Komponen Utama (Pembungkus Suspense)
export default function KaryaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4 opacity-20" />
        <p className="text-indigo-950 font-black uppercase tracking-[0.3em] text-[10px]">Memuat Galeri...</p>
      </div>
    }>
      <KaryaContent />
    </Suspense>
  );
}

// 2. Komponen Konten (Logika Asli Anda)
function KaryaContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchQuery = searchParams.get("search");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();
  }, [supabase]);

  const ensureAuth = (callback: () => void) => {
    if (!user) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }
    callback();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let query = supabase
          .from('produk')
          .select(`*, pengrajin ( nama, keahlian )`);

        if (searchQuery) {
          query = query.ilike("nama", `%${searchQuery}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, supabase]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistIds(savedWishlist.map((item: any) => item.id));
  }, []);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    ensureAuth(() => {
      let currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const isExist = currentWishlist.some((item: any) => item.id === product.id);
      
      let updatedWishlist;
      if (isExist) {
        updatedWishlist = currentWishlist.filter((item: any) => item.id !== product.id);
      } else {
        updatedWishlist = [...currentWishlist, { 
          id: product.id, 
          nama: product.nama, 
          harga: product.harga, 
          image: product.image_url, 
          pengrajin: product.pengrajin?.nama 
        }];
      }
      
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlistIds(updatedWishlist.map((item: any) => item.id));
      window.dispatchEvent(new Event("wishlistUpdated"));
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "Semua" || p.kategori === selectedCategory;
      if (onlyDiscount) return matchCategory && p.is_discount;
      return matchCategory;
    });
  }, [selectedCategory, onlyDiscount, products]);

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] z-0" />

      {!searchQuery && (
        <section className="pt-28 pb-8 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-indigo-950 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-amber-400 mb-6 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Koleksi Terkurasi 2026</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                    Setiap Karya <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Punya Cerita.</span>
                  </h1>
                  <p className="text-indigo-100/70 text-lg mb-8 max-w-lg leading-relaxed">
                    Membeli produk di DifabelZone berarti Anda turut mendukung kemandirian ekonomi teman-teman pengrajin disabilitas.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Button onClick={() => setIsVoucherOpen(true)} className="bg-amber-500 hover:bg-amber-400 text-indigo-950 px-8 h-14 rounded-2xl font-black transition-all shadow-lg shadow-amber-500/20">
                      Klaim Voucher Inklusi
                    </Button>
                    <div className="hidden md:flex items-center gap-4 text-white/40 border-l border-white/10 pl-6">
                      <div className="text-center">
                        <p className="text-xl font-black text-white">100%</p>
                        <p className="text-[10px] uppercase font-bold">Handmade</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block relative">
                   <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-1 rounded-[2.5rem] rotate-2 shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800" 
                        alt="Handmade Craft"
                        className="rounded-[2.4rem] h-[350px] w-full object-cover"
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 pr-4 border-r border-slate-200 shrink-0">
               <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <SlidersHorizontal className="w-4 h-4" />
               </div>
               <span className="text-xs font-black text-indigo-950 uppercase tracking-widest hidden sm:block">Filter</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setOnlyDiscount(false); }}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat && !onlyDiscount 
                  ? "bg-indigo-950 text-white shadow-xl shadow-indigo-200 scale-105" 
                  : "bg-slate-50 text-slate-400 hover:bg-white hover:shadow-md border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mb-6 opacity-20" />
            <p className="text-indigo-950 font-black uppercase tracking-[0.3em] text-[10px]">Mempersiapkan Karya Terbaik</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <Link 
                href={`/karya/${product.id}`} 
                key={product.id} 
                className="group flex flex-col relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm border border-slate-50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img 
                    src={product.image_url} 
                    alt={product.nama} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-1">
                      {product.pengrajin?.keahlian || "Pengrajin Berbakat"}
                    </p>
                    <p className="text-white text-sm font-bold">Dibuat oleh {product.pengrajin?.nama}</p>
                  </div>

                  {product.is_discount && (
                    <div className="absolute top-6 left-6 bg-amber-500 text-indigo-950 text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl">
                      EDISI TERBATAS
                    </div>
                  )}

                  <div className="absolute top-6 right-6 z-10">
                    <button 
                      onClick={(e) => toggleWishlist(e, product)}
                      className={`p-3 backdrop-blur-md rounded-2xl shadow-xl transition-all active:scale-90 ${
                        wishlistIds.includes(product.id) 
                        ? "bg-red-500 text-white" 
                        : "bg-white/90 text-slate-400 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${wishlistIds.includes(product.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                <div className="pt-6 px-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
                      {product.kategori}
                    </span>
                    {product.rating && (
                       <div className="flex items-center gap-1">
                         <Star className="w-3 h-3 fill-current text-amber-500" />
                         <span className="text-[10px] font-black text-slate-700">{product.rating}</span>
                       </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
                    {product.nama}
                  </h3>
                  
                  <p className="text-sm text-slate-400 font-medium mb-4 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" /> {product.pengrajin?.nama}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-indigo-950">
                      <span className="text-xs font-bold text-slate-400 mr-1 uppercase">IDR</span>
                      {Number(product.harga).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-8">
                <Info className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-3xl font-black text-indigo-950 mb-2">Belum Menemukan Karya?</h3>
             <p className="text-slate-500 mb-10 max-w-sm font-medium">Jangan khawatir, pengrajin kami terus berkarya setiap harinya untuk menambah koleksi baru.</p>
             <Button onClick={() => window.location.href = '/karya'} className="bg-indigo-600 hover:bg-indigo-950 text-white px-10 h-14 rounded-2xl font-black transition-all">Lihat Semua Koleksi</Button>
          </div>
        )}
      </section>

      {isVoucherOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsVoucherOpen(false)} />
          <div className="relative bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300 border-t-8 border-amber-500">
            <button onClick={() => setIsVoucherOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>
            <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-amber-600 border border-amber-100 rotate-6 shadow-inner">
              <Percent className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-indigo-950 mb-3">Voucher Berhasil!</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium italic">"Terima kasih telah mendukung pemberdayaan disabilitas."</p>
            <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-6 rounded-[2rem] mb-8 relative">
                <span className="text-3xl font-black text-indigo-600 tracking-[0.3em] uppercase">DIFABEL30</span>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
            </div>
            <Button onClick={() => { setIsVoucherOpen(false); setOnlyDiscount(true); }} className="w-full bg-indigo-600 hover:bg-indigo-950 text-white font-black h-16 rounded-[2rem] shadow-xl shadow-indigo-100 transition-all">Gunakan Sekarang</Button>
          </div>
        </div>
      )}
    </main>
  );
}