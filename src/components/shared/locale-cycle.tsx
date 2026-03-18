'use client'

import {type Locale, useLocale} from 'next-intl'
import {useCallback, useTransition} from 'react'
import {EnglishFlagIcon} from '@/src/components/icons/english-flag-icon'
import {GreekFlagIcon} from '@/src/components/icons/greek-flag-icon'
import {IconButton} from '@/src/components/ui/icon-button'
import {usePathname, useRouter} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'

const flags: Record<Locale, React.ComponentType<CustomIconProps>> = {
  en: EnglishFlagIcon,
  el: GreekFlagIcon
}

function LocaleCycle(props: React.ComponentPropsWithRef<typeof IconButton>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const locales = routing.locales
  const Flag = flags[locale]

  const handleLocaleCycle = useCallback(() => {
    const nextLocale = locales[(locales.indexOf(locale) + 1) % locales.length]

    startTransition(() => {
      router.replace(pathname, {locale: nextLocale, scroll: false})
    })
  }, [locale, pathname, router])

  return (
    <IconButton
      aria-label={`Switch language. Current language: ${locale}`}
      isLoading={isPending}
      onClick={handleLocaleCycle}
      {...props}
    >
      <Flag />
    </IconButton>
  )
}

LocaleCycle.displayName = 'LocaleCycle'

export {LocaleCycle}
