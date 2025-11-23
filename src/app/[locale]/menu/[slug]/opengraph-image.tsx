import {ImageResponse} from 'next/og'
import {getLocalizedCategories} from '@/src/db/menu'
import {getOpengraphData} from '@/src/lib/get-opengraph-data'

export const alt = 'The Christmas Lighthouse'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image({
  params
}: PageProps<'/[locale]/menu/[slug]'>) {
  const {locale, slug} = (await params) as ParamsWithSlug['params']
  const categories = await getLocalizedCategories(locale)
  const category = categories.find((category) => category.link === slug)
  const {base64Src, font} = await getOpengraphData()

  return new ImageResponse(
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
          src={base64Src}
          alt='The Christmas Lighthouse Logo'
          width={350}
        />
      </picture>
      <span>{category?.title}</span>
      <span>The Christmas Lighthouse</span>
    </div>,
    {
      ...size,
      fonts: [{name: 'Manrope', data: font, style: 'normal'}]
    }
  )
}
