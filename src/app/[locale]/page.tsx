import {setRequestLocale} from 'next-intl/server'
import {Container} from '@/src/components/shared/container'

export default async function IndexPage({params}: AsyncParamsLocale) {
  setRequestLocale((await params).locale)

  return (
    <Container>
      <div className='p-4'>{'Index page'}</div>
    </Container>
  )
}
