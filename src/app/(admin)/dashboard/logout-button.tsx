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
      <Button variant='icon-button'>
        <span className='sr-only'>Αποσύνδεση</span>
        <LogOutIcon />
      </Button>
    </form>
  )
}

LogoutButton.displayName = 'LogoutButton'

export {LogoutButton}
