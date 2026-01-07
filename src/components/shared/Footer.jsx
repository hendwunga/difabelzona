import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16 text-center md:text-left">
        <div className="col-span-2">
          <h2 className="text-3xl font-black mb-6">DIFABEL<span className="text-amber-500">ZONE</span></h2>
          <p className="text-indigo-200/60 max-w-sm leading-relaxed mx-auto md:mx-0">
            Membangun kemandirian ekonomi inklusif melalui apresiasi karya pengrajin difabel Indonesia.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-amber-500 font-black uppercase tracking-widest text-xs">Navigasi</h4>
          <ul className="space-y-4 text-indigo-200/80 text-sm font-bold">
            <li><Link href="/karya" className="hover:text-amber-400 transition-colors">Semua Karya</Link></li>
            <li><Link href="/donasi" className="hover:text-amber-400 transition-colors">Program Donasi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-amber-500 font-black uppercase tracking-widest text-xs">Kontak</h4>
          <div className="space-y-4 text-indigo-200/80 text-sm font-medium">
            <p>Yogyakarta, Indonesia</p>
            <p>hello@difabelzone.com</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-8 text-center text-indigo-400 text-[10px] tracking-[0.3em] font-black uppercase">
        <p>© 2026 DIFABELZONE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}