import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function HashScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)

      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return null
}
