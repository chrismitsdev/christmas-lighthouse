'use client'

import * as React from 'react'
import {type User} from '@/src/db/schema'
import {UserIcon, MailIcon, KeySquareIcon} from 'lucide-react'
import {SendHorizontalIcon} from 'lucide-react'
import {
  type UpdateFormData,
  type UpdateFormErrors,
  updateUserAction
} from '@/src/app/(admin)/dashboard/account/actions'
import {Typography} from '@/src/components/ui/typography'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'
import {Badge} from '@/src/components/ui/badge'

const initialState = {
  data: {} as UpdateFormData,
  errors: {} as UpdateFormErrors
}

function UpdateForm({user}: {user: User}) {
  const updateUserActionWithUserId = updateUserAction.bind(null, user.id)
  const [state, action, isPending] = React.useActionState(
    updateUserActionWithUserId,
    initialState
  )

  return (
    <div className='p-16 relative bg-app-surface border rounded'>
      <div className='space-y-16'>
        <div className='space-y-4'>
          <Typography variant='h4'>
            Πληροφορίες λογαριασμού διαχειριστή
          </Typography>
          <Typography variant='muted'>
            Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγές στα στοιχεία
            λογαριασμού σας.
          </Typography>
        </div>
        <form
          id='update-form'
          action={action}
          noValidate
        >
          <div className='space-y-2'>
            <Input
              name='new_username'
              defaultValue={state?.data.new_username || ''}
              placeholder={`Τρέχων username: ${user.username}`}
              icon={<UserIcon />}
              type='text'
              error={state?.errors.username}
              disabled={isPending}
            />
            <Input
              name='new_email'
              defaultValue={state?.data.new_email || ''}
              placeholder={`Τρέχων email: ${user.email}`}
              icon={<MailIcon />}
              type='email'
              error={state?.errors.email}
              disabled={isPending}
            />
            <Input
              name='new_password'
              defaultValue={state?.data.new_password || ''}
              placeholder='Νέος κωδικός πρόσβασης'
              icon={<KeySquareIcon />}
              type='password'
              error={state?.errors.password}
              disabled={isPending}
            />
          </div>
        </form>
        <div className='flex justify-end'>
          <Button
            form='update-form'
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

UpdateForm.displayName = 'UpdateForm'

export {UpdateForm}
