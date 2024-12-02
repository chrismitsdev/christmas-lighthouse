import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Skeleton} from '@/src/components/ui/skeleton'

export default function Loading() {
  return (
    <Section>
      <Container>
        <Skeleton className='w-full h-96' />
      </Container>
    </Section>
  )
}
