import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['el', 'en'],
  defaultLocale: 'el',
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: {
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365
  }
})
