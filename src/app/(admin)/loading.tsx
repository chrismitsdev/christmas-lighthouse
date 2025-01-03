import {Section} from '@/src/components/shared/section'
import {LoaderCircle} from 'lucide-react'

export default function Loading() {
  return (
    <Section className='h-screen flex items-center justify-center sm:min-h-full'>
      <LoaderCircle
        className='w-28 h-28 animate-spin'
        strokeWidth={1}
      />
    </Section>
  )
}
