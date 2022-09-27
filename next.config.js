const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')
const withSvgr = require('next-svgr')

module.exports = withPlugins(
  [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withTM([]),
    withSvgr({
      async redirects() {
        return [
          {
            source: '/escritores',
            destination: '/', // Matched parameters can be used in the destination
            permanent: true
          }
        ]
      },
      images: {
        domains: ['images.ctfassets.net', 'images.unsplash.com']
      },
      env: {
        NEXT_PUBLIC_SUPABASE_PROJECT_URL:
          process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    })
  ],
  { reactStrictMode: true }
)
