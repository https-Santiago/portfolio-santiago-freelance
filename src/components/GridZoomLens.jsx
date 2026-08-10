import { useEffect, useRef, useState } from 'react'
import { usePointerFine } from '../hooks/usePointerFine'

// Lupa real sobre la MISMA grilla que ya tiene el sitio de fondo (blanca,
// muy tenue): no es una grilla distinta pegada al cursor, es una copia
// idéntica del patrón, escalada con transform-origin exactamente en la
// posición del mouse — así el punto bajo el cursor queda fijo y todo
// alrededor "crece" desde ahí, como una lupa de verdad. Enmascarada a un
// círculo chico para que solo se note cerca del cursor.
const CELL = 40
const ZOOM = 2.3
const RADIUS = 140

export default function GridZoomLens() {
  const ref = useRef(null)
  const pointerFine = usePointerFine()
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const enabled = pointerFine && !reduced

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
    }
    const onLeave = () => {
      el.style.setProperty('--mx', '-9999px')
      el.style.setProperty('--my', '-9999px')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[30]"
      style={{
        '--mx': '-9999px',
        '--my': '-9999px',
        backgroundImage:
          'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
        backgroundSize: `${CELL}px ${CELL}px`,
        opacity: 0.3,
        transform: `scale(${ZOOM})`,
        transformOrigin: 'var(--mx) var(--my)',
        WebkitMaskImage: `radial-gradient(${RADIUS / ZOOM}px circle at var(--mx) var(--my), black 0%, black 55%, transparent 100%)`,
        maskImage: `radial-gradient(${RADIUS / ZOOM}px circle at var(--mx) var(--my), black 0%, black 55%, transparent 100%)`,
      }}
    />
  )
}
