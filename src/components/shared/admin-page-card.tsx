import {Typography} from '@/src/components/ui/typography'

function AdminPageCard({
  title,
  desc,
  children
}: React.PropsWithChildren<{title?: string; desc?: string}>) {
  return (
    <div className='p-4 py-8 min-h-[calc(100vh-128px-73px)] flex flex-col gap-y-6 bg-app-surface border rounded sm:p-16 sm:gap-y-16 sm:min-h-[calc(100vh-128px-105px)]'>
      {(title || desc) && (
        <div className='space-y-4'>
          {title && <Typography variant='h3'>{title}</Typography>}
          {desc && (
            <Typography
              className='leading-6'
              variant='muted'
            >
              {desc}
            </Typography>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

AdminPageCard.displayName = 'AdminPageCard'

export {AdminPageCard}
