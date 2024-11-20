'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  MailIcon,
  KeySquareIcon,
  SendHorizonalIcon,
  HouseIcon
} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {loginAction} from '@/src/app/(admin)/login/actions'
import {cn} from '@/src/lib/utils'

const initialState = {
  message: ''
}

function LoginForm() {
  const [state, action] = React.useActionState(loginAction, initialState)

  return (
    <div className='py-8 px-4 w-full bg-app-surface border rounded sm:py-16 sm:px-12'>
      <form action={action}>
        <div className='space-y-12'>
          <div className='space-y-2 text-center'>
            <Typography variant='h4'>Σύνδεση διαχειριστή</Typography>
            <Typography variant='muted'>
              Συμπληρώστε τα στοιχεία σας για να συνδεθείτε στο διαχειριστκό.
            </Typography>
          </div>
          <div className='mt-12 space-y-4'>
            <Input
              placeholder='Email'
              icon={<MailIcon size={20} />}
              name='email'
              type='email'
              autoComplete='username'
            />
            <Input
              placeholder='Κωδικός πρόσβασης'
              icon={<KeySquareIcon size={20} />}
              name='password'
              type='password'
            />
            <span
              className={cn(
                'block px-1 py-[3px] min-h-6 text-xs text-red-200 font-semibold text-center rounded',
                state?.message && 'bg-red-300/20 border border-red-300/20'
              )}
            >
              {state?.message}
            </span>
          </div>
          <div className='mt-12 flex justify-between'>
            <Button asChild>
              <Link href='/'>
                <HouseIcon size={20} />
                <span>Αρχική</span>
              </Link>
            </Button>
            <Button>
              <span>Υποβολή</span>
              <SendHorizonalIcon size={20} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

export {LoginForm}
