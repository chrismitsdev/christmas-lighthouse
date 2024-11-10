import * as React from 'react'
import type {Metadata} from 'next'
import {setRequestLocale, getTranslations} from 'next-intl/server'
import {getCategories} from '@/src/services/getCategories'
import {formatCurrency} from '@/src/lib/utils'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'
import {Badge} from '@/src/components/ui/badge'
import {Separator} from '@/src/components/ui/separator'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.metadata')

  return {
    title: `${t('index')} | The Christmas Lighthouse`
  }
}

export default async function CategoriesPage({params}: AsyncParamsLocale) {
  setRequestLocale((await params).locale)
  const categories = await getCategories()

  return (
    <Container>
      <Section>
        {categories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                {category.icon}
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {category.products.map((product, i, a) => (
                <React.Fragment key={product.name}>
                  <div className='grid grid-cols-[1fr_auto] gap-y-2 gap-x-1'>
                    <Typography
                      variant='small'
                      className='col-span-1'
                    >
                      {product.name}
                    </Typography>
                    {product.description && (
                      <div className='flex flex-wrap gap-1.5 row-start-2 col-span-1'>
                        {product.description.map((desc) => (
                          <Badge
                            key={desc}
                            className='text-sm '
                          >
                            {desc}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Typography
                      variant='small'
                      className='col-start-2'
                    >
                      {formatCurrency(product.price)}
                    </Typography>
                  </div>

                  {i !== a.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>

            {category.notes && (
              <CardFooter>
                <ul className='pl-4 space-y-4 list-disc'>
                  {category.notes.map((note) => (
                    <li key={note}>
                      <Typography variant='small'>{note}</Typography>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            )}
          </Card>
        ))}
      </Section>
    </Container>
  )
}
