import {ImageResponse} from 'next/og'
import {getTranslations} from 'next-intl/server'
import {getOpengraphData} from '@/src/lib/get-opengraph-data'

export const alt = 'The Christmas Lighthouse'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image({params}: PageProps<'/[locale]'>) {
  const {locale} = (await params) as Params['params']
  const t = await getTranslations({locale, namespace: 'pages.metadata'})
  const {base64Src, font} = await getOpengraphData()

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          backgroundColor: '#050713',
          color: '#B2B7C7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 48
        }}
      >
        <picture>
          <img
            src={base64Src}
            alt='The Christmas Lighthouse Logo'
            width={350}
          />
        </picture>
        <span>{t('menu-page')}</span>
        <span>The Christmas Lighthouse</span>
      </div>
    ),
    {
      ...size,
      fonts: [{name: 'Manrope', data: font, style: 'normal'}]
    }
  )
}
