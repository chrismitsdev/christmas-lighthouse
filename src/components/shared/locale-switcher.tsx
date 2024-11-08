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
import {UsaFlagIcon} from '@/src/components/icons/flags/usa-flag-icon'
import {Spinner} from '@/src/components/ui/spinner'

type LocaleSwitcherProps = {
  gr: string
  en: string
}

function LocaleSwitcher({gr, en}: LocaleSwitcherProps) {
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
          {locale === 'gr' ? <GreekFlagIcon /> : <UsaFlagIcon />}
        </SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value='gr'>
              <GreekFlagIcon />
              <SelectItemText>{gr}</SelectItemText>
            </SelectItem>
            <SelectItem value='en'>
              <UsaFlagIcon />
              <SelectItemText>{en}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
