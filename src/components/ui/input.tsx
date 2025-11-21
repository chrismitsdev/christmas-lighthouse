'use client'

import {EyeIcon, EyeOffIcon, type LucideIcon} from 'lucide-react'
import {useState} from 'react'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ReactElement<LucideIcon>
  error?: string
  noErrorMessages?: boolean
}

function Input({
  className,
  type = 'text',
  disabled = false,
  icon,
  error,
  noErrorMessages = false,
  ...props
}: InputProps) {
  const [passVisible, setPassVisible] = useState(false)
  const isPasswordType = type === 'password'
  const isNumberType = type === 'number'

  return (
    <div
      className={cn(!noErrorMessages && 'min-h-[74px]')}
      {...(disabled ? {'data-disabled': disabled} : {})}
    >
      <div className='relative group'>
        <input
          className={cn(
            'p-4 w-full bg-app-surface text-brand-gray-1 border border-brand-gray-12 rounded outline-none placeholder:text-sm placeholder:text-app-foreground/25 group-focus-within:bg-brand-gray-12 group-focus-within:border-border-hover duration-300 sm:placeholder:text-base disabled:opacity-30',
            icon && 'pl-8 sm:pl-12',
            isPasswordType && 'pr-10 sm:pr-12',
            isNumberType &&
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            error && 'border-red-400/50 group-focus-within:border-red-400/50',
            className
          )}
          type={isPasswordType && passVisible ? 'text' : type}
          disabled={disabled}
          {...props}
        />
        {icon && (
          <span
            aria-hidden='true'
            className='absolute left-3 top-1/2 -translate-y-1/2 text-app-foreground/25 group-focus-within:text-brand-gray-1 duration-300 [&>svg]:size-4 sm:left-4 sm:[&>svg]:size-5'
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
      </div>
      {error && (
        <span
          className='block text-[10px] leading-4 text-right text-red-300 tracking-widest'
          aria-live='polite'
        >
          {error}
        </span>
      )}
    </div>
  )
}

Input.displayName = 'Input'

export {Input}
