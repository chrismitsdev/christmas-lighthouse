// eslint-disable-next-line
import Link from 'next/link'
import {getCurrentSession} from '@/src/db/session'

async function LinkToAdmin({children}: React.PropsWithChildren) {
  const {session} = await getCurrentSession()
  const href = session === null ? 'login' : 'dashboard'

  return (
    <Link
      href={`/${href}`}
      className='block text-xs font-extralight'
    >
      {children}
    </Link>
  )
}

LinkToAdmin.displayName = 'LinkToAdmin'

export {LinkToAdmin}
