import type {MetadataRoute} from 'next'
import {getCategories} from '@/src/db/menu'
import {getPathname} from '@/src/i18n/navigation'

const host = 'https://thechristmaslighthouse.gr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories()

  return [
    {
      url: host,
      lastModified: new Date(),
      alternates: {
        languages: {
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
    },
    {
      url: `${host}/menu`,
      lastModified: new Date(),
      alternates: {
        languages: {
          el: `${host}${getPathname({locale: 'el', href: '/'})}/menu`,
          en: `${host}${getPathname({locale: 'en', href: '/'})}/menu`
        }
      }
    },
    ...categories.map(({id}) => ({
      url: `${host}/menu/${id}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          el: `${host}${getPathname({locale: 'el', href: '/'})}/menu/${id}`,
          en: `${host}${getPathname({locale: 'en', href: '/'})}/menu/${id}`
        }
      }
    }))
  ]
}
