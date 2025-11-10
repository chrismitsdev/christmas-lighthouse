import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Contact() {
  return (
    <Section>
      <div className='h-screen flex items-center justify-center border-10 border-yellow-600'>
        <Typography variant='h1'>Contact</Typography>
      </div>
    </Section>
  )
}

Contact.displayName = 'Contact'

export {Contact}
