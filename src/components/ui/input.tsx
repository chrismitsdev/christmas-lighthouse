'use client'

import {
  EyeIcon,
  EyeOffIcon,
  type LucideIcon,
  TriangleAlertIcon
} from 'lucide-react'
import {useId, useState} from 'react'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface InputProps
  extends Omit<
    React.ComponentPropsWithRef<'input'>,
    'aria-invalid' | 'aria-describedby'
  > {
  icon?: React.ReactElement<LucideIcon>
  error?: string
}

function Input({
  className,
  type = 'text',
  icon,
  error,
  disabled = false,
  ...props
}: InputProps) {
  const [passVisible, setPassVisible] = useState(false)
  const errorId = useId()
  const isPasswordType = type === 'password'
  const isNumberType = type === 'number'

  return (
    <div
      className='relative group'
      {...(disabled && {'data-disabled': 'true'})}
    >
      <input
        className={cn(
          'px-4 py-3.75 block w-full bg-brand-gray-12 text-app-foreground font-semibold border border-brand-gray-12 rounded outline-none duration-300 placeholder:text-sm placeholder:text-brand-gray-11 group-focus-within:border-brand-gray-11 disabled:opacity-30 sm:placeholder:text-base',
          icon && 'pl-10 sm:pl-12',
          error && 'border-red-300 group-focus-within:border-red-300',
          isPasswordType && 'pr-10 sm:pr-12',
          isNumberType &&
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        type={isPasswordType && passVisible ? 'text' : type}
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
      {isPasswordType && (
        <IconButton
          type='button'
          className='absolute right-3 top-1/2 -translate-y-1/2'
          size='sm'
          aria-label={passVisible ? 'Hide password' : 'Show password'}
          aria-pressed={passVisible}
          onClick={() => setPassVisible((v) => !v)}
        >
          {passVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </IconButton>
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

Input.displayName = 'Input'

export {Input}
