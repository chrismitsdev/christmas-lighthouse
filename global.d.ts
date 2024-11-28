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

  type Product = {
    id: string
    name: string
    description: string[] | null
    price: string
    disabled: boolean
  }

  type Ctg = {
    link: string
    icon?: React.ReactComponentElement
    title: string
    products: Product[]
    notes: string[] | null
  }

  type Category = {
    link: string
    title: string
    notes: string[] | null
    products: {
      name: string
      description: string[] | null
      price: string
    }[]
    icon?: React.ReactElement
  }

  type CustomIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
  }

  type AsChild = {
    asChild?: boolean
  }
}
