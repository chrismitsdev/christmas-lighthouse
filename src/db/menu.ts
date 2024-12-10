import * as React from 'react'
import {
  object,
  array,
  string,
  number,
  null as null_,
  union,
  boolean,
  safeParse
} from 'valibot'
import {
  CoffeeIcon,
  MilkIcon,
  CupSodaIcon,
  GlassWaterIcon,
  BeerIcon,
  ZapIcon,
  UtensilsIcon,
  PizzaIcon,
  SaladIcon,
  MartiniIcon,
  PopcornIcon
} from 'lucide-react'
import {eq} from 'drizzle-orm'
import {db} from '@/src/db/drizzle'
import {
  type Product,
  type Category,
  categoryTable,
  productTable
} from '@/src/db/drizzle/schema'
import {BurgerIcon} from '@/src/components/icons/burger-icon'

export type CategoryWithProducts = {
  title: string
  notes: string[] | null
  link: string
  icon?: React.ReactNode
  products: {
    id: number
    name: string
    description: string[] | null
    price: number
    active: boolean
  }[]
}

const iconsMap = {
  coffee: CoffeeIcon,
  beverage: CupSodaIcon,
  refreshment: MilkIcon,
  ['energy-drink']: ZapIcon,
  spirit: GlassWaterIcon,
  cocktail: MartiniIcon,
  beer: BeerIcon,
  food: UtensilsIcon,
  pizza: PizzaIcon,
  burger: BurgerIcon,
  salad: SaladIcon,
  snack: PopcornIcon
}

const CategoriesSchema = array(
  object({
    id: string(),
    elName: string(),
    enName: string(),
    elNotes: union([array(string()), null_()]),
    enNotes: union([array(string()), null_()])
  })
)

const ProductSchema = array(
  object({
    id: number(),
    categoryId: string(),
    elName: string(),
    enName: string(),
    price: number(),
    active: boolean(),
    elDescription: union([array(string()), null_()]),
    enDescription: union([array(string()), null_()])
  })
)

const CustomCategoriesSchema = array(
  object({
    categoryId: string(),
    categoryName: string(),
    categoryNotes: union([array(string()), null_()]),
    productId: number(),
    productName: string(),
    productDescription: union([array(string()), null_()]),
    productPrice: number(),
    productActive: boolean()
  })
)

// --- FRONT-FACING ---
// GET localized categories with products
export const getLocalizedCategories = React.cache(async function (
  locale: Locale
): Promise<CategoryWithProducts[]> {
  const query = await db
    .select({
      categoryId: categoryTable.id,
      categoryName: categoryTable[`${locale}Name`],
      categoryNotes: categoryTable[`${locale}Notes`],
      productId: productTable.id,
      productName: productTable[`${locale}Name`],
      productDescription: productTable[`${locale}Description`],
      productPrice: productTable.price,
      productActive: productTable.active
    })
    .from(categoryTable)
    .innerJoin(productTable, eq(categoryTable.id, productTable.categoryId))
    .where(eq(productTable.active, true))

  if (query.length < 1) {
    throw new Error(
      'Could not get localized categories (getLocalizedCategories fn)'
    )
  }

  const result = safeParse(CustomCategoriesSchema, query)

  if (!result.success) {
    throw new Error('Invalid query schema (getLocalizedCategories fn)')
  }

  const groupedCategories = result.output.reduce(
    function (acc, item) {
      const categoryId = item.categoryId as keyof typeof iconsMap

      if (!acc[categoryId]) {
        acc[categoryId] = {
          title: item.categoryName,
          notes: item.categoryNotes,
          link: item.categoryId,
          icon: React.createElement(iconsMap[categoryId]),
          products: []
        }
      }

      if (item.productId !== null && item.productId !== undefined) {
        acc[categoryId].products.push({
          id: item.productId,
          name: item.productName,
          description: item.productDescription,
          price: item.productPrice,
          active: item.productActive
        })
      }

      // Mutation - Sort products array by ascending productId
      acc[categoryId].products.sort(function (product1, product2) {
        return product1.id - product2.id
      })

      return acc
    },
    {} as Record<string, CategoryWithProducts>
  )

  return Object.values(groupedCategories)
})

