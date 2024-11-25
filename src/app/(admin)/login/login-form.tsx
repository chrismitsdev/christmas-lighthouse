'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  MailIcon,
  KeySquareIcon,
  SendHorizonalIcon,
  HouseIcon
} from 'lucide-react'
import {
  type LoginActionState,
  loginAction
} from '@/src/app/(admin)/login/actions'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'

const initialState = {
  data: {} as LoginActionState['data'],
  errors: {} as LoginActionState['errors']
}

function LoginForm() {
  const [state, action, isPending] = React.useActionState(
    loginAction,
    initialState
  )

  return (
    <div className='py-8 px-4 w-full bg-app-surface border rounded sm:py-16 sm:px-12'>
      <form
        action={action}
        noValidate
      >
        <div className='space-y-12'>
          <div className='space-y-2 text-center'>
            <Typography variant='h4'>Σύνδεση διαχειριστή</Typography>
            <Typography variant='muted'>
              Συμπληρώστε τα στοιχεία σας για να συνδεθείτε στο διαχειριστκό.
            </Typography>
          </div>
          <div className='space-y-4'>
            <Input
              defaultValue={state.data.email}
              placeholder='Email διαχειριστή'
              icon={<MailIcon />}
              name='email'
              type='email'
              autoComplete='username'
              error={state?.errors.email}
              disabled={isPending}
            />
            <Input
              defaultValue={state.data.password}
              placeholder='Κωδικός πρόσβασης'
              icon={<KeySquareIcon />}
              name='password'
              type='password'
              error={state?.errors.password}
              disabled={isPending}
            />
          </div>
          <div className='flex justify-between'>
            <Button
              asChild
              disabled={isPending}
            >
              <Link href='/'>
                <HouseIcon size={20} />
                <span>Αρχική</span>
              </Link>
            </Button>
            <Button
              isLoading={isPending}
              disabled={isPending}
            >
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
