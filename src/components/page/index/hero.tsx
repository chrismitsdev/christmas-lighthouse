import Image from 'next/image'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {
  ScrollArea,
  ScrollViewport,
  ScrollBar
} from '@/src/components/ui/scroll-area'

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: 'Ornella Binni',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80'
  },
  {
    artist: 'Tom Byrom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80'
  },
  {
    artist: 'Vladimir Malyavko',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80'
  }
]

function Hero() {
  return (
    <Section className='pt-0'>
      <div className='h-[calc(100vh-128px)] flex items-center justify-center border-10 border-red-600'>
        {/*<Typography variant='h1'>Hero</Typography>*/}
        <div className='flex flex-col gap-24'>
          <ScrollArea
            className='h-72 w-48 rounded-md border'
            type='always'
          >
            <ScrollViewport>
              <ul>
                {Array.from({length: 40}).map(function (_, i) {
                  return (
                    <Typography
                      key={i}
                      asChild
                    >
                      <li>Tag {i + 1}</li>
                    </Typography>
                  )
                })}
              </ul>
            </ScrollViewport>

            <ScrollBar />
          </ScrollArea>

          <ScrollArea
            className='w-96 rounded-md border whitespace-nowrap'
            type='always'
          >
            <ScrollViewport>
              <div className='flex w-max space-x-4 p-4'>
                {works.map((artwork) => (
                  <figure
                    key={artwork.artist}
                    className='shrink-0'
                  >
                    <div className='overflow-hidden rounded-md'>
                      <Image
                        src={artwork.art}
                        alt={`Photo by ${artwork.artist}`}
                        className='aspect-3/4 h-fit w-fit object-cover'
                        width={300}
                        height={400}
                      />
                    </div>
                    <figcaption className='text-muted-foreground pt-2 text-xs'>
                      Photo by{' '}
                      <span className='text-foreground font-semibold'>
                        {artwork.artist}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </ScrollViewport>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
    </Section>
  )
}

Hero.displayName = 'Hero'

export {Hero}
