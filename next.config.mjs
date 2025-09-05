/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pexels.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      
      // Added domains for your car images
      { protocol: 'https', hostname: 'hips.hearstapps.com' },
      { protocol: 'https', hostname: 'mediapool.bmwgroup.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.lamborghini.com' },
      { protocol: 'https', hostname: 'mclaren.scene7.com' },
      { protocol: 'https', hostname: 'd2q97jj8nilsnk.cloudfront.net' },
      { protocol: 'https', hostname: 'media.ed.edmunds-media.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'cdn.motor1.com' },
      { protocol: 'https', hostname: 'www.amalgamcollection.com' },
      { protocol: 'https', hostname: 'robbreport.com' },
      { protocol: 'https', hostname: 'www.streetmachine.com.au' },
      { protocol: 'https', hostname: 'www.mercedes-benz.com' },
    ],
  },
}

export default nextConfig
