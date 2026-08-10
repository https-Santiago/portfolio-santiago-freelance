import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePointerFine } from '../hooks/usePointerFine'

// Pocas partículas, chicas, bajo alpha — a propósito lo opuesto del glow
// que se rechazó: nada de una forma grande siguiendo al cursor, solo puntos
// sueltos que derivan solos y se apartan un poco cuando el mouse se acerca.
const COUNT = 34
const COLORS = ['#a78bfa', '#7c3aed', '#f0f0f0']
const REPEL_RADIUS = 130
const REPEL_STRENGTH = 0.6

export default function ParticleField() {
  const canvasRef = useRef(null)
  const pointerFine = usePointerFine()
  const shouldReduceMotion = useReducedMotion()
  const enabled = pointerFine && !shouldReduceMotion

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight
    let raf

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: width / 2, y: height / 2, active: false }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true }
    const onLeave = () => { mouse.active = false }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    let visible = document.visibilityState === 'visible'
    const onVis = () => { visible = document.visibilityState === 'visible' }
    document.addEventListener('visibilitychange', onVis)

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: 1 + Math.random() * 1.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.15 + Math.random() * 0.2,
    }))

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[30]"
    />
  )
}
