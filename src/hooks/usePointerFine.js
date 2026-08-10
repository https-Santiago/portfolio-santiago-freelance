import { useEffect, useState } from 'react'

/**
 * true solo en dispositivos con mouse real (no touch). Usado para gatear
 * efectos decorativos caros (blur, glow) que no tienen sentido ni conviene
 * pagar en mobile/touch.
 */
export function usePointerFine() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    const onChange = (e) => setFine(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return fine
}
