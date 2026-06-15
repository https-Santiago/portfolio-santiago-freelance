import { useEffect, useRef } from 'react'

const STAR_DATA = Array.from({ length: 70 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.3 + 0.4,
  minOp: Math.random() * 0.08 + 0.04,
  maxOp: Math.random() * 0.45 + 0.25,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.5 + 0.25,
}))

export default function Stars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId
    let w = window.innerWidth
    let h = window.innerHeight

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (ts) => {
      const t = ts * 0.001
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'
      for (let i = 0; i < STAR_DATA.length; i++) {
        const s = STAR_DATA[i]
        const op = s.minOp + ((Math.sin(t * s.speed + s.phase) + 1) * 0.5) * (s.maxOp - s.minOp)
        ctx.globalAlpha = op
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r, 0, 6.2832)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
