import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { scrollTo } from '../utils/scrollTo'
import { useLanguage } from '../context/LanguageContext'
import TeamVideoModal from './TeamVideoModal'

const WA_NUMBER = '5493464692656'
const WA_MESSAGE = 'Hola Santiago! Vi tu portfolio y quiero consultarte sobre edición de video.'
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

const MARQUEE_TEXT = 'EDICIÓN · MOTION · SUBTÍTULOS · COLOR GRADING · SONIDO · '
const MARQUEE_CHUNK = MARQUEE_TEXT.repeat(5)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

/* ─── Mouse blob ─────────────────────────────────────────── */
function MouseBlob() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 700,
        height: 700,
        background: 'radial-gradient(circle, rgba(200,255,0,0.13) 0%, transparent 65%)',
        filter: 'blur(90px)',
      }}
    />
  )
}

/* ─── Animated counter ───────────────────────────────────── */
function AnimatedCounter({ to, duration = 1.8 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      setCount(Math.floor(progress * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, to, duration])

  return <span ref={ref}>{count}</span>
}

/* ─── Phone mockup ───────────────────────────────────────── */
function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto"
      style={{ width: 210, aspectRatio: '9/16' }}
    >
      <div
        className="w-full h-full rounded-[2.5rem] border border-base-border bg-base-light overflow-hidden relative"
        style={{ boxShadow: '0 0 80px rgba(200,255,0,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)' }}
      >
        {/* Animated gradient bg */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(160deg, #1a1a1a 0%, #0d1a06 60%, #0a0a0a 100%)',
              'linear-gradient(160deg, #111a06 0%, #1a2a0a 60%, #0a0f05 100%)',
              'linear-gradient(160deg, #1a1a1a 0%, #0d1a06 60%, #0a0a0a 100%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center"
            style={{ background: 'rgba(200,255,0,0.07)' }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="#c8ff00">
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
          </div>
        </div>

        {/* Progress bar + avatar row */}
        <div className="absolute bottom-8 left-5 right-5 space-y-2.5">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              animate={{ width: ['0%', '65%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10" />
            <div className="h-1.5 bg-white/10 rounded-full w-16" />
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1 bg-black/60 rounded-full" />
      </div>
    </motion.div>
  )
}

/* ─── Translations ───────────────────────────────────────── */
const T = {
  es: {
    line1: 'Edito tus videos para que',
    line2: 'no se scrolleen.',
    subtitle: 'Trabajo con marcas y creadores que quieren contenido que realmente retenga. Edición pensada para retención, no para el archivo.',
    cta1: 'Hablemos por WhatsApp',
    cta2: 'Ver mi trabajo',
    metricLabel: 'años editando para\nmarcas y creadores',
    videoLabel: 'Sobre mí',
  },
  en: {
    line1: 'I edit your videos so they',
    line2: "don't get scrolled.",
    subtitle: 'I work with brands and creators who want content that truly retains. Editing built for retention, not the archive.',
    cta1: 'Chat on WhatsApp',
    cta2: 'See my work',
    metricLabel: 'years editing for\nbrands & creators',
    videoLabel: 'About me',
  },
}

/* ─── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [videoOpen, setVideoOpen] = useState(false)
  const { scrollY } = useScroll()
  const contentY       = useTransform(scrollY, [0, 600], [0, -70])
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Mouse blob */}
      <MouseBlob />

      {/* Grid tenue */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(160,190,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(160,190,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Marquee */}
      <div className="absolute top-16 left-0 right-0 overflow-hidden pointer-events-none z-10 border-y border-white/[0.04] py-2">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: '-50%' }}
          initial={{ x: '0%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        >
          <span className="text-white/25 text-[10px] tracking-[5px] uppercase">{MARQUEE_CHUNK}</span>
          <span className="text-white/25 text-[10px] tracking-[5px] uppercase">{MARQUEE_CHUNK}</span>
        </motion.div>
      </div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-36 pb-16"
        style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
      >
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-14 items-center">

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col items-start text-left">

            <motion.h1
              {...fadeUp(0.1)}
              className="font-orbitron font-black leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)' }}
            >
              <span className="text-white block">{t.line1}</span>
              <span className="text-accent block">{t.line2}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.25)}
              className="text-white/50 text-lg max-w-md mb-10 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row gap-3">
              {/* CTA WhatsApp */}
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 text-[#0a0a0a] font-semibold px-8 py-4 rounded-lg tracking-wide text-sm"
                style={{ backgroundColor: '#c8ff00' }}
                initial={{ opacity: 1 }}
                whileHover={{ scale: 1.04, backgroundColor: '#a8d600' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.cta1}
              </motion.a>

              {/* CTA Ver trabajo */}
              <motion.button
                onClick={() => scrollTo('packs')}
                className="inline-flex items-center justify-center border border-white/20 text-white/80 font-medium px-8 py-4 rounded-lg text-sm"
                initial={{ opacity: 1 }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                {t.cta2}
              </motion.button>
            </motion.div>

            {/* Métrica animada */}
            <motion.div {...fadeUp(0.52)} className="mt-10 flex items-center gap-4">
              <span className="text-accent font-orbitron font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                +<AnimatedCounter to={3} duration={1.8} />
              </span>
              <span className="text-white/35 text-sm leading-snug" style={{ whiteSpace: 'pre-line' }}>
                {t.metricLabel}
              </span>
            </motion.div>
          </div>

          {/* ── Columna derecha (solo desktop) ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="hidden lg:flex items-center justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* ── Video button ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <motion.button
            onClick={() => setVideoOpen(true)}
            className="relative w-40 h-40 cursor-pointer"
            whileHover="hover"
            aria-label={lang === 'es' ? 'Ver video de presentación' : 'Watch intro video'}
          >
            {/* Anillo exterior giratorio */}
            <motion.div
              className="absolute inset-0 rounded-full border border-accent/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
            />
            {/* Anillos estáticos */}
            <div className="absolute inset-4 rounded-full border border-accent/10" />
            <div className="absolute inset-8 rounded-full border border-white/5" />

            {/* Pulso hover */}
            <motion.div
              className="absolute inset-[30%] rounded-full"
              style={{ background: 'rgba(200,255,0,0.07)' }}
              variants={{ hover: { scale: 1.15, opacity: 1 }, initial: { scale: 1, opacity: 0 } }}
              initial="initial"
              transition={{ duration: 0.3 }}
            />

            {/* Play central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center border border-accent/35"
                style={{ background: 'rgba(200,255,0,0.09)' }}
                variants={{ hover: { scale: 1.12, borderColor: 'rgba(200,255,0,0.65)', background: 'rgba(200,255,0,0.17)' } }}
                transition={{ duration: 0.25 }}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="#c8ff00">
                  <path d="M5 3.5l10 5.5-10 5.5V3.5z" />
                </svg>
              </motion.div>
            </div>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-white/30 text-xs tracking-[3px] uppercase"
          >
            {t.videoLabel}
          </motion.p>
        </motion.div>
      </motion.div>

      {videoOpen && <TeamVideoModal onClose={() => setVideoOpen(false)} />}
    </section>
  )
}
