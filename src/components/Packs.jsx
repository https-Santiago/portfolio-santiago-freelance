import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VideoModal from './VideoModal'
import { openSafe } from '../utils/openSafe'
import { useLanguage } from '../context/LanguageContext'

const USD_RATE = 1400       // pesos por dólar
const DOLARAPP_FEE = 3      // dólares de comisión

function toUSD(ars) {
  return Math.round(ars / USD_RATE)
}

const PACKS_BASE = [
  {
    number: '01',
    name: 'BÁSICO',
    color: '#7eb8ff',
    bgAccent: 'rgba(126,184,255,0.06)',
    borderAccent: 'rgba(126,184,255,0.2)',
    prices: { 1: 26000, 4: 96000, 8: 176000, 12: 240000 },
    videos: [
      { src: '/videos/orbit/1.mp4', title: 'Básico — Ejemplo 1' },
      { src: '/videos/orbit/2.mp4', title: 'Básico — Ejemplo 2' },
      { src: '/videos/orbit/3.mp4', title: 'Básico — Ejemplo 3' },
      { src: '/videos/orbit/4.mp4', title: 'Básico — Ejemplo 4' },
      { src: '/videos/orbit/5.mp4', title: 'Básico — Ejemplo 5' },
      { src: '/videos/orbit/6.mp4', title: 'Básico — Ejemplo 6' },
    ],
  },
  {
    number: '02',
    name: 'ESTÁNDAR',
    color: '#b78bff',
    bgAccent: 'rgba(183,139,255,0.06)',
    borderAccent: 'rgba(183,139,255,0.2)',
    prices: { 1: 32000, 4: 120000, 8: 224000, 12: 312000 },
    videos: [
      { src: '/videos/lunar/1.mp4', title: 'Estándar — Ejemplo 1' },
      { src: '/videos/lunar/2.mp4', title: 'Estándar — Ejemplo 2' },
      { src: '/videos/lunar/3.mp4', title: 'Estándar — Ejemplo 3' },
      { src: '/videos/lunar/4.mp4', title: 'Estándar — Ejemplo 4' },
      { src: '/videos/lunar/5.mp4', title: 'Estándar — Ejemplo 5' },
    ],
  },
  {
    number: '03',
    name: 'AVANZADO',
    color: '#c8ff00',
    bgAccent: 'rgba(200,255,0,0.06)',
    borderAccent: 'rgba(200,255,0,0.3)',
    featured: true,
    prices: { 1: 38000, 4: 144000, 8: 272000, 12: 384000 },
    videos: [
      { src: '/videos/apolo/1.mp4', title: 'Avanzado — Ejemplo 1' },
      { src: '/videos/apolo/2.mp4', title: 'Avanzado — Ejemplo 2' },
      { src: '/videos/apolo/3.mp4', title: 'Avanzado — Ejemplo 3' },
    ],
  },
  {
    number: '04',
    name: 'PREMIUM',
    color: '#28c878',
    bgAccent: 'rgba(40,200,120,0.06)',
    borderAccent: 'rgba(40,200,120,0.2)',
    prices: { 1: 50000 },
    videos: [
      { src: '/videos/artemis/1.mp4', title: 'Premium — Ejemplo 1' },
      { src: '/videos/artemis/2.mp4', title: 'Premium — Ejemplo 2' },
      { src: '/videos/artemis/3.mp4', title: 'Premium — Ejemplo 3' },
    ],
  },
]

