import * as React from 'react'
import {ChevronsUpDownIcon, ChevronsDownUpIcon} from 'lucide-react'
import {cn} from '@/src/lib/utils'
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
  category: Category
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
                {category?.icon}
                <span>{category?.title}</span>
              </CardTitle>
            </CardHeader>
            <span className='absolute right-4 top-1/2 -translate-y-1/2 text-app-foreground/50'>
              <ChevronsUpDownIcon className='group-data-open:hidden' />
              <ChevronsDownUpIcon className='group-data-closed:hidden' />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
                            variant='secondary'
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
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

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
                      variant='secondary'
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
