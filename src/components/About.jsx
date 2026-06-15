import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const TEAM_BASE = [
  { initials: 'SA', name: 'Santiago', color: '#c8ff00', bg: 'rgba(200,255,0,0.12)', border: 'rgba(200,255,0,0.3)' },
]

const STATS = [
  { es: '+3 años',        en: '+3 years',     desc_es: 'de experiencia',   desc_en: 'of experience'    },
  { es: '+50 proyectos',  en: '+50 projects',  desc_es: 'entregados',       desc_en: 'delivered'        },
  { es: '100% remoto',    en: '100% remote',   desc_es: 'disponibilidad',   desc_en: 'availability'     },
]

const T = {
  es: {
    label: 'Sobre mí',
    title: <>El que está<br />detrás del corte.</>,
    mission: 'Soy editor de video con obsesión por el detalle. Mi objetivo es que tu contenido pare el scroll y haga que la gente vuelva a ver.',
    team: [
      { role: 'Editor de Video', desc: 'Edición creativa enfocada en resultados. Cada corte tiene un por qué.' },
    ],
  },
  en: {
    label: 'About me',
    title: <>The one<br />behind the cut.</>,
    mission: "I'm a video editor obsessed with detail. My goal is to make your content stop the scroll and make people watch again.",
    team: [
      { role: 'Video Editor', desc: 'Creative editing focused on results. Every cut has a reason.' },
    ],
  },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { lang } = useLanguage()
  const t = T[lang]
  const member = TEAM_BASE[0]

  return (
    <section id="nosotros" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="mb-14 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#c8ff00] text-sm tracking-[4px] uppercase mb-3 font-medium"
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
            style={{ background: 'linear-gradient(to right, #c8ff00, rgba(200,255,0,0.3), transparent)', maxWidth: '260px' }}
          />
        </div>

        {/* Card + Stats */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: `0 8px 40px ${member.color}18` }}
            className="rounded-2xl p-6 border glow-card cursor-default w-full lg:max-w-sm flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.3s, border-color 0.3s',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: member.bg, color: member.color, border: `1px solid ${member.border}` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {member.initials}
              </motion.div>
              <div>
                <p className="font-semibold text-white text-lg">{member.name}</p>
                <p className="text-sm tracking-widest uppercase mt-0.5" style={{ color: member.color }}>
                  {t.team[0].role}
                </p>
              </div>
            </div>
            <p className="text-white/45 text-base leading-relaxed">{t.team[0].desc}</p>
          </motion.div>

          {/* Stats + Mission */}
          <div className="flex flex-col gap-8 flex-1">

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl p-4 border border-white/[0.06]"
                  style={{ background: 'rgba(200,255,0,0.04)' }}
                >
                  <p className="font-orbitron font-black text-[#c8ff00] text-lg leading-none mb-1">
                    {lang === 'es' ? s.es : s.en}
                  </p>
                  <p className="text-white/35 text-xs tracking-wide">
                    {lang === 'es' ? s.desc_es : s.desc_en}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative pl-4">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top"
                  style={{ background: 'rgba(200,255,0,0.4)' }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                <p className="text-white/60 text-base leading-relaxed">
                  {t.mission}
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
