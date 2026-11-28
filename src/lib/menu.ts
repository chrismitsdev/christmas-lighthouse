import {getMenu} from '@chrismitsdev/menu-data'
import {
  BeerIcon,
  ClipboardListIcon,
  CoffeeIcon,
  CupSodaIcon,
  GlassWaterIcon,
  HamburgerIcon,
  type LucideIcon,
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

export type CategoryWithProducts = {
  title: string
  notes: string[] | null
  link: string
  icon: React.ReactNode
  products: {
    id: string
    name: string
    variants: string[] | null
    price: number
  }[]
}

const categoryIcons: Record<string, LucideIcon> = {
  coffees: CoffeeIcon,
  beverages: CupSodaIcon,
  refreshments: MilkIcon,
  energy: ZapIcon,
  alcoholic: GlassWaterIcon,
  cocktails: MartiniIcon,
  beers: BeerIcon,
  food: UtensilsIcon,
  pizzas: PizzaIcon,
  burgers: HamburgerIcon,
  salads: SaladIcon,
  snacks: PopcornIcon
}

/** The Christmas Lighthouse menu in `locale`, from @chrismitsdev/menu-data. */
export function getLocalizedCategories(locale: Locale): CategoryWithProducts[] {
  return getMenu('christmas').map((category) => ({
    title: category.name[locale],
    notes: category.notes?.[locale] ?? null,
    link: category.id,
    icon: React.createElement(categoryIcons[category.id] ?? ClipboardListIcon),
    products: category.products.map((product) => ({
      id: product.id,
      name: product.name[locale],
      variants: product.variants?.[locale] ?? null,
      price: product.price
    }))
  }))
}
