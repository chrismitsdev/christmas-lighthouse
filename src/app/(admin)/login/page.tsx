import type {Metadata} from 'next'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {LoginForm} from '@/src/app/(admin)/login/login-form'
import logo from '@/public/logo.png'

export const metadata: Metadata = {
  title: 'Σύνδεση Διαχειριστή | The Christmas Lighthouse'
}

export default async function LoginPage() {
  const {session} = await getCurrentSession()

  if (session !== null) {
    return redirect('/dashboard')
  }

  return (
    <main className='min-h-screen'>
      <Section className='mx-4 max-w-xl sm:py-32 sm:mx-auto'>
        <Image
          className='mx-auto'
          src={logo}
          alt='The Christmas Lighthouse image'
          height={100}
          priority
        />
        <LoginForm />
      </Section>
    </main>
  )
}
