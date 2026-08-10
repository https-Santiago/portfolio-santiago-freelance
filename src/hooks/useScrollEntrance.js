import { useScroll, useTransform } from 'framer-motion'

// Rango de scroll durante el cual progresa la entrada: desde que el elemento
// asoma un 8% abajo del viewport, hasta que llega a ~45% de la pantalla.
// Progreso = posición de scroll, no tiempo — si el usuario para de scrollear,
// el valor queda congelado ahí (no sigue solo).
const RANGE = ['start 92%', 'start 55%']

const VARIANTS = ['up', 'scale', 'right']

export function scrollVariantFor(i) {
  return VARIANTS[i % VARIANTS.length]
}

export function useScrollEntrance(ref, variant = 'up') {
  const { scrollYProgress } = useScroll({ target: ref, offset: RANGE })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [24, 0])
  const x = useTransform(scrollYProgress, [0, 1], [48, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  if (variant === 'scale') return { opacity, scale }
  if (variant === 'right') return { opacity, x, y }
  return { opacity, y }
}
