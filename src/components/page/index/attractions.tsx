import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Attractions() {
  return (
    <Section>
      <div className='h-screen flex items-center justify-center border-10 border-green-600'>
        <Typography variant='h1'>Attractions</Typography>
      </div>
    </Section>
  )
}

Attractions.displayName = 'Attractions'

export {Attractions}
