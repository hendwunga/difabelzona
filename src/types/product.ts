export type Category = "Semua" | "Pakaian" | "Kain" | "Aksesoris" | "Tas" | "Dekorasi";

export interface Product {
  id: number;
  nama: string;
  harga: number;
  kategori: Category;
  pengrajin: string;
  image: string;
  rating: number;
}