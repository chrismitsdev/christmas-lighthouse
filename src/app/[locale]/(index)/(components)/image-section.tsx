import {cn} from '@/src/lib/utils'
import {Section} from '@/src/components/shared/section'

function ImageSection({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Section>) {
  return (
    <Section
      className={cn(
        'bg-[url(/images/section-image.webp)] bg-cover bg-no-repeat bg-position-[top_center]',
        className
      )}
      {...props}
    />
  )
}

ImageSection.displayName = 'ImageSection'

export {ImageSection}
