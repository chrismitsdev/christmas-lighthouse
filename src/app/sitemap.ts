import type {MetadataRoute} from 'next'
import {getPathname} from '@/src/i18n/navigation'

const host = 'https://thechristmaslighthouse.gr'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
      lastModified: new Date(),
      alternates: {
        languages: {
          el: host + getPathname({locale: 'el', href: '/'}),
          en: host + getPathname({locale: 'en', href: '/'})
        }
      }
    }
  ]
}
