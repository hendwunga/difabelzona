"use client";

import { useRouter, usePathname } from "next/navigation";

/**
 * useAuthGuard
 * Hook untuk memproteksi tindakan user (Action Guard)
 * dan memproteksi akses halaman (Page Guard).
 */
export const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * protectAction
   * Digunakan untuk membungkus fungsi seperti addToCart atau handleLike.
   * @param action - Fungsi yang akan dijalankan jika sudah login
   */
  const protectAction = (action: () => void) => {
    const session = localStorage.getItem("user_session");

    if (!session) {
      // 1. Simpan URL asal agar setelah login bisa kembali ke sini
      localStorage.setItem("redirect_after_login", pathname);

      // 2. Tandai bahwa user sedang mencoba melakukan aksi (Opsional: untuk auto-execute setelah login)
      localStorage.setItem("pending_action", "true");

      // 3. Arahkan ke login
      router.push("/login");
      return;
    }

    // 3. Jika ada sesi, jalankan aksi aslinya
    action();
  };

  /**
   * checkSession
   * Mengembalikan boolean status login saat ini
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem("user_session");
  };

  return { protectAction, isAuthenticated };
};