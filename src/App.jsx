import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import Lenis from 'lenis'
import Stars from './components/Stars'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Packs from './components/Packs'
import ComparisonTable from './components/ComparisonTable'
import ExtraServices from './components/ExtraServices'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Loader from './components/Loader'

/* Barra de progreso de scroll */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left pointer-events-none"
      style={{ scaleX, background: 'linear-gradient(90deg, #ff6b00, #ff9d4d 50%, #7eb8ff)' }}
    />
  )
}

/* Cursor ring simple — solo en dispositivos con mouse */
const hasMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches

function CursorGlow() {
  const x = useMotionValue(-40)
  const y = useMotionValue(-40)
  const springX = useSpring(x, { damping: 30, stiffness: 220 })
  const springY = useSpring(y, { damping: 30, stiffness: 220 })

  useEffect(() => {
    if (!hasMouseDevice) return
    const move = (e) => { x.set(e.clientX - 10); y.set(e.clientY - 10) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!hasMouseDevice) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-5 h-5 rounded-full"
      style={{
        x: springX,
        y: springY,
        border: '1px solid rgba(255,255,255,0.3)',
      }}
    />
  )
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(rafId) }
  }, [])
}

export default function App() {
  useLenis()
  return (
    <LanguageProvider>
    <>
      <Loader />
      <div className="relative min-h-screen">
        <ScrollProgress />
        <CursorGlow />
        <FloatingWhatsApp />
        <Stars />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <HowItWorks />
          <About />
          <Packs />
          <ComparisonTable />
          <ExtraServices />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
    </LanguageProvider>
  )
}
