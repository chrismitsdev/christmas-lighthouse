import {defineRouting} from 'next-intl/routing'
import {createNavigation} from 'next-intl/navigation'

const routing = defineRouting({
  localePrefix: 'always',
  localeDetection: true,
  locales: ['el', 'en'],
  defaultLocale: 'el'
})

const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing)

export {routing, Link, redirect, usePathname, useRouter, getPathname}
