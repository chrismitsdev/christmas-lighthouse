import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `https://thechristmaslighthouse.gr/sitemap.xml`
  }
}
