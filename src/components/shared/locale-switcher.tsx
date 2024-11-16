'use client'

import * as React from 'react'
import {useLocale} from 'next-intl'
import {usePathname, useRouter} from '@/src/i18n/routing'
import {
  Select,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectValue,
  SelectItem,
  SelectItemText
} from '@/src/components/ui/select'
import {GreekFlagIcon} from '@/src/components/icons/flags/greek-flag-icon'
import {EnglandFlagIcon} from 'src/components/icons/flags/england-flag-icon'
import {Spinner} from '@/src/components/ui/spinner'

type LocaleSwitcherProps = {
  grLabel: string
  enLabel: string
}

function LocaleSwitcher({grLabel, enLabel}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(locale: Locale) {
    router.replace(pathname, {locale})
  }

  return (
    <Select
      value={locale}
      onValueChange={onSelectChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={<Spinner />}>
          {locale === 'el' ? <GreekFlagIcon /> : <EnglandFlagIcon />}
        </SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value='el'>
              <GreekFlagIcon />
              <SelectItemText>{grLabel}</SelectItemText>
            </SelectItem>
            <SelectItem value='en'>
              <EnglandFlagIcon />
              <SelectItemText>{enLabel}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
