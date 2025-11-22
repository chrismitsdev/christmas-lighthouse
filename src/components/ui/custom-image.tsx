import Image, {type StaticImageData} from 'next/image'
import {cn} from '@/src/lib/utils'

interface CustomImageProps
  extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
  src: StaticImageData
}

function CustomImage({
  className,
  src,
  alt,
  draggable = false,
  ...props
}: CustomImageProps) {
  return (
    <Image
      // Next.js applies some inline styling when placeholder "data:image/..."
      // "bg-auto" overrides the background-size: cover; inline style bg Next.js
      className={cn('bg-auto!', className)}
      src={src}
      alt={alt}
      draggable={draggable}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        spinner(src.width, src.height)
      )}`}
      {...props}
    />
  )
}

function spinner(w: number, h: number) {
  const cx = w / 2
  const cy = h / 2

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${w}"
      height="${h}"
      fill="none"
    >
      <!-- Canvas background -->
      <rect width="${w}" height="${h}" fill="#1d1f2b" />

      <!-- Centered spinner path -->
      <g transform="translate(${cx - 12}, ${cy - 12})">
        <path
          d="M21 12a9 9 0 1 1-6.219-8.56"
          stroke="#c4c9d9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  `
}

function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}

CustomImage.displayName = 'CustomImage'

export {CustomImage}
