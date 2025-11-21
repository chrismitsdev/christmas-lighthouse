import {eq} from 'drizzle-orm'
import {
  BeerIcon,
  CoffeeIcon,
  CupSodaIcon,
  GlassWaterIcon,
  HamburgerIcon,
  MartiniIcon,
  MilkIcon,
  PizzaIcon,
  PopcornIcon,
  SaladIcon,
  UtensilsIcon,
  ZapIcon
} from 'lucide-react'
import type {Locale} from 'next-intl'
import * as React from 'react'
import {
  array,
  boolean,
  null as null_,
  number,
  object,
  safeParse,
  string,
  union
} from 'valibot'
import {db} from '@/src/db/drizzle'
import {
  type Category,
  categoryTable,
  type Product,
  productTable
} from '@/src/db/drizzle/schema'

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
  'energy-drink': ZapIcon,
  spirit: GlassWaterIcon,
  cocktail: MartiniIcon,
  beer: BeerIcon,
  food: UtensilsIcon,
  pizza: PizzaIcon,
  burger: HamburgerIcon,
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

const LocalizedCategoriesSchema = array(
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
export const getLocalizedCategories = React.cache(
  async (locale: Locale): Promise<CategoryWithProducts[]> => {
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

    const result = safeParse(LocalizedCategoriesSchema, query)

    if (!result.success) {
      throw new Error('Invalid query schema (getLocalizedCategories fn)')
    }

    const groupedCategories = result.output.reduce(
      (acc, item) => {
        const categoryId = item.categoryId as keyof typeof iconsMap

        if (!acc[categoryId]) {
          acc[categoryId] = {
            title: item.categoryName,
            notes: item.categoryNotes,
            link: item.categoryId,
            icon:
              categoryId in iconsMap
                ? React.createElement(iconsMap[categoryId])
                : undefined,
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
        acc[categoryId].products.sort(
          (product1, product2) => product1.id - product2.id
        )

        return acc
      },
      {} as Record<string, CategoryWithProducts>
    )

    return Object.values(groupedCategories)
  }
)

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

// CREATE new product
export async function createProduct(
  newProduct: Omit<Product, 'id'>
): Promise<Product> {
  const query = await db.insert(productTable).values(newProduct).returning()

  if (query.length < 1) {
    throw new Error('Could not create new product (createProduct fn)')
  }

  return query[0]
}

// CREATE new category
export async function createCategory(
  newCategory: Omit<Category, 'id'>
): Promise<Category> {
  const query = await db.insert(categoryTable).values(newCategory).returning()

  if (query.length < 1) {
    throw new Error('Could not create new category (createCategory fn)')
  }

  return query[0]
}

// UPDATE single product by product id
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

// UPDATE single category by category id
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

// DELETE single product by product id
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

// DELETE a single category by category id
async function deleteCategory(categoryId: string): Promise<Category> {
  const result = await db
    .delete(categoryTable)
    .where(eq(categoryTable.id, categoryId))
    .returning()

  if (result.length < 1) {
    throw new Error(
      `Could not delete category with ID: ${categoryId} (deleteCategory fn)`
    )
  }

  return result[0]
}

// DELETE single category; optionally, DELETE all associated products
export async function deleteCategoryWithProducts(
  categoryId: string,
  deleteProducts: boolean
): Promise<Category | {category: Category; products: Product[]}> {
  if (deleteProducts) {
    const deleteProductsQuery = await db
      .delete(productTable)
      .where(eq(productTable.categoryId, categoryId))
      .returning()

    if (deleteProductsQuery.length < 1) {
      throw new Error(
        `Could not delete ${categoryId}-related products (deleteCategoryWithProducts fn)`
      )
    }

    const deletedCategory = await deleteCategory(categoryId)

    return {
      category: deletedCategory,
      products: deleteProductsQuery
    }
  }

  const deletedCategory = await deleteCategory(categoryId)

  return deletedCategory
}