const PACKS_TEXT = {
  es: [
    {
      tagline: 'Para empezar con todo.',
      description: 'El pack de entrada para darle vida a tu contenido. Transiciones fluidas y música de fondo que acompañan tu mensaje sin distraer.',
      features: ['Transiciones entre escenas', 'Música de fondo'],
      visualLabel: 'Transiciones + Música',
      featuredLabel: '★ El más pedido',
      watchLabel: 'Ver ejemplos',
    },
    {
      tagline: 'Más opciones, más impacto.',
      description: 'Llevamos la edición un paso más. Vos elegís qué sonido usar y cómo mostrar tu mensaje en pantalla. Dos opciones por elemento para personalizar tu estilo.',
      features: ['Transiciones entre escenas', 'Música O sonidos (elegís 1)', 'Subtítulos O palabras clave (elegís 1)'],
      visualLabel: 'Música · Subtítulos · Keywords',
      featuredLabel: '★ El más pedido',
      watchLabel: 'Ver ejemplos',
    },
    {
      tagline: 'El más pedido. No es casualidad.',
      description: 'La experiencia completa de edición. Todo lo que necesitás para que tu video se vea profesional, dinámico y accesible. El pack que más resultados genera.',
      features: [
        'Transiciones entre escenas',
        'Música de fondo + Sonidos complementarios',
        'Subtítulos para accesibilidad',
        'Palabras clave destacadas',
        'Superposiciones dinámicas',
      ],
      visualLabel: 'Experiencia completa',
      featuredLabel: '★ El más pedido',
      watchLabel: 'Ver ejemplos',
    },
    {
      tagline: 'Edición + estrategia. El combo completo.',
      description: 'Todo lo del pack Apolo más acompañamiento estratégico. Una mini reunión antes de editar para definir el enfoque y un guion estructurado para que grabes con claridad.',
      features: [
        'Todo el plan Avanzado incluido',
        'Asesoría creativa previa (mini reunión)',
        'Mini guion antes de grabar',
      ],
      visualLabel: 'Avanzado + Estrategia + Guion',
      featuredLabel: '★ El más pedido',
      watchLabel: 'Ver ejemplos',
    },
  ],
  en: [
    {
      tagline: 'Start strong.',
      description: 'The entry pack to bring your content to life. Smooth transitions and background music that complement your message without distracting.',
      features: ['Scene transitions', 'Background music'],
      visualLabel: 'Transitions + Music',
      featuredLabel: '★ Most popular',
      watchLabel: 'See examples',
    },
    {
      tagline: 'More options, more impact.',
      description: 'We take editing one step further. You choose what sound to use and how to show your message on screen. Two options per element to customize your style.',
      features: ['Scene transitions', 'Music OR sound effects (you choose 1)', 'Subtitles OR keywords (you choose 1)'],
      visualLabel: 'Music · Subtitles · Keywords',
      featuredLabel: '★ Most popular',
      watchLabel: 'See examples',
    },
    {
      tagline: 'The most requested. Not by accident.',
      description: 'The complete editing experience. Everything you need to make your video look professional, dynamic and accessible. The pack that generates the most results.',
      features: [
        'Scene transitions',
        'Background music + sound effects',
        'Subtitles for accessibility',
        'Highlighted keywords',
        'Dynamic overlays',
      ],
      visualLabel: 'Complete experience',
      featuredLabel: '★ Most popular',
      watchLabel: 'See examples',
    },
    {
      tagline: 'Editing + strategy. The complete combo.',
      description: 'Everything from Apolo plus strategic support. A brief meeting before editing to define the approach and a structured script so you record with clarity.',
      features: [
        'Everything in Advanced included',
        'Pre-editing creative consultation',
        'Pre-recording script',
      ],
      visualLabel: 'Advanced + Strategy + Script',
      featuredLabel: '★ Most popular',
      watchLabel: 'See examples',
    },
  ],
}

