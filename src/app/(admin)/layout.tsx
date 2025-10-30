import '@/src/styles/index.css'
import type {Metadata} from 'next'
import {Manrope} from 'next/font/google'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Διαχειριστικό'
}

export default function AdminLayout({children}: LayoutProps<'/'>) {
  return (
    <html
      lang='el-GR'
      className={font.className}
    >
      <body>{children}</body>
    </html>
  )
}
