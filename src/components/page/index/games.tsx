import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function Games() {
  return (
    <Section>
      <div className='h-screen flex items-center justify-center border-10 border-purple-600'>
        <Typography variant='h1'>Games</Typography>
      </div>
    </Section>
  )
}

Games.displayName = 'Games'

export {Games}
