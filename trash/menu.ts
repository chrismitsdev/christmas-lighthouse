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
import {db} from '@/src/db'
import {categoryTable} from '@/src/db/schema'
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
export type RawCategory = InferOutput<typeof NeonCategorySchema>
export type Category = RawCategory & {
  link: string
  icon?: React.ReactElement
}

export async function getLocalizedCategories(
  locale: Locale
): Promise<Category[]> {
  const query = await db
    .select({jsonColumn: categoryTable[locale]})
    .from(categoryTable)

  if (query.length < 1) {
    throw new Error(
      'Could not retrieve localized categories (getLocalizedCategories function)'
    )
  }

  const result = safeParse(NeonCategoriesSchema, query[0].jsonColumn)

  if (!result.success) {
    throw new Error('Db schema not validated')
  }

  return Object.entries(result.output).map(function (
    [categoryName, categoryValue],
    i
  ) {
    return {
      link: categoryName.toLowerCase().replace('-', ''),
      icon: React.createElement(categoryIcons[i]),
      ...categoryValue
    }
  })
}

export async function getCategories() {
  const query = await db.select().from(categoryTable)

  if (query.length < 1) {
    throw new Error('Could not retrieve categories (getCategories function)')
  }

  const elResult = safeParse(NeonCategoriesSchema, query[0].el)
  const enResult = safeParse(NeonCategoriesSchema, query[0].en)

  if (!elResult.success || !enResult.success) {
    throw new Error('Db schema not validated')
  }

  const result = {
    el: elResult.output,
    en: enResult.output
  }

  return result
}