// export async function getLocalizedCategories(
//   locale: Locale
// ): Promise<CategoryWithProducts[]> {
//   const query = await db
//     .select({
//       categoryId: categoryTable.id,
//       categoryName: categoryTable[`${locale}Name`],
//       categoryNotes: categoryTable[`${locale}Notes`],
//       productId: productTable.id,
//       productName: productTable[`${locale}Name`],
//       productDescription: productTable[`${locale}Description`],
//       productPrice: productTable.price,
//       productActive: productTable.active
//     })
//     .from(categoryTable)
//     .innerJoin(productTable, eq(categoryTable.id, productTable.categoryId))
//     .where(eq(productTable.active, true))

//   if (query.length < 1) {
//     throw new Error(
//       'Could not get localized categories (getLocalizedCategories fn)'
//     )
//   }

//   const result = safeParse(CustomCategoriesSchema, query)

//   if (!result.success) {
//     throw new Error('Invalid query schema (getLocalizedCategories fn)')
//   }

//   const groupedCategories = result.output.reduce(
//     function (acc, item) {
//       const categoryId = item.categoryId as keyof typeof iconsMap

//       if (!acc[categoryId]) {
//         acc[categoryId] = {
//           title: item.categoryName,
//           notes: item.categoryNotes,
//           link: item.categoryId,
//           icon: React.createElement(iconsMap[categoryId]),
//           products: []
//         }
//       }

//       if (item.productId !== null && item.productId !== undefined) {
//         acc[categoryId].products.push({
//           id: item.productId,
//           name: item.productName,
//           description: item.productDescription,
//           price: item.productPrice,
//           active: item.productActive
//         })
//       }

//       // Mutation - Sort products array by ascending productId
//       acc[categoryId].products.sort(function (product1, product2) {
//         return product1.id - product2.id
//       })

//       return acc
//     },
//     {} as Record<string, CategoryWithProducts>
//   )

//   return Object.values(groupedCategories)
// }

// --- BACK-OFFICE ---
// GET all products
export async function getProducts(): Promise<Product[]> {
  const query = await db.select().from(productTable).orderBy(productTable.id)

  if (query.length < 1) {
    throw new Error('Could not get products (getProducts fn)')
  }

  const result = safeParse(ProductSchema, query)

  if (!result.success) {
    throw new Error('Invalid query schema (getProducts fn)')
  }

  return result.output
}

// GET all categories
export async function getCategories(): Promise<Category[]> {
  const query = await db.select().from(categoryTable)

  if (query.length < 1) {
    throw new Error('Could not get categories (getCategories fn)')
  }

  const result = safeParse(CategoriesSchema, query)

  if (!result.success) {
    throw new Error('Invalid query schema (getCategories fn)')
  }

  return result.output
}

// UPDATE single product
export async function updateProduct(
  productId: number,
  updatedProduct: Partial<Product>
): Promise<Product> {
  const query = await db
    .update(productTable)
    .set(updatedProduct)
    .where(eq(productTable.id, productId))
    .returning()

  if (query.length < 1) {
    throw new Error('Could not update product (updateProduct fn)')
  }

  return query[0]
}

// UPDATE single category
export async function updateCategory(
  categoryId: string,
  updatedCategory: Partial<Category>
): Promise<Category> {
  const query = await db
    .update(categoryTable)
    .set(updatedCategory)
    .where(eq(categoryTable.id, categoryId))
    .returning()

  if (query.length < 1) {
    throw new Error('Could not update category (updateCategory fn)')
  }

  return query[0]
}

// DELETE single product
export async function deleteProduct(productId: number): Promise<Product> {
  const query = await db
    .delete(productTable)
    .where(eq(productTable.id, productId))
    .returning()

  if (query.length < 1) {
    throw new Error('Could not delete product (deleteProduct fn)')
  }

  return query[0]
}
