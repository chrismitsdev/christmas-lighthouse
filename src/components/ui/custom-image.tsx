import Image, {type StaticImageData} from 'next/image'

interface CustomImageProps
  extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
  src: StaticImageData
}

function CustomImage({
  src,
  alt,
  draggable = false,
  ...props
}: CustomImageProps) {
  return (
    <Image
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
  const containerSize = Math.min(w, h)
  const scale = (containerSize * 0.5) / 24

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${w}"
      height="${h}"
      fill="none"
    >
      <!-- Canvas background -->
      <rect width="${w}" height="${h}" fill="#1d1f2b" />

      <!-- Scaled & centered spinner path -->
      <g
        transform="translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)"
      >
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

// import Image, {type StaticImageData} from 'next/image'

// interface CustomImageProps
//   extends Omit<React.ComponentPropsWithRef<typeof Image>, 'src'> {
//   src: StaticImageData
// }

// function CustomImage({
//   src,
//   alt,
//   draggable = false,
//   width,
//   height,
//   ...props
// }: CustomImageProps) {
//   // Use rendered dimensions if provided, fallback to source dimensions
//   const placeholderWidth = width || src.width
//   const placeholderHeight = height || src.height

//   return (
//     <Image
//       src={src}
//       alt={alt}
//       width={width}
//       height={height}
//       draggable={draggable}
//       placeholder={`data:image/svg+xml;base64,${toBase64(
//         spinner(
//           typeof placeholderWidth === 'number' ? placeholderWidth : 48,
//           typeof placeholderHeight === 'number' ? placeholderHeight : 48
//         )
//       )}`}
//       {...props}
//     />
//   )
// }

// function spinner(w: number, h: number, spinnerSize: number = 48) {
//   const cx = w / 2
//   const cy = h / 2
//   const scale = spinnerSize / 24

//   return `
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="${w}"
//       height="${h}"
//       fill="none"
//     >
//       <!-- Canvas background -->
//       <rect width="${w}" height="${h}" fill="#1d1f2b" />

//       <!-- Scaled and centered spinner path -->
//       <g
//         transform="translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)"
//       >
//         <path
//           d="M21 12a9 9 0 1 1-6.219-8.56"
//           stroke="#c4c9d9"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         >
//           <animateTransform
//             attributeName="transform"
//             type="rotate"
//             from="0 12 12"
//             to="360 12 12"
//             dur="1s"
//             repeatCount="indefinite"
//           />
//         </path>
//       </g>
//     </svg>
//   `
// }

// function toBase64(str: string) {
//   return typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)
// }

// CustomImage.displayName = 'CustomImage'

// export {CustomImage}
