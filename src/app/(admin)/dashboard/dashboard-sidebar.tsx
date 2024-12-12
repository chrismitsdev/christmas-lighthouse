import Image from 'next/image'
import Link from 'next/link'
import {
  ScrollTextIcon,
  ShoppingBasketIcon,
  UserCogIcon,
  LogOutIcon
} from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/src/components/ui/sidebar'
import {LogoutForm} from '@/src/app/(admin)/dashboard/logout-form'
import logo from '@/public/logo.png'

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Image
            src={logo}
            alt='The Christmas Lighthouse logo'
            height={40}
          />
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
        </SidebarMenu>
        <LogoutForm>
          <LogOutIcon className='rotate-180' />
          <span>Αποσύνδεση</span>
        </LogoutForm>
      </SidebarContent>
    </Sidebar>
  )
}
