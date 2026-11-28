import type {MetadataRoute} from 'next'
import {routing} from '@/src/i18n/routing'
import {siteUrl} from '@/src/lib/seo'

// Only the home page: the menu pages are noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((other) => [other, `${siteUrl}/${other}`])
        ),
        'x-default': `${siteUrl}/${routing.defaultLocale}`
      }
    },
    videos: [
      {
        title: '5th Christmas Charity Parade',
        description:
          'Highlights from the 5th Christmas Charity Parade at the Port of Alexandroupoli.',
        thumbnail_loc: `${siteUrl}/sections/parade/images/parade-poster.webp`,
        content_loc: `${siteUrl}/sections/parade/video/parade-video.mp4`,
        publication_date: '2025-11-30',
        family_friendly: 'yes'
      }
    ]
  }))
}
