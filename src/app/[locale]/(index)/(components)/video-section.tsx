import {Section} from '@/src/components/shared/section'
import {TriangleAlertIcon} from 'lucide-react'
import {Typography} from '@/src/components/ui/typography'

function VideoSection() {
  return (
    <Section className='py-0'>
      <div className='relative h-svh'>
        <div className='absolute inset-0  bg-black/40' />
        <video
          className='w-full h-full object-cover'
          preload='none'
          playsInline
          autoPlay
          muted
          loop
        >
          <source
            src='/videos/xmas-parade-video.mp4'
            type='video/mp4'
          />
          <VideoFallback />
        </video>
      </div>
    </Section>
  )
}

function VideoFallback() {
  return (
    <div className='h-full w-full relative z-1 flex flex-col gap-y-4 items-center justify-center'>
      <TriangleAlertIcon size={48} />
      <Typography variant='small'>
        Your browser does not support the video tag.
      </Typography>
    </div>
  )
}

VideoSection.displayName = 'VideoSection'
VideoFallback.displayName = 'VideoFallback'

export {VideoSection}

// import {Section} from '@/src/components/shared/section'
// import {TriangleAlertIcon} from 'lucide-react'
// import {Typography} from '@/src/components/ui/typography'

// function VideoSection() {
//   return (
//     <Section className='py-0'>
//       <div className='relative sm:h-svh'>
//         <div className='absolute inset-0  bg-black/40' />
//         <video
//           className='w-full h-full object-cover'
//           preload='none'
//           playsInline
//           autoPlay
//           muted
//           loop
//         >
//           <source
//             src='/videos/xmas-parade-video.mp4'
//             type='video/mp4'
//           />
//           <VideoFallback />
//         </video>
//       </div>
//     </Section>
//   )
// }

// function VideoFallback() {
//   return (
//     <div className='h-full w-full relative z-1 flex flex-col gap-y-4 items-center justify-center'>
//       <TriangleAlertIcon size={48} />
//       <Typography variant='small'>
//         Your browser does not support the video tag.
//       </Typography>
//     </div>
//   )
// }

// VideoSection.displayName = 'VideoSection'
// VideoFallback.displayName = 'VideoFallback'

// export {VideoSection}
