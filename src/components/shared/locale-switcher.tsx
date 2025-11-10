'use client'

import {type Locale, useLocale, useTranslations} from 'next-intl'
import {usePathname, useRouter} from '@/src/i18n/navigation'
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

const options = [
  {icon: EnglandFlagIcon, label: 'en'},
  {icon: GreekFlagIcon, label: 'el'}
]

function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('components.localeSwitcher.values')

  function onSelectChange(l: typeof locale) {
    router.replace(pathname, {locale: l})
  }

  return (
    <Select
      value={locale}
      onValueChange={onSelectChange}
    >
      <SelectTrigger
        aria-label='Change locale'
        className='py-2 px-3'
      >
        <SelectValue placeholder={<Spinner />}>
          {locale === 'el' ? <GreekFlagIcon /> : <EnglandFlagIcon />}
        </SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            {options.map(function ({icon: Icon, label}) {
              return (
                <SelectItem
                  key={label}
                  value={label}
                >
                  <Icon />
                  <SelectItemText>{t(label as Locale)}</SelectItemText>
                </SelectItem>
              )
            })}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
