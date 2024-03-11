/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow openweathermap.org because I am using icons from their domain.
    domains: ["openweathermap.org"],
  },
};

export default nextConfig;
