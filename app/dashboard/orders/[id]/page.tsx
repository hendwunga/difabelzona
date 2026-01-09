"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Truck, 
  MapPin, 
  CreditCard, 
  Package, 
  CheckCircle2, 
  Copy,
  Download
} from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Data Mock Detail Pesanan
  const orderData = {
    id: id,
    status: "Dikirim",
    date: "12 Oktober 2024, 14:20 WIB",
    receiptNumber: "JP1234567890",
    courier: "J&T Express - Reguler",
    address: {
      name: "Budi Santoso",
      phone: "0812-3456-7890",
      detail: "Jl. Merdeka No. 45, RT 03/RW 05, Kec. Serpong, Tangerang Selatan, Banten, 15310"
    },
    payment: {
      method: "QRIS",
      status: "Lunas",
      subtotal: 255000,
      shipping: 20000,
      tax: 2500,
      total: 277500
    },
    items: [
      { 
        name: "Kain Batik Tulis Difabel - Motif Mega Mendung", 
        qty: 1, 
        price: 255000, 
        img: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=200" 
      }
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER & BACK BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-950 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-indigo-950 tracking-tight">Detail Pesanan</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl font-black text-xs h-11 gap-2 border-slate-200">
            <Download className="w-4 h-4" /> INVOICE
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: STATUS & PRODUK */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* TRACKING STATUS */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-indigo-600" />
              <h3 className="font-black text-indigo-950">Status Pengiriman</h3>
            </div>
            
            <div className="relative pl-8 border-l-2 border-indigo-200 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-sm" />
                <p className="text-sm font-black text-indigo-950">Pesanan Sedang Dikirim</p>
                <p className="text-xs text-slate-500 mt-1">Paket telah dibawa oleh kurir menuju lokasi Anda.</p>
                <p className="text-[10px] font-bold text-indigo-400 mt-1 uppercase italic">13 Okt 2024, 09:00 WIB</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-300 rounded-full border-4 border-white" />
                <p className="text-sm font-bold text-slate-500">Pesanan Telah Sampai</p>
              </div>
            </div>
          </div>

          {/* ITEM LIST */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-6 lg:p-8">
            <h3 className="font-black text-indigo-950 mb-6 flex items-center gap-3">
              <Package className="w-5 h-5 text-slate-400" /> Produk yang Dibeli
            </h3>
            {orderData.items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <img src={item.img} className="w-20 h-20 rounded-2xl object-cover border border-slate-100" />
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-indigo-950">{item.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.qty} x Rp {item.price.toLocaleString("id-ID")}</p>
                </div>
                <p className="font-black text-indigo-950">Rp {(item.qty * item.price).toLocaleString("id-ID")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: ALAMAT & PEMBAYARAN */}
        <div className="space-y-6">
          
          {/* SHIPPING ADDRESS */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-6">
            <h3 className="text-sm font-black text-indigo-950 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Alamat Pengiriman
            </h3>
            <div className="text-xs space-y-2">
              <p className="font-black text-indigo-950 text-sm uppercase">{orderData.address.name}</p>
              <p className="text-slate-500 font-medium">{orderData.address.phone}</p>
              <p className="text-slate-400 leading-relaxed italic">{orderData.address.detail}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">No. Resi</p>
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-xl">
                <span className="text-xs font-black text-indigo-600">{orderData.receiptNumber}</span>
                <button className="text-indigo-400 hover:text-indigo-600"><Copy className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          {/* PAYMENT SUMMARY */}
          <div className="bg-indigo-950 text-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-950/20">
            <h3 className="text-sm font-black text-amber-400 mb-6 flex items-center gap-2 uppercase tracking-[2px]">
              <CreditCard className="w-4 h-4" /> Rincian Pembayaran
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-indigo-300 font-medium">Subtotal</span>
                <span className="font-bold font-mono text-sm">Rp {orderData.payment.subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-indigo-300 font-medium">Ongkos Kirim</span>
                <span className="font-bold font-mono text-sm">Rp {orderData.payment.shipping.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-4">
                <span className="text-indigo-300 font-medium">Pajak (PPN)</span>
                <span className="font-bold font-mono text-sm">Rp {orderData.payment.tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-black">Total Bayar</span>
                <span className="text-xl font-black text-amber-400">Rp {orderData.payment.total.toLocaleString("id-ID")}</span>
              </div>
              <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-indigo-200">Metode</span>
                <span className="text-xs font-black">{orderData.payment.method}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}