import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/menu', '/dashboard', '/login']
    },
    sitemap: 'https://thechristmaslighthouse.gr/sitemap.xml'
  }
}
