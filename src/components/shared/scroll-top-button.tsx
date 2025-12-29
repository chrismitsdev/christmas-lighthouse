'use client'

import {ChevronUpIcon} from 'lucide-react'
import {useEffect, useState} from 'react'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const SCROLL_THRESHOLD = 320

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    }
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility, {passive: true})
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!mounted) return null

  return (
    <IconButton
      className={cn(
        'fixed bottom-4 right-4 translate-y-14 bg-brand-gold-12 pointer-events-none hover:bg-brand-gold-11',
        isVisible && 'translate-y-0 pointer-events-auto'
      )}
      type='button'
      aria-label='Scroll to top'
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    >
      <ChevronUpIcon />
    </IconButton>
  )
}

ScrollTopButton.displayName = 'ScrollTopButton'

export {ScrollTopButton}
