import {type LucideIcon, TriangleAlertIcon} from 'lucide-react'
import {useId} from 'react'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface TextareaProps
  extends Omit<
    React.ComponentPropsWithRef<'textarea'>,
    'aria-invalid' | 'aria-describedby'
  > {
  icon?: React.ReactElement<LucideIcon>
  error?: string
}

function Textarea({
  className,
  rows = 1,
  icon,
  error,
  disabled = false,
  ...props
}: TextareaProps) {
  const errorId = useId()

  return (
    <div
      className='relative group'
      {...(disabled && {'data-disabled': 'true'})}
    >
      <textarea
        className={cn(
          'px-4 py-3.75 block w-full bg-brand-gray-12 text-app-foreground font-semibold border border-brand-gray-12 rounded outline-none duration-300 placeholder:text-sm placeholder:text-brand-gray-11 group-focus-within:border-brand-gray-11 disabled:opacity-30 sm:placeholder:text-base',
          'resize-none',
          icon && 'pl-10 sm:pl-12',
          error && 'border-red-300 group-focus-within:border-red-300',
          className
        )}
        rows={rows}
        disabled={disabled}
        {...props}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
      />
      {icon && (
        <span
          aria-hidden='true'
          className='absolute left-3 top-5 text-brand-gray-11 group-focus-within:text-brand-gray-1 duration-300 [&>svg]:size-4 sm:left-4 sm:[&>svg]:size-5 sm:top-4.5'
        >
          {icon}
        </span>
      )}
      <div
        id={errorId}
        className='mt-0.5 min-h-4 flex gap-1 text-red-300 leading-4'
        role='alert'
      >
        {error && (
          <>
            <TriangleAlertIcon className='w-3 h-lh shrink-0' />
            <Typography variant='mini'>{error}</Typography>
          </>
        )}
      </div>
    </div>
  )
}

Textarea.displayName = 'Textarea'

export {Textarea}
