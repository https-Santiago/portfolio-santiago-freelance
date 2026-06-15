import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { openSafe } from '../utils/openSafe'
import { useLanguage } from '../context/LanguageContext'

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${10 + i * 11}%`,
  size: 2 + (i % 3),
  delay: `${i * 0.9}s`,
  dur: `${4 + (i % 3)}s`,
  color: i % 2 === 0 ? 'rgba(200,255,0,0.5)' : 'rgba(126,184,255,0.4)',
}))

const T = {
  es: {
    label: 'Contacto',
    title: '¿Hablamos?',
    subtitle: 'Escribime y en menos de 24 horas te cuento todo sobre el plan que más te conviene.',
    waBtn: 'Escribime por WhatsApp',
    waMsg: 'Hola! Vi tu página y me interesa saber más sobre tus planes de edición de video. ¿Me podés dar información?',
  },
  en: {
    label: 'Contact',
    title: "Let's talk?",
    subtitle: "Message me and within 24 hours I'll tell you everything about the plan that suits you best.",
    waBtn: 'Message me on WhatsApp',
    waMsg: "Hello! I saw your page and I'm interested in learning more about your video editing plans. Can you give me more information?",
  },
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section id="contacto" className="relative py-28 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(200,255,0,0.07) 0%, transparent 60%)' }}
      />

      {/* Partículas flotantes */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full pointer-events-none"
          style={{ left: p.left, width: p.size, height: p.size, background: p.color, animation: `floatParticle ${p.dur} ${p.delay} ease-in infinite` }}
        />
      ))}

      <div className="max-w-2xl mx-auto text-center relative z-10" ref={ref}>

        <motion.p
          className="text-[#c8ff00] text-sm tracking-[4px] uppercase mb-4 font-medium"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.label}
        </motion.p>

        <div style={{ overflow: 'hidden' }} className="mb-4">
          <motion.h2
            className="font-orbitron font-black text-4xl md:text-5xl text-white"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.title}
          </motion.h2>
        </div>

        <motion.p
          className="text-white/40 text-base leading-relaxed mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border p-8 contact-card flex justify-center"
          style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(200,255,0,0.2)' }}
        >
          <motion.button
            className="flex items-center justify-center gap-2.5 bg-[#25d366] text-white font-semibold px-7 py-4 rounded-xl"
            onClick={() => openSafe('https://wa.me/5493464692656?text=' + encodeURIComponent(t.waMsg))}
            whileHover={{ scale: 1.05, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.waBtn}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
