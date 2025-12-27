'use client'

import {ChevronUpIcon} from 'lucide-react'
import {useEffect, useState} from 'react'
import {IconButton} from '@/src/components/ui/icon-button'
import {cn} from '@/src/lib/utils'

const SCROLL_THRESHOLD = 120

function ScrollTopButton() {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    function handleShowScrollTop() {
      setShow(window.scrollY > SCROLL_THRESHOLD)
    }

    handleShowScrollTop()

    document.addEventListener('scroll', handleShowScrollTop, {passive: true})
    return () => document.removeEventListener('scroll', handleShowScrollTop)
  }, [])

  function handleScrollTopClick() {
    window.scrollTo({top: 0})
  }

  return (
    <IconButton
      className={cn(
        'fixed bottom-4 right-4 translate-y-14 bg-brand-gold-12 hover:bg-brand-gold-11',
        show && 'translate-y-0'
      )}
      aria-label='Scroll to top'
      type='button'
      onClick={handleScrollTopClick}
    >
      <ChevronUpIcon />
    </IconButton>
  )
}

ScrollTopButton.displayName = 'ScrollTopButton'

export {ScrollTopButton}
