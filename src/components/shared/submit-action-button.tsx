'use client'

import {useFormStatus} from 'react-dom'
import {Button} from '@/src/components/ui/button'

function SubmitActionButton({
  type = 'submit',
  variant = 'danger',
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const {pending} = useFormStatus()

  return (
    <Button
      type={type}
      variant={variant}
      {...props}
      disabled={pending}
      isLoading={pending}
    />
  )
}

SubmitActionButton.displayName = 'SubmitActionButton'

export {SubmitActionButton}
