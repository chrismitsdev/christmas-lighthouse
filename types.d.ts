import type messages from '@/messages/en.json'
import type {routing} from '@/src/i18n/routing'

type Locale = (typeof routing.locales)[number]

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: typeof messages
  }
}

declare global {
  type Params = {
    params: {
      locale: Locale
    }
  }

  type ParamsWithSlug = {
    params: {
      locale: Locale
      slug: string
    }
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type AsChild = {
    asChild?: boolean
  }
}
