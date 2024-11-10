import * as React from 'react'
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

function Category(category: Category) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {category?.icon}
          <span>{category?.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {category?.products.map((product, i, a) => (
          <React.Fragment key={product.name}>
            <div className='grid grid-cols-[1fr_auto] gap-y-2 gap-x-1'>
              <Typography
                variant='small'
                className='col-span-1'
              >
                {product.name}
              </Typography>
              {product.description && (
                <div className='flex flex-wrap gap-1.5 row-start-2'>
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
              <Typography variant='small'>{product.price}</Typography>
            </div>

            {i !== a.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>

      {category?.notes && (
        <CardFooter>
          <ul className='pl-4 space-y-2 list-disc'>
            {category?.notes.map((note) => (
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