function PackVisual({ pack, text, onOpen, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="pack-visual relative rounded-2xl overflow-hidden cursor-pointer border"
        style={{ background: pack.bgAccent, borderColor: pack.borderAccent, aspectRatio: '16/10' }}
        onClick={onOpen}
      >
        {/* Number watermark */}
        <div
          className="absolute top-4 left-4 font-orbitron font-black text-6xl leading-none select-none"
          style={{ color: `${pack.color}18` }}
        >
          {pack.number}
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
          <div className="font-orbitron font-black text-2xl tracking-widest pack-name-shimmer" style={{ color: pack.color }}>
            {pack.name}
          </div>
          <p className="text-white/30 text-xs text-center tracking-wider">{text.visualLabel}</p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {text.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 rounded-full border tracking-wide"
                style={{ borderColor: `${pack.color}30`, color: `${pack.color}90`, background: `${pack.color}08` }}
              >
                {f.length > 24 ? f.slice(0, 22) + '…' : f}
              </span>
            ))}
          </div>
        </div>

        {/* Badge siempre visible — indica que es clickeable */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm whitespace-nowrap"
          style={{
            borderColor: `${pack.color}40`,
            background: `${pack.color}14`,
            color: pack.color,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M2 1.5l7 3.5-7 3.5V1.5z" />
          </svg>
          <span className="text-[10px] font-semibold tracking-widest uppercase">
            {text.watchLabel}
          </span>
        </div>

        {/* Play overlay (hover / tap) */}
        <div className="play-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(2,5,13,0.7)' }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: pack.color, background: `${pack.color}20` }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill={pack.color}>
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
          </div>
          <span className="absolute bottom-4 text-xs tracking-widest uppercase" style={{ color: pack.color }}>
            {text.watchLabel}
          </span>
        </div>

        {pack.featured && (
          <div
            className="absolute top-3 right-3 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold"
            style={{ background: pack.color, color: '#fff' }}
          >
            {text.featuredLabel}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function formatARS(n) {
  return '$' + n.toLocaleString('es-AR')
}

function PriceSelector({ pack, color, lang }) {
  const qtys = Object.keys(pack.prices).map(Number)
  const single = qtys.length === 1
  const [selected, setSelected] = useState(qtys[0])

  const arsPrice = pack.prices[selected]
  const usdBase  = toUSD(arsPrice)

  const videoLabel = lang === 'es'
    ? `por ${selected} video${selected > 1 ? 's' : ''}`
    : `for ${selected} video${selected > 1 ? 's' : ''}`
  const meetingLabel = lang === 'es'
    ? 'por video · incluye reunión'
    : 'per video · includes meeting'
  const perLabel = single ? meetingLabel : videoLabel

  // Nota de duración
  const durationNote = lang === 'es'
    ? 'Precio para videos de 10 seg a 1 min. Cada minuto extra: +70% del precio base.'
    : 'Price for videos from 10 sec to 1 min. Each extra minute: +70% of the base price.'

  return (
    <div className="mb-6">
      {!single && (
        <div className="flex gap-2 mb-3">
          {qtys.map(q => (
            <button
              key={q}
              onClick={() => setSelected(q)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150"
              style={
                selected === q
                  ? { background: color, color: '#02050d', borderColor: color }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.12)' }
              }
            >
              x{q}
            </button>
          ))}
        </div>
      )}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {lang === 'es' ? (
          <>
            {/* ES: ARS como precio principal */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-orbitron font-black text-3xl" style={{ color }}>
                {formatARS(arsPrice)}
              </span>
              <span className="text-white/35 text-sm">{perLabel}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-sm">
                ≈ <span className="text-white/60 font-medium">USD ${usdBase}</span>
              </span>
              <span className="text-white/25 text-xs border border-white/10 px-2 py-0.5 rounded-full">
                +${DOLARAPP_FEE} vía DolarApp
              </span>
            </div>
          </>
        ) : (
          <>
            {/* EN: USD como precio principal */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-orbitron font-black text-3xl" style={{ color }}>
                USD ${usdBase}
              </span>
              <span className="text-white/35 text-sm">{perLabel}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-sm">
                ≈ <span className="text-white/60 font-medium">{formatARS(arsPrice)} ARS</span>
              </span>
              <span className="text-white/25 text-xs border border-white/10 px-2 py-0.5 rounded-full">
                +${DOLARAPP_FEE} via DolarApp
              </span>
            </div>
          </>
        )}

        {/* Nota de duración */}
        <p className="mt-2 text-white/22 text-xs leading-snug">
          {durationNote}
        </p>
      </motion.div>
    </div>
  )
}

function PackRow({ pack, text, index, onOpen, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  const ctaLabel = lang === 'es' ? 'Consultar por este pack' : 'Inquire about this pack'
  const waMessage = lang === 'es'
    ? `Hola! Vi su página y me interesa el pack ${pack.name}. ¿Me pueden dar más información?`
    : `Hello! I saw your page and I'm interested in the ${pack.name} pack. Can you give me more information?`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 border-b"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* Text side */}
      <div className={isEven ? 'md:order-1' : 'md:order-2'}>
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <span
            className="font-orbitron text-xs tracking-[3px] border rounded-md px-2.5 py-1"
            style={{ color: pack.color, borderColor: `${pack.color}30`, background: `${pack.color}08` }}
          >
            {pack.number}
          </span>
          {pack.featured && (
            <span
              className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold"
              style={{ background: `${pack.color}15`, color: pack.color, border: `1px solid ${pack.color}30` }}
            >
              {text.featuredLabel}
            </span>
          )}
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.h3
            className="font-orbitron font-black text-4xl md:text-5xl mb-2 tracking-wider"
            style={{ color: pack.color }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {pack.name}
          </motion.h3>
        </div>

        <motion.p
          className="text-white/40 text-base mb-5 tracking-wide italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          {text.tagline}
        </motion.p>

        <motion.p
          className="text-white/60 text-base leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          {text.description}
        </motion.p>

        <ul className="space-y-2.5 mb-8">
          {text.features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.38, delay: 0.38 + i * 0.08, ease: 'easeOut' }}
              className="flex items-start gap-2.5 text-base text-white/70"
            >
              <motion.span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: pack.color }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.38 + i * 0.08 }}
              />
              {f}
            </motion.li>
          ))}
        </ul>

        <PriceSelector pack={pack} color={pack.color} lang={lang} />

        <motion.button
          onClick={() => openSafe('https://wa.me/5493464692656?text=' + encodeURIComponent(waMessage))}
          className="font-semibold text-sm px-6 py-3 rounded-lg"
          style={{ background: pack.color, color: '#02050d' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 + text.features.length * 0.08 }}
          whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.97 }}
        >
          {ctaLabel}
        </motion.button>
      </div>

      {/* Visual side */}
      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
        <PackVisual pack={pack} text={text} onOpen={() => onOpen(pack)} inView={inView} />
      </div>
    </motion.div>
  )
}

