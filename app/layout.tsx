import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer"; // Import Footer baru
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {/* children adalah isi dari setiap halaman (Beranda, Karya, dll) */}
        {children} 
        <Footer /> {/* Footer sekarang ada di semua halaman! */}
      </body>
    </html>
  );
}