import Image from 'next/image'
import {cn} from '@/src/lib/utils'
import logo from '@/public/logo.png'

type AsideProps = React.HTMLAttributes<HTMLElement>

function Aside({className, ...props}: AsideProps) {
  return (
    <aside
      className={cn(
        'p-8 flex justify-center bg-app-surface border-r',
        className
      )}
      {...props}
    >
      <Image
        className='h-fit'
        src={logo}
        alt='The Christmas Lighthouse logo'
        height={73}
      />
    </aside>
  )
}

Aside.displayName = 'Aside'

export {Aside}
