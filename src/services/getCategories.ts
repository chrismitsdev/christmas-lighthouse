import * as React from 'react'
import {getTranslations} from 'next-intl/server'
import Messages from '@/messages/en.json'
import {BurgerIcon} from '@/src/components/icons/burger-icon'
import {
  Coffee,
  Milk,
  CupSoda,
  GlassWater,
  Beer,
  Zap,
  Utensils,
  Pizza,
  SaladIcon,
  Martini,
  Popcorn
} from 'lucide-react'

const uniqueIcons = [
  Coffee,
  CupSoda,
  Milk,
  Zap,
  GlassWater,
  Martini,
  Beer,
  Utensils,
  Pizza,
  BurgerIcon,
  SaladIcon,
  Popcorn
]

export async function getCategories() {
  const t = await getTranslations('Catalog')

  const categories: Category[] = []

  for (const [i, [key, value]] of Object.entries(Messages.Catalog).entries()) {
    const categoryObj: Category = {
      name: value.categoryName.toLowerCase().replace(' ', '-'),
      categoryName: t(`${key as keyof IntlMessages['Catalog']}.categoryName`),
      categoryNotes: value.categoryNote
        ? Object.keys(value.categoryNote).map((k) =>
            t(`${key}.categoryNote.${k}` as never)
          )
        : null,
      categoryProducts: Object.entries(value.products)
        .filter((product) => !product[1].disabled)
        .map(([productName, {description}]) => {
          const placeholder = `${
            key as keyof IntlMessages['Catalog']
          }.products.${productName}`

          return {
            // name: t(`${placeholder}.name` as any),
            name: t(`${placeholder}.name` as never),
            price: t(`${placeholder}.price` as never),
            description: description
              ? Object.keys(description).map((k) =>
                  t(`${placeholder}.description.${k}` as never)
                )
              : null
          }
        }),
      categoryIcon: React.createElement(uniqueIcons[i], {
        strokeWidth: 2.2
      })
    }

    categories.push(categoryObj)
  }

  return categories
}
