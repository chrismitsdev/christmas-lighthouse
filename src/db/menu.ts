import * as React from 'react'
import {
  type InferOutput,
  objectWithRest,
  object,
  string,
  union,
  array,
  boolean,
  null as null_,
  safeParse
} from 'valibot'
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

const CategorySchema = object({
  title: string(),
  notes: union([array(string()), null_()]),
  products: array(
    object({
      id: string(),
      name: string(),
      description: union([array(string()), null_()]),
      price: string(),
      disabled: boolean()
    })
  )
})

const CategoriesSchema = objectWithRest({}, CategorySchema)

export type Category = InferOutput<typeof CategoriesSchema>

export async function getCategories(locale: Locale) {
  const result = await db
    .select({jsonColumn: categoryTable[locale]})
    .from(categoryTable)

  const parsedResult = safeParse(CategoriesSchema, result[0].jsonColumn)

  if (!parsedResult.success) {
    throw new Error('Db schema not validated')
  }

  return Object.entries(parsedResult.output).map(function (
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
  })
}
