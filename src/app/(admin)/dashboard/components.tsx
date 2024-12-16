import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  ScrollTextIcon,
  ShoppingBasketIcon,
  UserCogIcon,
  LogOutIcon,
  PlusIcon,
  EditIcon
} from 'lucide-react'
import type {User} from '@/src/db/drizzle/schema'
import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/src/components/ui/sidebar'
import {Typography} from '@/src/components/ui/typography'
import {Badge} from '@/src/components/ui/badge'
import {Separator} from '@/src/components/ui/separator'
import {LogoutForm} from '@/src/app/(admin)/dashboard/logout-form'
import logo from '@/public/logo.png'

function DashboardHeader({
  user,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  user: User
}) {
  return (
    <header
      className='p-4 sticky top-0 z-[1] flex items-center justify-between bg-app-surface-solid border-b sm:p-8'
      {...props}
    >
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
        <Separator
          orientation='vertical'
          className='h-auto self-stretch bg-border-hover'
        />
        <Typography
          variant='h4'
          className='uppercase tracking-wider'
        >
          Διαχειριστικο
        </Typography>
      </div>
      <Badge>
        <span>{user.username}</span>
      </Badge>
    </header>
  )
}

function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Link href='/dashboard'>
            <Image
              src={logo}
              alt='The Christmas Lighthouse logo'
              height={40}
            />
          </Link>
        </SidebarHeader>
        <SidebarMenu className='mt-16 mb-8'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/dashboard/categories'>
                <ScrollTextIcon />
                <span>Κατηγορίες</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/dashboard/products'>
                <ShoppingBasketIcon />
                <span>Προϊόντα</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/dashboard/account'>
                <UserCogIcon />
                <span>Λογαριασμός</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/'>
                <HomeIcon />
                <span>Αρχική</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <LogoutForm>
          <LogOutIcon className='rotate-180' />
          <span>Αποσύνδεση</span>
        </LogoutForm>
      </SidebarContent>
    </Sidebar>
  )
}

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

DashboardHeader.displayName = 'DashboardHeader'
DashboardSidebar.displayName = 'DashboardSidebar'
DashboardPageCard.displayName = 'DashboardPageCard'

export {DashboardHeader, DashboardSidebar, DashboardPageCard}
