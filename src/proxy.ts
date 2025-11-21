import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import {routing} from '@/src/i18n/routing'

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  // Create and call the next-intl middleware
  const nextIntlMiddleware = createMiddleware(routing)
  const response = nextIntlMiddleware(request)

  // Only extend the cookie expiration on GET requests.
  if (request.method === 'GET') {
    const token = request.cookies.get('session')?.value ?? null

    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set('session', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
    }

    return response
  }

  // CSRF protection for non-GET requests:
  const originHeader = request.headers.get('Origin')
  // NOTE: May need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get('Host')
  // const hostHeader = request.headers.get('X-Forwarded-Host')

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {status: 403})
  }

  let origin: URL

  try {
    origin = new URL(originHeader)
  } catch {
    return new NextResponse(null, {status: 403})
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {status: 403})
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  // Match only internationalized pathnames
  matcher: ['/', '/menu', '/menu/*', '/(el|en)/:path*']
}
