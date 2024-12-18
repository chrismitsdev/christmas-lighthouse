import * as React from 'react'
import {ChevronUpIcon, ChevronDownIcon} from 'lucide-react'
import {type CategoryWithProducts} from '@/src/db/menu'
import {cn, formatCurrency} from '@/src/lib/utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/src/components/ui/collapsible'
import {Typography} from '@/src/components/ui/typography'
import {Badge} from '@/src/components/ui/badge'
import {Separator} from '@/src/components/ui/separator'

type CategoryProps = {
  category: CategoryWithProducts
  collapsible?: boolean
}

function Category({category, collapsible = false}: CategoryProps) {
  if (collapsible) {
    return (
      <Collapsible>
        <Card>
          <CollapsibleTrigger className='relative w-full group'>
            <CardHeader
              className={cn(
                'group-data-closed:border-b-transparent group-data-open:duration-500 group-data-closed:active:bg-brand-gray-12'
              )}
            >
              <CardTitle className='flex items-center gap-2'>
                {category.icon}
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <span className='absolute w-6 h-6 right-4 top-1/2 -translate-y-1/2'>
              <ChevronUpIcon
                size={16}
                className='absolute -top-0.5 left-1/2 -translate-x-1/2 group-data-open:translate-y-2 group-data-open:duration-500 transition'
              />
              <ChevronDownIcon
                size={16}
                className='absolute -bottom-0.5 left-1/2 -translate-x-1/2 group-data-open:-translate-y-2 group-data-open:duration-500 transition'
              />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              {category.products.map(function (product, i, a) {
                return (
                  <React.Fragment key={product.name}>
                    <div className='grid grid-cols-[1fr_auto] gap-y-2 gap-x-1'>
                      <Typography
                        className='col-span-1 sm:text-base'
                        variant='small'
                      >
                        {product.name}
                      </Typography>
                      {product.description !== null && (
                        <div className='flex flex-wrap gap-1.5 row-start-2'>
                          {product.description.map(function (desc) {
                            return (
                              <Badge
                                key={desc}
                                variant='secondary'
                              >
                                {desc}
                              </Badge>
                            )
                          })}
                        </div>
                      )}
                      <Typography
                        className='sm:text-base'
                        variant='small'
                      >
                        {formatCurrency(product.price)}
                      </Typography>
                    </div>

                    {i !== a.length - 1 && <Separator />}
                  </React.Fragment>
                )
              })}
            </CardContent>

            {category.notes !== null && (
              <CardFooter>
                <ul className='pl-4 space-y-2 list-disc'>
                  {category.notes.map(function (note) {
                    return (
                      <li key={note}>
                        <Typography variant='small'>{note}</Typography>
                      </li>
                    )
                  })}
                </ul>
              </CardFooter>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {category.icon}
          <span>{category?.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {category.products.map(function (product, i, a) {
          return (
            <React.Fragment key={product.name}>
              <div className='grid grid-cols-[1fr_auto] gap-y-2 gap-x-1'>
                <Typography
                  className='col-span-1 sm:text-base'
                  variant='small'
                >
                  {product.name}
                </Typography>
                {product.description !== null && (
                  <div className='flex flex-wrap gap-1.5 row-start-2'>
                    {product.description.map(function (desc) {
                      return (
                        <Badge
                          key={desc}
                          variant='secondary'
                        >
                          {desc}
                        </Badge>
                      )
                    })}
                  </div>
                )}
                <Typography
                  className='sm:text-base'
                  variant='small'
                >
                  {formatCurrency(product.price)}
                </Typography>
              </div>

              {i !== a.length - 1 && <Separator />}
            </React.Fragment>
          )
        })}
      </CardContent>

      {category.notes !== null && (
        <CardFooter>
          <ul className='pl-4 space-y-2 list-disc'>
            {category.notes.map(function (note) {
              return (
                <li key={note}>
                  <Typography variant='small'>{note}</Typography>
                </li>
              )
            })}
          </ul>
        </CardFooter>
      )}
    </Card>
  )
}

Category.displayName = 'Category'

export {Category}
