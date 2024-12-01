import {ImageResponse} from 'next/og'
import {join} from 'path'
import {readFile} from 'node:fs/promises'
import {getTranslations} from 'next-intl/server'

type ParamsLocale = {
  params: {
    locale: Locale
  }
}

export const alt = 'The Christmas Lighthouse'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image({params: {locale}}: ParamsLocale) {
  const t = await getTranslations({locale, namespace: 'pages.metadata'})
  const assetUrl = await readFile(join(process.cwd(), 'o-logo.png'))
  const base64String = Buffer.from(assetUrl).toString('base64')
  const imgSrc = `data:image/png;base64,${base64String}`

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          backgroundColor: 'hsl(235 57% 5%)',
          color: 'hsl(225 18% 74%)',
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
            src={imgSrc}
            alt='The Christmas Lighthouse Logo'
            width={350}
          />
        </picture>
        <span>{`${t('index')} | The Christmas Lighthouse`}</span>
      </div>
    ),
    {
      ...size
    }
  )
}