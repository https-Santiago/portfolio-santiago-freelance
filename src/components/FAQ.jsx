import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_LINK = `https://wa.me/5493464692656?text=${encodeURIComponent('Hola Santiago! Tengo una duda sobre tu servicio de edición.')}`

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const FAQS = [
  {
    q: '¿En cuánto tiempo recibo mi video editado?',
    a: 'Normalmente entrego el mismo día o al día siguiente, según la cantidad de proyectos que tenga en ese momento. Coordinamos los tiempos al arrancar para que siempre tengas tu contenido cuando lo necesitás.',
  },
  {
    q: '¿Cuántas revisiones están incluidas?',
    a: 'Incluyo 2 rondas de revisión sin costo. Si algo no te cierra (un corte, el color, el ritmo), lo ajusto hasta que quede como lo imaginabas.',
  },
  {
    q: '¿Qué incluye el precio?',
    a: 'Edición completa: armado, corrección de color, mejora de audio, música y subtítulos, por $12.000 ARS por video. Extras como guion previo, motion graphics o multi-formato los charlamos aparte.',
  },
  {
    q: '¿Cómo te mando el material?',
    a: 'Me compartís un link de Google Drive (o WeTransfer) con los videos crudos. No necesitás editar ni preparar nada: mientras más material me mandes, más opciones tengo para armar el mejor resultado.',
  },
  {
    q: '¿En qué formato me entregás los videos?',
    a: 'En MP4 listo para subir: vertical 9:16 para Reels, TikTok y Shorts, o el formato que necesites (horizontal para YouTube, cuadrado, etc.).',
  },
  {
    q: '¿Trabajás con creadores y también con marcas?',
    a: 'Con ambos. Edito para creadores de contenido, emprendedores, marcas personales y empresas que quieren comunicar mejor en redes.',
  },
  {
    q: '¿Cómo es el pago?',
    a: 'Lo coordinamos por WhatsApp antes de empezar: normalmente una seña para reservar el trabajo y el resto a la entrega, por transferencia.',
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-base-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-sm md:text-base font-medium leading-snug" style={{ color: '#f0f0f0' }}>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-accent"
          style={{ border: '1px solid rgba(167,139,250,0.4)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
            <p className="text-base-muted text-sm leading-relaxed pb-4 pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-base-soft overflow-hidden py-20 px-6">
      {/* Grilla decorativa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto w-full">

        <motion.h2
          {...fadeUp(0)}
          className="font-bold text-3xl md:text-4xl text-base-ink text-center"
        >
          Preguntas frecuentes
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="text-base-muted text-sm text-center mt-3 mb-10"
        >
          Todo lo que necesitás saber antes de arrancar.
        </motion.p>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.p
          {...fadeUp(0.2)}
          className="text-center text-sm text-base-muted mt-8"
        >
          ¿Tenés otra duda?{' '}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium hover:underline"
          >
            Escribime por WhatsApp
          </a>
          .
        </motion.p>

      </div>
    </section>
  )
}
