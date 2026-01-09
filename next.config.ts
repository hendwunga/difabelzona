/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unoudijdjyrssymqrbmb.supabase.co', // Ganti dengan hostname supabase kamu
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com', // Untuk tekstur handmade paper
      }
    ],
  },
};

export default nextConfig;