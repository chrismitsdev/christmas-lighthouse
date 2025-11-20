import type {MetadataRoute} from 'next'
import type {Locale} from 'next-intl'
import {getPathname} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'

type Href = Parameters<typeof getPathname>[0]['href']

const slugs = [
  'coffee',
  'beverage',
  'refreshment',
  'energy',
  'spirit',
  'cocktail',
  'beer',
  'food',
  'pizza',
  'burger',
  'salad',
  'snack'
]
const host = 'https://thechristmaslighthouse.gr'

function getEntry(href: Href): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)])
      )
    }
  }
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href})
  return host + pathname
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [getEntry('/'), ...slugs.map((s) => getEntry(`/${s}`))]
}
