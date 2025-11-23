'use client'

import {GlobeIcon} from 'lucide-react'
import {useLocale} from 'next-intl'
import {useCallback, useTransition} from 'react'
import {EnglishFlagIcon} from '@/src/components/icons/english-flag-icon'
import {GreekFlagIcon} from '@/src/components/icons/greek-flag-icon'
import {IconButton} from '@/src/components/ui/icon-button'
import {usePathname, useRouter} from '@/src/i18n/navigation'
import {routing} from '@/src/i18n/routing'

const flags: Record<
  (typeof routing.locales)[number],
  React.ComponentType<CustomIconProps>
> = {
  en: EnglishFlagIcon,
  el: GreekFlagIcon
}

function LocaleCycle(props: React.ComponentPropsWithRef<typeof IconButton>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const locales = routing.locales

  const handleLocaleCycle = useCallback(() => {
    const nextLocale = locales[(locales.indexOf(locale) + 1) % locales.length]

    startTransition(() => {
      router.replace(pathname, {locale: nextLocale})
    })
  }, [locale, locales, pathname, router])

  return (
    <IconButton
      onClick={handleLocaleCycle}
      isLoading={isPending}
      aria-label={`Switch language. Current language: ${locale}`}
      {...props}
    >
      {!isPending && <LocaleFlag locale={locale} />}
      <GlobeIcon />
    </IconButton>
  )
}

function LocaleFlag({
  locale,
  ...props
}: CustomIconProps & {
  locale: ReturnType<typeof useLocale>
}) {
  const FlagIcon = flags[locale]

  return (
    <span className='absolute -top-2 -left-2 border-2 border-app-background rounded-full'>
      <FlagIcon
        size={16}
        {...props}
      />
    </span>
  )
}

LocaleCycle.displayName = 'LocaleCycle'
LocaleFlag.displayName = 'LocaleFlag'

export {LocaleCycle}
