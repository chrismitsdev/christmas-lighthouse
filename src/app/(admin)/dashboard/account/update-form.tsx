'use client'

import * as React from 'react'
import {type User} from '@/src/db/schema'
import {SendHorizontalIcon} from 'lucide-react'
// import {
//   type ActionState,
//   updateUserAction
// } from '@/src/app/(admin)/dashboard/account/actions'
import {Typography} from '@/src/components/ui/typography'
import {Input} from '@/src/components/ui/input'
import {Button} from '@/src/components/ui/button'
import {Badge} from '@/src/components/ui/badge'

function UpdateForm({user}: {user: User}) {
  // const [state, action] = React.useActionState(updateUserAction, {
  //   data: {
  //     username: user.username,
  //     email: user.email
  //   } as ActionState['data'],
  //   errors: {} as ActionState['errors']
  // })

  return (
    <div className='p-16 bg-app-surface border rounded'>
      <div className='space-y-16'>
        <div className='flex justify-between items-start'>
          <div className='space-y-4'>
            <Typography variant='h4'>
              Πληροφορίες λογαριασμού διαχειριστή
            </Typography>
            <Typography variant='muted'>
              Σε αυτή τη σελίδα μπορείτε να πραγματοποιήσετε αλλαγες στα
              στοιχεία λογαριασμού σας.
            </Typography>
          </div>
          <Badge>ID: {user.id}</Badge>
        </div>
        <form
          id='update-form'
          // action={action}
        >
          <div className='space-y-2'>
            <Input
              // placeholder={state?.data.username}
              name='username'
              type='text'
              // error={state?.errors.username}
            />
            <Input
              // placeholder={state?.data.email}
              name='email'
              type='email'
              // error={state?.errors.email}
            />
            <Input
              placeholder='Νέος κωδικός πρόσβασης'
              name='password'
              type='password'
              // error={state?.errors.password}
            />
          </div>
        </form>
        <div className='flex justify-end'>
          <Button form='update-form'>
            <SendHorizontalIcon />
            <span>Υποβολή</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

UpdateForm.displayName = 'UpdateForm'

export {UpdateForm}
