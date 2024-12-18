import {ImageResponse} from 'next/og'
import {getLocalizedCategories} from '@/src/db/menu'

type ParamsLocaleSlug = {
  params: {
    locale: Awaited<AsyncParamsLocale['params']>['locale']
    slug: string
  }
}

export const runtime = 'edge'
export const alt = 'The Christmas Lighthouse'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image({
  params: {locale, slug}
}: ParamsLocaleSlug) {
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)
  const assetUrl = new URL('../../../../public/opengraph.png', import.meta.url)
  const assetResponse = await fetch(assetUrl)
  const assetBuffer = await assetResponse.arrayBuffer()
  const base64String = Buffer.from(assetBuffer).toString('base64')
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
        <span>{`${category?.title} | The Christmas Lighthouse`}</span>
      </div>
    ),
    {
      ...size
    }
  )
}
