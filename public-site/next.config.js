/** @type {import('next').NextConfig} */

// Configuración de Next.js.
// Habilitamos el dominio de imágenes remotas (picsum.photos) para poder usar
// el componente <Image /> de next/image con las imágenes de los cursos.
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
