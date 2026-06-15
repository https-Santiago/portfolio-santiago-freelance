import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const FAQS = {
  es: [
    {
      q: '¿En cuánto tiempo recibo mi video editado?',
      a: 'El tiempo de entrega depende de la cantidad de videos que pidas. Coordino los tiempos con vos una vez que arrancamos para que siempre tengas contenido listo cuando lo necesitás.',
    },
    {
      q: '¿Cuántas correcciones están incluidas?',
      a: 'El plan Básico incluye 1 corrección sin cargo adicional. Los planes Estándar, Avanzado y Premium incluyen hasta 2 correcciones. Si algo no te convence del resultado, lo ajusto.',
    },
    {
      q: '¿En qué formato me entregás los videos?',
      a: 'En MP4 optimizado para redes sociales (formato vertical 9:16 para Reels y TikTok, o el formato que necesites). Listos para subir directamente.',
    },
    {
      q: '¿Cómo te mando el material?',
      a: 'Una vez que arrancamos, me compartís el link de tu Google Drive con los videos crudos. No necesitás editar nada. Mientras más material me mandés, más opciones tengo para armar el mejor resultado.',
    },
    {
      q: '¿El plan Premium incluye todo lo del plan Avanzado?',
      a: 'Sí. El plan Premium es el plan Avanzado completo más una mini reunión previa para definir el enfoque y un guion estructurado para que grabes con claridad y propósito.',
    },
    {
      q: '¿Trabajás solo con creadores o también con marcas/empresas?',
      a: 'Con ambos. Edito para creadores de contenido, emprendedores, marcas personales y empresas que quieren comunicar mejor en redes sociales.',
    },
  ],
  en: [
    {
      q: 'How long until I receive my edited video?',
      a: 'Delivery time depends on the number of videos you order. I coordinate timing with you once we start so you always have content ready when you need it.',
    },
    {
      q: 'How many revisions are included?',
      a: "The Basic plan includes 1 free revision. Standard, Advanced and Premium plans include up to 2 revisions. If you're not happy with the result, I'll adjust it.",
    },
    {
      q: 'In what format are the videos delivered?',
      a: 'In MP4 optimized for social media (vertical 9:16 format for Reels and TikTok, or whatever format you need). Ready to upload directly.',
    },
    {
      q: 'How do I send you my material?',
      a: "Once we start, you share the link to your Google Drive with your raw videos. You don't need to edit anything. The more material you send me, the more options I have to create the best result.",
    },
    {
      q: 'Does the Premium plan include everything from the Advanced plan?',
      a: 'Yes. The Premium plan is the complete Advanced plan plus a brief pre-edit meeting to define the approach and a structured script so you record with clarity and purpose.',
    },
    {
      q: 'Do you work only with creators or also with brands/companies?',
      a: 'Both. I edit for content creators, entrepreneurs, personal brands and companies that want to communicate better on social media.',
    },
  ],
}

const T = {
  es: { label: 'Dudas frecuentes', title: 'Preguntas frecuentes.' },
  en: { label: 'Common questions', title: 'Frequently asked questions.' },
}

function FAQItem({ item, index, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-white/80 text-base font-medium leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ border: '1px solid rgba(200,255,0,0.3)', color: '#c8ff00' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-white/45 text-sm leading-relaxed pb-5 pr-10">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = T[lang]
  const faqs = FAQS[lang]

  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 1, delay: 0.35 }}
            style={{ background: 'linear-gradient(to right, #c8ff00, rgba(200,255,0,0.3), transparent)', maxWidth: '220px' }}
          />
        </div>

        {/* Items */}
        <div>
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
