import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function About() {
  return (
    <Section>
      <div className='h-screen flex items-center justify-center border-10 border-blue-600'>
        <Typography variant='h1'>About</Typography>
      </div>
    </Section>
  )
}

About.displayName = 'About'

export {About}
