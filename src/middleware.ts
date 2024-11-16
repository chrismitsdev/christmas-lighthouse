import {type MiddlewareConfig} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import {routing} from '@/src/i18n/routing'

export default createMiddleware(routing)

export const config: MiddlewareConfig = {
  matcher: ['/((?!_next|.*\\..*).*)']
}

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(el|en)/:path*']
// }
