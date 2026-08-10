import { useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Blur ligado a la velocidad de scroll: solo existe mientras la rueda se
 * mueve, vuelve a 0 apenas se frena (no es una animación por tiempo).
 * Pensado para usarse UNA vez por sección y pasar el resultado a las cards
 * (así hay un solo listener de scroll por sección, no uno por card).
 *
 * Desactivado en mobile/touch y con "reducir movimiento" — ahí devuelve
 * siempre 'blur(0px)' sin engancharse al scroll, para no gastar recursos
 * donde el hardware o la preferencia del usuario no lo pide.
 */
export function useScrollBlur({ enabled = true, maxBlur = 1.4 } = {}) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { stiffness: 150, damping: 40, mass: 0.6 })
  const blurPx = useTransform(smoothVelocity, [-3200, 0, 3200], [maxBlur, 0, maxBlur])

  return useTransform(blurPx, (v) => (enabled && !shouldReduceMotion ? `blur(${v.toFixed(2)}px)` : 'blur(0px)'))
}