export default function Packs() {
  const [selectedPack, setSelectedPack] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()

  const headerLabel  = lang === 'es' ? 'Servicios' : 'Services'
  const headerTitle  = lang === 'es' ? 'Elegí tu plan.' : 'Choose your plan.'
  const headerSub    = lang === 'es'
    ? 'Hacé click en el preview de cada pack para ver ejemplos reales de trabajos.'
    : 'Click on each pack preview to see real work examples.'

  return (
    <section id="packs" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-4" ref={ref}>
          <motion.p
            className="text-[#c8ff00] text-sm tracking-[4px] uppercase mb-3 font-medium"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {headerLabel}
          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {headerTitle}
            </motion.h2>
          </div>

          <motion.div
            className="h-px origin-left mb-2"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'linear-gradient(to right, #c8ff00, rgba(200,255,0,0.3), transparent)', maxWidth: '200px' }}
          />

          <motion.p
            className="text-white/35 text-base max-w-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {headerSub}
          </motion.p>
        </div>

        <div>
          {PACKS_BASE.map((pack, i) => (
            <PackRow
              key={pack.name}
              pack={pack}
              text={PACKS_TEXT[lang][i]}
              index={i}
              onOpen={setSelectedPack}
              lang={lang}
            />
          ))}
        </div>
      </div>

      {selectedPack && (
        <VideoModal pack={selectedPack} onClose={() => setSelectedPack(null)} />
      )}
    </section>
  )
}
