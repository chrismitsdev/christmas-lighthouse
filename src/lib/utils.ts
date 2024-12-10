import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(sleepTime: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, sleepTime))
}

export function formatCurrency(price: number | string) {
  const amount = typeof price === 'string' ? Number.parseFloat(price) : price

  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

export function splitAndTrim(
  str: string | null | undefined | ''
): string[] | null {
  if (!str || str === '') return null

  return str.split(',').map(function (el) {
    return el.trim()
  })
}

export function joinAndSpace(arr: string[] | null): string | null {
  if (!Array.isArray(arr) || arr === null) {
    return null
  }

  return arr.join(', ')
}
