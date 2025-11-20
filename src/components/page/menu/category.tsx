import {Fragment} from 'react'
import {Badge} from '@/src/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/src/components/ui/card'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import type {CategoryWithProducts} from '@/src/db/menu'
import {formatCurrency} from '@/src/lib/utils'

function Category({category}: {category: CategoryWithProducts}) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='p-6 bg-brand-gray-12'>
        <span className='flex items-center gap-2 grow'>
          {category.icon}
          <Typography
            variant='lead'
            className='leading-6'
          >
            {category.title}
          </Typography>
        </span>
      </CardHeader>
      <CardContent className='p-0'>
        {category.products.map((product, i, a) => (
          <Fragment key={product.id}>
            <div className='px-6 py-4 grid grid-cols-[1fr_auto] gap-2'>
              <Typography variant='small'>{product.name}</Typography>
              <Typography variant='small'>
                {formatCurrency(product.price)}
              </Typography>
              {product.description !== null && (
                <div className='flex flex-wrap gap-2'>
                  {product.description.map((description) => (
                    <Badge
                      key={description}
                      variant='secondary'
                    >
                      {description}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {i !== a.length - 1 && <Separator className='w-auto mx-6' />}
          </Fragment>
        ))}
      </CardContent>

      {category.notes !== null && (
        <CardFooter className='p-6 bg-brand-gray-12'>
          <ul className='pl-4 space-y-2 list-disc'>
            {category.notes.map((note) => (
              <li key={note}>
                <Typography variant='small'>{note}</Typography>
              </li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  )
}

Category.displayName = 'Category'

export {Category}
