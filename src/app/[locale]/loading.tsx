import {Section} from '@/src/components/shared/section'
import {LoaderCircle} from 'lucide-react'

export default function Loading() {
  return (
    <Section className='h-full flex items-start justify-center'>
      <LoaderCircle
        className='animate-spin text-secondary h-1/2 w-1/2'
        strokeWidth={1}
      />
    </Section>
  )
}
