import {cn} from '@/src/lib/utils'

function Spinner({className, size = 16, ...props}: CustomIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('shrink-0 animate-spin', className)}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      role='img'
      aria-label='svg'
      {...props}
    >
      <circle
        className='opacity-30'
        cx='12'
        cy='12'
        r='10'
        strokeWidth='4'
        stroke='currentColor'
      />
      <path
        className='opacity-100'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        fill='currentColor'
      />
    </svg>
  )
}

Spinner.displayName = 'Spinner'

export {Spinner}
