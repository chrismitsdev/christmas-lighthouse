'use client'

import * as React from 'react'
import {
  UserIcon,
  MailIcon,
  KeySquareIcon,
  SendHorizontalIcon
} from 'lucide-react'
import {type User} from '@/src/db/drizzle/schema'
import {
  type UpdateAccountFormData,
  type UpdateAccountFormErrors,
  updateAccountAction
} from '@/src/app/(admin)/dashboard/account/actions'
import {Typography} from '@/src/components/ui/typography'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'
import {Badge} from '@/src/components/ui/badge'

const initialState = {
  data: {} as UpdateAccountFormData,
  errors: {} as UpdateAccountFormErrors
}

function UpdateAccountForm({user}: {user: User}) {
  const updateUserActionWithUserId = updateAccountAction.bind(null, user.id)
  const [state, action, isPending] = React.useActionState(
    updateUserActionWithUserId,
    initialState
  )

  return (
    <div className='p-16 relative bg-app-surface border rounded'>
      <div className='space-y-16'>
        <div className='space-y-4'>
          <Typography variant='h3'>Λογαριασμός διαχειριστή</Typography>
          <Typography variant='muted'>
            Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα στοιχεία
            λογαριασμού σας.
          </Typography>
        </div>
        <form
          id='update-account-form'
          action={action}
          noValidate
        >
          <div className='space-y-2'>
            <Input
              name='new_username'
              type='text'
              placeholder={`Τρέχων username: ${user.username}`}
              defaultValue={state?.data.new_username || ''}
              icon={<UserIcon />}
              error={state?.errors.username}
              disabled={isPending}
            />
            <Input
              name='new_email'
              type='email'
              placeholder={`Τρέχων email: ${user.email}`}
              defaultValue={state?.data.new_email || ''}
              icon={<MailIcon />}
              error={state?.errors.email}
              disabled={isPending}
            />
            <Input
              name='new_password'
              type='password'
              placeholder='Νέος κωδικός πρόσβασης'
              defaultValue={state?.data.new_password || ''}
              icon={<KeySquareIcon />}
              error={state?.errors.password}
              disabled={isPending}
            />
          </div>
        </form>
        <div className='flex justify-end'>
          <Button
            form='update-account-form'
            type='submit'
            disabled={isPending}
            isLoading={isPending}
          >
            <span>Υποβολή</span>
            <SendHorizontalIcon />
          </Button>
        </div>
      </div>
      <Badge className='absolute top-4 right-4'>USER ID: {user.id}</Badge>
    </div>
  )
}

UpdateAccountForm.displayName = 'UpdateAccountForm'

export {UpdateAccountForm}
