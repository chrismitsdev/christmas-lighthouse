import Link from 'next/link'
import {PlusIcon, EditIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'

type DashboardPageCardProps = {
  title: string
  desc: string
} & (
  | {isIndex?: true; createHref: string; editHref: string}
  | {isIndex?: false; children: React.ReactNode}
)

function DashboardPageCard(props: DashboardPageCardProps) {
  if (props.isIndex) {
    const {title, desc, createHref, editHref} = props

    return (
      <div className='p-4 py-8 min-h-[calc(100vh-128px-73px)] flex flex-col gap-y-6 bg-app-surface border rounded sm:p-16 sm:gap-y-16 sm:min-h-[calc(100vh-128px-105px)]'>
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
        <div className='min-h-56 flex flex-wrap gap-8'>
          <Link
            href={createHref}
            className='p-8 space-y-4 bg-app-surface border rounded basis-0 grow'
          >
            <div className='h-full flex flex-col justify-center items-center gap-4'>
              <PlusIcon size={32} />
              <Typography variant='h3'>Δημιουργία</Typography>
            </div>
          </Link>
          <Link
            href={editHref}
            className='p-8 space-y-4 bg-app-surface border rounded basis-0 grow'
          >
            <div className='h-full flex flex-col justify-center items-center gap-4'>
              <EditIcon size={32} />
              <Typography variant='h3'>Επεξεργασία</Typography>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  const {title, desc, children} = props as Extract<
    DashboardPageCardProps,
    {isIndex?: false}
  >

  return (
    <div className='p-4 py-8 min-h-[calc(100vh-128px-73px)] flex flex-col gap-y-6 bg-app-surface border rounded sm:p-16 sm:gap-y-16 sm:min-h-[calc(100vh-128px-105px)]'>
      <div className='space-y-4'>
        <Typography variant='h3'>{title}</Typography>
        <Typography
          className='leading-6'
          variant='muted'
        >
          {desc}
        </Typography>
      </div>
      {children}
    </div>
  )
}

DashboardPageCard.displayName = 'DashboardPageCard'

export {DashboardPageCard}
