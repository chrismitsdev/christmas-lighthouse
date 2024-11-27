import {MetadataRoute} from 'next'
import enMessages from '@/messages/en.json'
import {routing, getPathname} from '@/src/i18n/routing'

type Href = Parameters<typeof getPathname>[0]['href']

const host = 'https://thechristmaslighthouse.gr'

const slugs = Object.values(enMessages.Catalog).map(function (c) {
  return c.categoryName.toLowerCase().replace(' ', '-')
})

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
