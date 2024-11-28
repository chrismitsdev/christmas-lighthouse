import * as React from 'react'
import {db} from '@/src/db'
import {categoryTable} from '@/src/db/schema'
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
import {BurgerIcon} from '@/src/components/icons/burger-icon'

const categoryIcons = [
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

export async function getCategories(locale: Locale) {
  const result = await db
    .select({messages: categoryTable[locale]})
    .from(categoryTable)

  const categories = Object.entries(result[0].messages!).map(function (
    [categoryName, categoryValue],
    i
  ) {
    return {
      link: categoryName.toLowerCase().replace('-', ''),
      icon: React.createElement(categoryIcons[i], {
        strokeWidth: 2.2
      }),
      ...categoryValue
    }
  }) as Ctg[]

  return categories
}
