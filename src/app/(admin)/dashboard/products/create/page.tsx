import type {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {getCurrentSession} from '@/src/db/session'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {DashboardPageCard} from '@/src/app/(admin)/dashboard/components'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText
} from '@/src/components/ui/select'
import {PlusIcon} from 'lucide-react'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Switch} from '@/src/components/ui/switch'
import {Button} from '@/src/components/ui/button'

export const metadata: Metadata = {
  title: 'Δημιουργία προϊόντων | Διαχειριστικό'
}

export default async function ProductsCreatePage() {
  const {session} = await getCurrentSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <Section>
      <Container>
        <DashboardPageCard
          title='Δημιουργία προϊόντος'
          desc='Σε αυτή τη σελίδα μπορείτε να δημιουργήσετε νέα προϊόντα.'
        >
          <span>ProductsCreatePage</span>
          <form id='create-product-form'>
            <div className='space-y-10'>
              <div className='space-y-2'>
                <div>
                  <Label>Κατηγορία προϊόντος</Label>
                  <Select>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Επιλέξτε κατηγορία' />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectContent>
                        <SelectViewport>
                          <SelectItem value='1'>
                            <SelectItemText>Ρόφημα</SelectItemText>
                          </SelectItem>
                          <SelectItem value='2'>
                            <SelectItemText>Αναψυκτικό</SelectItemText>
                          </SelectItem>
                          <SelectItem value='3'>
                            <SelectItemText>Ενεργειακό ποτό</SelectItemText>
                          </SelectItem>
                        </SelectViewport>
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </div>
                <div>
                  <Label>Ελληνική ονομασία</Label>
                  <Input />
                </div>
                <div>
                  <Label>Αγγλική ονομασία</Label>
                  <Input />
                </div>
                <div>
                  <Label>Τιμή προϊόντος</Label>
                  <Input />
                </div>
                <div>
                  <Label>Ελληνική περιγραφή</Label>
                  <Input />
                </div>
                <div>
                  <Label>Αγγλική περιγραφή</Label>
                  <Input />
                </div>
                <div className='flex items-center gap-4'>
                  <Label>Ενεργοποιημένο προϊόν</Label>
                  <Switch />
                </div>
              </div>
              <div className='flex justify-end'>
                <Button>
                  <span>Δημιουργία</span>
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </form>
        </DashboardPageCard>
      </Container>
    </Section>
  )
}
