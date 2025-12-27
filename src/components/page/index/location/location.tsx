import {Marker} from '@adamscybot/react-leaflet-component-marker'
import type L from 'leaflet'
import type {LatLngTuple} from 'leaflet'
import {MapPinIcon} from 'lucide-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {useCallback} from 'react'
import {MapContainer, Popup, TileLayer} from 'react-leaflet'
import logo from '@/public/shared/logo.png'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const CENTER = [40.84334844866346, 25.87527152454368] satisfies LatLngTuple
const ZOOM = 17

function Location({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.location')

  const handleMarkerRef = useCallback((marker: L.Marker | null) => {
    if (marker) {
      marker.openPopup()
    }
  }, [])

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <div className='p-2 bg-app-surface border border-brand-gray-12 rounded h-130'>
          <MapContainer
            className='w-full h-full'
            center={CENTER}
            zoom={ZOOM}
            attributionControl={false}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              detectRetina
            />
            <Marker
              position={CENTER}
              ref={handleMarkerRef}
              icon={
                <MapPinIcon
                  className='text-brand-gray-12 fill-brand-gray-10'
                  size={32}
                  aria-hidden
                />
              }
            >
              <Popup offset={[0, -6]}>
                <div className='grid grid-cols-[auto_1fr] gap-3'>
                  <Image
                    className='size-14 rounded-full object-cover border border-brand-gold-10'
                    src={logo}
                    alt='The Christmas Lighthouse logo'
                  />
                  <div className='flex flex-col justify-center gap-1'>
                    <PopupLink href='https://www.google.com/maps/dir/?api=1&destination=Yuppii+Luna+Park'>
                      {t('map.location')}
                    </PopupLink>
                    <PopupLink href='tel:+306973433980'>
                      {t('map.phone')}
                    </PopupLink>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Container>
    </Section>
  )
}

function PopupLink({href, children}: React.PropsWithChildren<{href: string}>) {
  return (
    <Typography
      className='underline underline-offset-4'
      variant='small'
      asChild
    >
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    </Typography>
  )
}

Location.displayName = 'Location'
PopupLink.displayName = 'PopupLink'

export default Location
