import * as React from 'react'

export default function Template({children}: React.PropsWithChildren) {
  return <main className='animate-appear'>{children}</main>
}
