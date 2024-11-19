import type {Metadata} from 'next'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {LoginForm} from '@/src/app/(admin)/login/login-form'
import logo from '@/public/logo.png'

export const metadata: Metadata = {
  title: 'Σύνδεση Διαχειριστή'
}

export default async function LoginPage() {
  const {session} = await getCurrentSession()

  if (session !== null) {
    return redirect('/dashboard')
  }

  return (
    <main className='py-10 min-h-screen sm:py-40'>
      <div className='px-4 mx-auto flex flex-col gap-y-6 items-center max-w-xl w-full sm:gap-y-12'>
        <Image
          src={logo}
          alt='The Christmas Lighthouse image'
          height={100}
          priority
        />
        <LoginForm />
      </div>
    </main>
  )
}
