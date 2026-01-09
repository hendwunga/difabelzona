"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Rumah Utama",
      name: "Budi Santoso",
      phone: "081234567890",
      city: "Tangerang Selatan",
      detail: "Jl. Merdeka No. 45, RT 03/RW 05, Kec. Serpong, 15310",
      isDefault: true,
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-indigo-950 mb-2">Alamat Saya</h1>
          <p className="text-slate-500 text-sm">Kelola alamat pengiriman untuk memudahkan checkout.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black gap-2 h-12 px-6 shadow-lg shadow-indigo-100">
          <Plus className="w-5 h-5" /> TAMBAH ALAMAT
        </Button>
      </div>

      <div className="grid gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className={`p-6 rounded-[2rem] border-2 transition-all ${
            addr.isDefault ? "border-indigo-600 bg-indigo-50/30" : "border-slate-100 bg-white"
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] font-black uppercase px-3 py-1 bg-indigo-600 rounded-full text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Utama
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-black text-indigo-950">{addr.name}</p>
              <p className="text-sm text-slate-500">{addr.phone}</p>
              <p className="text-sm text-slate-400 leading-relaxed italic mt-2">
                {addr.detail}, {addr.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}