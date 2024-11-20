'use client'

import * as React from 'react'
import {LogOutIcon} from 'lucide-react'
import {Button} from '@/src/components/ui/button'
import {logoutAction} from '@/src/app/(admin)/dashboard/actions'

const initialState = {
  message: ''
}

function LogoutButton() {
  const [, action] = React.useActionState(logoutAction, initialState)

  return (
    <form
      className='mt-auto'
      action={action}
    >
      <Button
        variant='danger'
        className='w-full'
      >
        <LogOutIcon className='rotate-180' />
        <span>Αποσύνδεση</span>
      </Button>
    </form>
  )
}

LogoutButton.displayName = 'LogoutButton'

export {LogoutButton}
