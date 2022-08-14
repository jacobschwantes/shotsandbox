/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloud.screenshotify.io']
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/account',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
