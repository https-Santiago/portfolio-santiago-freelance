import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { openSafe } from '../utils/openSafe'

const T = {
  es: {
    label: 'Servicios extra',
    title: 'Más allá de la edición.',
    subtitle: 'Servicios adicionales disponibles a cargo de Santiago.',
    services: [
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        ),
        title: 'Creación de páginas web',
        desc: 'Sitios modernos, rápidos y optimizados para convertir visitantes en clientes.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        ),
        title: 'Automatizaciones con IA',
        desc: 'Procesos automáticos que ahorran tiempo y escalan tu negocio sin esfuerzo manual.',
      },
    ],
    cta: 'Consultar por este servicio',
    waMsg: 'Hola! Vi tu portfolio y quiero consultarte sobre tus servicios adicionales (web/automatizaciones). ¿Hablamos?',
  },
  en: {
    label: 'Extra services',
    title: 'Beyond editing.',
    subtitle: 'Additional services available, handled by Santiago.',
    services: [
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        ),
        title: 'Web development',
        desc: 'Modern, fast websites optimized to turn visitors into clients.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        ),
        title: 'AI automations',
        desc: 'Automated workflows that save time and scale your business without manual effort.',
      },
    ],
    cta: 'Inquire about this service',
    waMsg: 'Hello! I saw your portfolio and would like to ask about your additional services (web/automations). Can we talk?',
  },
}

export default function ExtraServices() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section id="extras" className="relative py-20 px-6">
      {/* Glow de fondo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(126,184,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#7eb8ff] text-sm tracking-[4px] uppercase mb-3 font-medium"
          >
            {t.label}
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.title}
            </motion.h2>
          </div>
          <motion.p
            className="text-white/35 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {t.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6 border"
              style={{
                background: 'rgba(126,184,255,0.04)',
                borderColor: 'rgba(126,184,255,0.14)',
                borderStyle: 'dashed',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(126,184,255,0.1)', color: '#7eb8ff', border: '1px solid rgba(126,184,255,0.2)' }}
              >
                {service.icon}
              </div>
              <h3 className="font-orbitron font-bold text-base text-white mb-2 tracking-wide">
                {service.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => openSafe('https://wa.me/5493464692656?text=' + encodeURIComponent(t.waMsg))}
            className="flex items-center gap-2 border border-[#7eb8ff]/25 text-[#7eb8ff] text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            whileHover={{ scale: 1.04, borderColor: 'rgba(126,184,255,0.5)', backgroundColor: 'rgba(126,184,255,0.06)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 7h9M7.5 3l4 4-4 4"/>
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
