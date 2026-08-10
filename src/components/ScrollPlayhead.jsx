import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Barra de progreso de scroll, estilo playhead/render bar de un editor de
 * video. Puramente decorativo — transform only (scaleX), sin listeners
 * propios más allá de los que ya gestiona framer-motion internamente.
 */
export default function ScrollPlayhead() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
