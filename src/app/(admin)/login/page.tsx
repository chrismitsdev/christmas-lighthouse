import type {Metadata} from 'next'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {LoginForm} from '@/src/app/(admin)/login/login-form'
import logo from '@/public/shared/logo.png'

export const metadata: Metadata = {
  title: 'Σύνδεση | Διαχειριστικό'
}

export default async function LoginPage() {
  const {session} = await getCurrentSession()

  if (session !== null) {
    redirect('/dashboard')
  }

  return (
    <main className='min-h-screen'>
      <Section className='mx-4 py-8 max-w-xl space-y-8 sm:mx-auto sm:py-32 sm:space-y-20!'>
        <Image
          className='mx-auto w-auto h-24'
          src={logo}
          alt='The Christmas Lighthouse image'
          priority
        />
        <LoginForm />
      </Section>
    </main>
  )
}
