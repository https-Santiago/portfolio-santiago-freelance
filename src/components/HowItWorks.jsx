import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ICONS = [
  (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
]

const T = {
  es: {
    label: 'El proceso',
    title: 'Así funciona.',
    steps: [
      {
        title: 'Compartís tu material',
        desc: 'Nos compartís el link de tu Google Drive con los videos crudos. Sin instalaciones, sin complicaciones.',
      },
      {
        title: 'Editamos con precisión',
        desc: 'Aplicamos transiciones, música, subtítulos y todo lo del pack elegido. Cada corte tiene un propósito.',
      },
      {
        title: 'Recibís y publicás',
        desc: 'El tiempo de entrega varía según la cantidad de videos. Si algo no te convence, lo ajustamos.',
      },
    ],
    footer: 'Tiempo de entrega: varía según cantidad de videos · Correcciones: 1 en Pack Orbit · 2 en el resto',
    footerHighlight1: 'varía según cantidad de videos',
    footerHighlight2: '1 en Pack Orbit · 2 en el resto',
  },
  en: {
    label: 'The process',
    title: 'How it works.',
    steps: [
      {
        title: 'Share your footage',
        desc: 'Share the link to your Google Drive with your raw videos. No installations, no complications.',
      },
      {
        title: 'We edit with precision',
        desc: 'We apply transitions, music, subtitles and everything in the chosen pack. Every cut has a purpose.',
      },
      {
        title: 'Receive and publish',
        desc: "Delivery time varies by number of videos. If you're not satisfied with the result, we'll adjust it.",
      },
    ],
    footer: 'Delivery time: varies by number of videos · Revisions: 1 in Pack Orbit · 2 in the rest',
    footerHighlight1: 'varies by number of videos',
    footerHighlight2: '1 in Pack Orbit · 2 in the rest',
  },
}

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#ff6b00] text-sm tracking-[4px] uppercase mb-3 font-medium"
          >
            {t.label}
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-orbitron font-black text-4xl md:text-5xl text-white"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.title}
            </motion.h2>
          </div>
          <motion.div
            className="mt-5 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'linear-gradient(to right, #ff6b00, rgba(126,184,255,0.5), transparent)', maxWidth: '180px' }}
          />
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">

          {/* Línea conectora — solo desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
            style={{ background: 'linear-gradient(to right, rgba(255,107,0,0.3), rgba(126,184,255,0.3), rgba(255,107,0,0.3))' }}
          />

          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              {/* Ícono con número */}
              <div className="relative mb-6">
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10"
                  style={{
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    color: '#ff6b00',
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,0,0.5)' }}
                  transition={{ duration: 0.2 }}
                >
                  {ICONS[i]}
                </motion.div>
                <span
                  className="absolute -top-2 -right-2 font-orbitron font-black text-xs w-6 h-6 rounded-full flex items-center justify-center z-20"
                  style={{ background: '#ff6b00', color: '#02050d', fontSize: '10px' }}
                >
                  {i + 1}
                </span>
              </div>

              <h3 className="font-orbitron font-bold text-lg text-white mb-3 tracking-wide">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs md:max-w-none">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-14 text-center md:text-left"
        >
          <p className="text-white/30 text-sm">
            {lang === 'es'
              ? <>Tiempo de entrega: <span className="text-white/60">varía según cantidad de videos</span> · Correcciones: <span className="text-white/60">1 en Pack Orbit · 2 en el resto</span></>
              : <>Delivery time: <span className="text-white/60">varies by number of videos</span> · Revisions: <span className="text-white/60">1 in Pack Orbit · 2 in the rest</span></>
            }
          </p>
        </motion.div>

      </div>
    </section>
  )
}
