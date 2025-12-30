import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

// Helper functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(sleepTime: number = 2000) {
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

  return str.split(',').map((el) => el.trim())
}

export function isTodayOrFutureDate(date: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dateToCheck = new Date(date)
  dateToCheck.setHours(0, 0, 0, 0)

  return dateToCheck.getTime() >= today.getTime()
}

export const numberRegex = /^(\d+(\.\d*)?|\.\d+)$/
