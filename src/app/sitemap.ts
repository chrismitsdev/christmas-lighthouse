import type {MetadataRoute} from 'next'
import {getPathname} from '@/src/i18n/navigation'

const host = 'https://thechristmaslighthouse.gr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: host,
      lastModified: new Date(),
      alternates: {
        languages: {
          'x-default': host,
          el: host + getPathname({locale: 'el', href: '/'}),
          en: host + getPathname({locale: 'en', href: '/'})
        }
      },
      videos: [
        {
          title: '5th Christmas Charity Parade',
          description:
            'Watch highlights from the 5th Christmas Charity Parade in Alexandroupoli',
          thumbnail_loc: `${host}/sections/parade/images/parade-poster.webp`,
          content_loc: `${host}/sections/parade/video/parade-video.mp4`
        }
      ]
    }
  ]
}
