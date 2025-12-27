import 'leaflet/dist/leaflet.css'
import type {LatLngTuple} from 'leaflet'
import {useTranslations} from 'next-intl'
import {MapContainer, TileLayer} from 'react-leaflet'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'

const coords = [40.84334844866346, 25.87527152454368] satisfies LatLngTuple

function Location({id}: {id: string}) {
  const t = useTranslations('pages.index.sections.location')

  return (
    <Section
      id={id}
      title={t('section-header.title')}
      description={t('section-header.description')}
    >
      <Container>
        <div className='p-2 bg-app-surface border border-brand-gray-12 rounded'>
          <MapContainer
            className='w-full h-96'
            attributionControl={false}
            center={coords}
            zoom={17}
            scrollWheelZoom={false}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </MapContainer>
        </div>
      </Container>
    </Section>
  )
}

Location.displayName = 'Location'

export default Location
