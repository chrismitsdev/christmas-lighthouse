'use client'

import * as React from 'react'
import {cn} from '@/src/lib/utils'
import {EyeIcon, EyeOffIcon} from 'lucide-react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, icon, type = 'text', ...props}, ref) => {
    const [passVisible, setPassVisible] = React.useState(false)
    const isPasswordType = type === 'password'

    return (
      <div className='relative group'>
        <input
          className={cn(
            'p-4 w-full bg-app-surface text-brand-gray-1 border rounded outline-none placeholder:text-sm placeholder:text-app-foreground/25 group-focus-within:border-border-hover group-focus-within:bg-brand-gray-12 duration-300 sm:placeholder:text-base',
            icon && 'pl-10 sm:pl-12',
            isPasswordType && 'pr-10 sm:pr-12',
            className
          )}
          type={isPasswordType && passVisible ? 'text' : type}
          ref={ref}
          {...props}
        />
        {icon && (
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-app-foreground/25 group-focus-within:text-brand-gray-1 duration-300 sm:left-4'>
            {icon}
          </span>
        )}
        {isPasswordType && (
          <span
            className='p-1 absolute bg-brand-gray-11/25 right-3 top-1/2 -translate-y-1/2 rounded cursor-pointer hover:bg-brand-gray-11/50 sm:right-4'
            title={passVisible ? 'Hide password' : 'Show password'}
            aria-label={passVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passVisible}
            onClick={() => setPassVisible((v) => !v)}
          >
            {passVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export {Input}
