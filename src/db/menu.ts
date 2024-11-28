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

const NeonProductSchema = object({
  id: string(),
  name: string(),
  description: union([array(string()), null_()]),
  price: string(),
  disabled: boolean()
})
const NeonCategorySchema = object({
  title: string(),
  notes: union([array(string()), null_()]),
  products: array(NeonProductSchema)
})
const NeonCategoriesSchema = objectWithRest({}, NeonCategorySchema)

export type Product = InferOutput<typeof NeonProductSchema>
export type Category = InferOutput<typeof NeonCategorySchema> & {
  link: string
  icon?: React.ReactElement
}

export async function getCategories(locale: Locale): Promise<Category[]> {
  const dbResult = await db
    .select({jsonColumn: categoryTable[locale]})
    .from(categoryTable)
  const result = safeParse(NeonCategoriesSchema, dbResult[0].jsonColumn)

  if (!result.success) {
    throw new Error('Db schema not validated')
  }

  return Object.entries(result.output).map(function (
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
