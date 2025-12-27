'use client'

import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  type LucideIcon,
  XIcon
} from 'lucide-react'
import {toast as sonnerToast} from 'sonner'
import {IconButton} from '@/src/components/ui/icon-button'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'

interface ToastProps {
  id: string | number
  title: string
  description: string
  status?: 'default' | 'success' | 'error'
}

const iconsMap: Record<
  NonNullable<ToastProps['status']>,
  React.ReactElement<LucideIcon>
> = {
  default: <InfoIcon className='text-blue-300' />,
  success: <CheckCircleIcon className='text-green-300' />,
  error: <AlertCircleIcon className='text-red-300' />
}

function Toast({id, title, description, status = 'default'}: ToastProps) {
  return (
    <div className='p-6 space-y-1 bg-brand-gray-12 border border-brand-gray-11 text-app-foreground rounded'>
      <div className='flex items-start gap-2'>
        <span
          className='mt-0.5 shrink-0'
          aria-hidden='true'
        >
          {iconsMap[status]}
        </span>
        <Typography
          className={cn(
            'grow',
            status === 'default' && 'text-blue-300',
            status === 'success' && 'text-green-300',
            status === 'error' && 'text-red-300'
          )}
          variant='large'
        >
          {title}
        </Typography>
        <IconButton
          size='sm'
          onClick={() => sonnerToast.dismiss(id)}
        >
          <XIcon />
        </IconButton>
      </div>
      <Typography variant='small'>{description}</Typography>
    </div>
  )
}

export function toast(props: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      {...props}
    />
  ))
}

Toast.displayName = 'Toast'

export {Toast}
