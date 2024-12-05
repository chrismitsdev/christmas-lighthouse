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
    <form action={action}>
      <Button
        className='w-full justify-start'
        variant='danger'
      >
        <LogOutIcon className='rotate-180' />
        <span>Αποσύνδεση</span>
      </Button>
    </form>
  )
}

LogoutButton.displayName = 'LogoutButton'

export {LogoutButton}
