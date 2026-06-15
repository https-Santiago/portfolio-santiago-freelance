import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const PACKS = [
  { name: 'BÁSICO',   color: '#7eb8ff', featured: false },
  { name: 'ESTÁNDAR', color: '#b78bff', featured: false },
  { name: 'AVANZADO', color: '#c8ff00', featured: true  },
  { name: 'PREMIUM',  color: '#28c878', featured: false },
]

const FEATURES_DATA = [
  { orbit: true,  lunar: true,  apolo: true,  artemis: true  },
  { orbit: true,  lunar: true,  apolo: true,  artemis: true  },
  { orbit: false, lunar: true,  apolo: true,  artemis: true  },
  { orbit: false, lunar: true,  apolo: true,  artemis: true  },
  { orbit: false, lunar: true,  apolo: true,  artemis: true  },
  { orbit: false, lunar: false, apolo: true,  artemis: true  },
  { orbit: false, lunar: false, apolo: false, artemis: true  },
  { orbit: false, lunar: false, apolo: false, artemis: true  },
]

const T = {
  es: {
    label: 'Comparativa',
    title: '¿Cuál es el tuyo?',
    colHeader: 'Característica',
    popular: '★ Popular',
    features: [
      'Transiciones entre escenas',
      'Música de fondo',
      'Sonidos complementarios',
      'Subtítulos',
      'Palabras clave destacadas',
      'Superposiciones dinámicas',
      'Asesoría creativa previa',
      'Mini guion antes de grabar',
    ],
    footer: 'Plan Básico: 1 corrección incluida · Estándar, Avanzado y Premium: hasta 2 correcciones sin cargo adicional.',
  },
  en: {
    label: 'Comparison',
    title: 'Which one is yours?',
    colHeader: 'Feature',
    popular: '★ Popular',
    features: [
      'Scene transitions',
      'Background music',
      'Sound effects',
      'Subtitles',
      'Highlighted keywords',
      'Dynamic overlays',
      'Pre-editing creative consultation',
      'Pre-recording script',
    ],
    footer: 'Basic plan: 1 revision included · Standard, Advanced and Premium: up to 2 free revisions.',
  },
}

const CHECK = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke={color} strokeOpacity="0.3" />
    <path d="M5 9l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DASH = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke="rgba(255,255,255,0.08)" />
    <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export default function ComparisonTable() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLanguage()
  const t = T[lang]

  const vals = [(f) => f.orbit, (f) => f.lunar, (f) => f.apolo, (f) => f.artemis]

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
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
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-x-auto rounded-2xl border"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <th className="text-left px-6 py-5 text-white/30 text-xs tracking-widest uppercase font-medium w-[36%]">
                  {t.colHeader}
                </th>
                {PACKS.map((pack) => (
                  <th key={pack.name} className="px-4 py-5 text-center w-[16%]">
                    <div className="flex flex-col items-center gap-1.5">
                      {pack.featured && (
                        <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: `${pack.color}20`, color: pack.color, border: `1px solid ${pack.color}30` }}>
                          {t.popular}
                        </span>
                      )}
                      <span className="font-orbitron font-black text-sm tracking-wider" style={{ color: pack.color }}>
                        {pack.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES_DATA.map((feature, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < FEATURES_DATA.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                  }}
                >
                  <td className="px-6 py-4 text-white/55 text-sm">{t.features[i]}</td>
                  {vals.map((getter, j) => (
                    <td key={j} className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        {getter(feature) ? <CHECK color={PACKS[j].color} /> : <DASH />}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-6 tracking-wide"
        >
          {t.footer}
        </motion.p>

      </div>
    </section>
  )
}
