import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(function () {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    )

    function onChange() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    mediaQueryList.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return function () {
      return mediaQueryList.removeEventListener('change', onChange)
    }
  }, [])

  return !!isMobile
}
