import '@/src/styles/index.css'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'The Christmas Lighthouse'
}

export default function AdminLayout({children}: React.PropsWithChildren) {
  return (
    <html
      lang='el-GR'
      className={font.className}
    >
      <body>{children}</body>
    </html>
  )
}
