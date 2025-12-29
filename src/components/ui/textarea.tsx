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
  rows = 4,
  icon,
  error,
  spellCheck = false,
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
          'px-4 py-3.75 block w-full bg-brand-gray-12 text-app-foreground font-semibold border border-brand-gray-12 rounded outline-none duration-300 placeholder:text-brand-gray-11 group-focus-within:border-brand-gray-11 disabled:opacity-30',
          'resize-none',
          icon && 'pl-11',
          error && 'border-red-300 group-focus-within:border-red-300',
          className
        )}
        rows={rows}
        spellCheck={spellCheck}
        disabled={disabled}
        {...props}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
      />
      {icon && (
        <span
          aria-hidden='true'
          className='absolute left-4 top-4.5 [&>svg]:size-5 text-brand-gray-11 group-focus-within:text-brand-gray-1 duration-300'
        >
          {icon}
        </span>
      )}
      <div
        id={errorId}
        className='mt-1 min-h-6 flex items-center text-red-300'
        role='alert'
      >
        {error && (
          <>
            <TriangleAlertIcon className='mr-1 size-4 shrink-0' />
            <Typography className='not-sm:text-sm'>{error}</Typography>
          </>
        )}
      </div>
    </div>
  )
}

Textarea.displayName = 'Textarea'

export {Textarea}
