import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const SIZE = 520

/**
 * Glow difuminado (color accent) que sigue al cursor con un spring físico.
 * Decorativo: solo en desktop con mouse real, y desactivado si el usuario
 * prefiere menos movimiento.
 */
export default function MouseGlow() {
  const shouldReduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(-SIZE)
  const y = useMotionValue(-SIZE)
  const springX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (shouldReduceMotion) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, x, y])

  if (shouldReduceMotion || !enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[25]"
      style={{
        width: SIZE,
        height: SIZE,
        x: springX,
        y: springY,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 70%)',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  )
}
