import {routing} from '@/src/i18n/routing'
import messages from '@/messages/en.json'

type Locale = (typeof routing.locales)[number]
type Messages = typeof messages

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: Messages
  }
}

declare global {
  type Params = {
    params: Promise<{
      locale: Locale
    }>
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type AsChild = {
    asChild?: boolean
  }
}
