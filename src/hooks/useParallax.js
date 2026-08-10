import { useScroll, useTransform } from 'framer-motion'

/**
 * Parallax vertical sutil: sigue el progreso de scroll durante todo el paso
 * de la card por el viewport (no solo la entrada), moviendo el contenido
 * unos pocos px más lento que el resto. Mismo ref que useScrollEntrance,
 * pero con su propio rango — está pensado para envolver la imagen interna,
 * no la card entera.
 */
export function useParallax(ref, range = 14) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return useTransform(scrollYProgress, [0, 1], [-range, range])
}
