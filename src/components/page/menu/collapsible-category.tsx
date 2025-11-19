import {Fragment} from 'react'
import {type CategoryWithProducts} from '@/src/db/menu'
import {formatCurrency} from '@/src/lib/utils'
import {Typography} from '@/src/components/ui/typography'
import {Badge} from '@/src/components/ui/badge'
import {Separator} from '@/src/components/ui/separator'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/src/components/ui/collapsible'

type Props = {
  category: CategoryWithProducts
}

function CollapsibleCategory({category}: Props) {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <span className='flex items-center gap-2 grow'>
          {category.icon}
          <Typography
            variant='lead'
            className='leading-6'
          >
            {category.title}
          </Typography>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {category.products.map(function (product, i, a) {
          return (
            <Fragment key={product.id}>
              <div className='px-6 py-4 grid grid-cols-[1fr_auto] gap-2'>
                <Typography>{product.name}</Typography>
                <Typography>{formatCurrency(product.price)}</Typography>
                {product.description !== null && (
                  <div className='flex flex-wrap gap-2'>
                    {product.description.map(function (description) {
                      return (
                        <Badge
                          key={description}
                          variant='secondary'
                        >
                          {description}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>

              {i !== a.length - 1 && <Separator className='w-auto mx-6' />}
            </Fragment>
          )
        })}

        {category.notes !== null && (
          <div className='p-6 bg-brand-gray-12'>
            <ul className='pl-4 space-y-2 list-disc'>
              {category.notes.map(function (note) {
                return (
                  <li key={note}>
                    <Typography variant='small'>{note}</Typography>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

CollapsibleCategory.displayName = 'CollapsibleCategory'

export {CollapsibleCategory}
