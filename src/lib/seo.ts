import type {Metadata} from 'next'
import type {Locale} from 'next-intl'
import {routing} from '@/src/i18n/routing'

/** The site's canonical origin. The bare domain redirects here. */
export const siteUrl = 'https://www.thechristmaslighthouse.gr'

/**
 * Canonical URL and language alternates for one page, e.g. `path` '/menu'.
 * Each page must point to itself, not to the home page.
 */
export function localeAlternates(
  locale: Locale,
  path = ''
): Metadata['alternates'] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((other) => [other, `/${other}${path}`])
      ),
      'x-default': `/${routing.defaultLocale}${path}`
    }
  }
}
