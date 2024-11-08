import en from '@/messages/en.json'
import {routing} from '@/src/i18n/routing'

type Messages = typeof en

declare global {
  type IntlMessages = Messages

  type Locale = (typeof routing.locales)[number]

  type AsyncParamsLocale = {
    params: Promise<{
      locale: Locale
    }>
  }

  type Category = {
    name: string
    categoryName: string
    categoryNotes: string[] | null
    categoryProducts: {
      name: string
      price: string
      description: string[] | null
    }[]
    categoryIcon?: React.ReactElement
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type AsChild = {
    asChild?: boolean
  }
}
