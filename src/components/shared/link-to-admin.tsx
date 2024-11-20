import {getCurrentSession} from '@/src/db/session'
// eslint-disable-next-line
import Link from 'next/link'

async function LinkToAdmin({children}: React.PropsWithChildren) {
  const {session} = await getCurrentSession()
  const href = session === null ? 'login' : 'dashboard'

  return (
    <Link
      href={`/${href}`}
      className='mt-auto block text-sm underline'
    >
      {children}
    </Link>
  )
}

LinkToAdmin.displayName = 'LinkToAdmin'

export {LinkToAdmin}
