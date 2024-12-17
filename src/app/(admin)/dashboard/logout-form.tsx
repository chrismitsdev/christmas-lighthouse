import {logoutAction} from '@/src/app/(admin)/dashboard/actions'
import {SubmitActionButton} from '@/src/components/shared/submit-action-button'

function LogoutForm(props: React.PropsWithChildren) {
  return (
    <form
      id='logout-form'
      action={logoutAction}
    >
      <SubmitActionButton
        className='w-full justify-start'
        {...props}
      />
    </form>
  )
}

LogoutForm.displayName = 'LogoutForm'

export {LogoutForm}
