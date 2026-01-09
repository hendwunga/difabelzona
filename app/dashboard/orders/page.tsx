"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Search,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

// Simulasi Data Pesanan
const MOCK_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "12 Okt 2024",
    status: "Dikirim",
    total: 255000,
    items: [
      { name: "Kain Batik Tulis Difabel - Motif Mega Mendung", qty: 1, price: 255000, img: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=200" }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "10 Okt 2024",
    status: "Selesai",
    total: 150000,
    items: [
      { name: "Tas Anyaman Bambu Handmade", qty: 2, price: 75000, img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=200" }
    ]
  },
  {
    id: "ORD-2024-003",
    date: "05 Okt 2024",
    status: "Belum Bayar",
    total: 500000,
    items: [
      { name: "Donasi Program Pelatihan Membatik", qty: 1, price: 500000, img: "https://plus.unsplash.com/premium_photo-1682092016075-b60596390977?q=80&w=200" }
    ]
  }
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = ["Semua", "Belum Bayar", "Diproses", "Dikirim", "Selesai"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai": return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case "Dikirim": return "bg-blue-100 text-blue-600 border-blue-200";
      case "Belum Bayar": return "bg-amber-100 text-amber-600 border-amber-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-indigo-950 mb-2">Pesanan Saya</h1>
        <p className="text-slate-500 text-sm">Pantau status pengiriman dan riwayat transaksi Anda.</p>
      </div>

      {/* TABS FILTER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap border ${
              activeTab === tab 
              ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" 
              : "bg-white text-slate-400 border-slate-100 hover:border-indigo-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SEARCH ORDERS */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari ID pesanan atau nama produk..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium"
        />
      </div>

      {/* LIST PESANAN */}
      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
            {/* Header Kartu */}
            <div className="p-5 bg-slate-50/50 flex flex-wrap justify-between items-center gap-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ID Pesanan</p>
                  <p className="text-sm font-black text-indigo-950">{order.id}</p>
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>

            {/* Konten Produk */}
            <div className="p-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <img src={item.img} alt={item.name} className="w-20 h-20 rounded-2xl object-cover border border-slate-100" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-indigo-950 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.qty} Barang x Rp {item.price.toLocaleString("id-ID")}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Belanja</p>
                        <p className="text-lg font-black text-indigo-600">Rp {order.total.toLocaleString("id-ID")}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Button variant="outline" className="rounded-xl font-black text-[10px] h-9 gap-2 border-slate-200">
                            DETAIL <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                        {order.status === "Belum Bayar" && (
                          <Button className="bg-amber-500 hover:bg-amber-400 text-indigo-950 rounded-xl font-black text-[10px] h-9">
                            BAYAR SEKARANG
                          </Button>
                        )}
                        {order.status === "Selesai" && (
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] h-9">
                            BELI LAGI
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}