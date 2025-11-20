import {Fragment} from 'react'
import {Badge} from '@/src/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import type {CategoryWithProducts} from '@/src/db/menu'
import {formatCurrency} from '@/src/lib/utils'

function CollapsibleCategory({category}: {category: CategoryWithProducts}) {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <span className='flex items-center gap-2 grow'>
          {category.icon}
          <Typography
            className='leading-6'
            variant='lead'
          >
            {category.title}
          </Typography>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
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

        {category.notes !== null && (
          <div className='p-6 bg-brand-gray-12'>
            <ul className='pl-4 space-y-2 list-disc'>
              {category.notes.map((note) => (
                <li key={note}>
                  <Typography variant='small'>{note}</Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

CollapsibleCategory.displayName = 'CollapsibleCategory'

export {CollapsibleCategory}
