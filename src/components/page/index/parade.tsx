import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Parade() {
  return (
    <Section>
      <div className='h-screen flex items-center justify-center border-10 border-cyan-600'>
        <Typography variant='h1'>Parade</Typography>
      </div>
    </Section>
  )
}

Parade.displayName = 'Parade'

export {Parade}
