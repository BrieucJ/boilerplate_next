/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  // react: { useSuspense: false },
  i18n,
  // i18n: {
  //   locales: ['en', 'fr'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
}

module.exports = nextConfig
