import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'

const WA_LINK = `https://wa.me/5493464692656?text=${encodeURIComponent('Hola Santiago! Quiero consultarte sobre el servicio de edición de video.')}`

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const HIGHLIGHTS = [
  {
    titulo: 'Edición de Video',
    desc: 'Cortes precisos que retienen atención hasta el final.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
      </svg>
    ),
  },
  {
    titulo: 'Corrección de Color',
    desc: 'Paleta consistente y mood visual definido.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20" />
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    titulo: 'Motion Graphics',
    desc: 'Textos y gráficos animados que comunican más.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
]

const METADATA = [
  { label: 'ESTADO',       valor: 'Disponible para nuevos proyectos' },
  { label: 'RESPUESTA',    valor: 'Menos de 24hs' },
  { label: 'UBICACIÓN',    valor: 'Rosario, Argentina (remoto)' },
  { label: 'HERRAMIENTAS', valor: 'Premiere · After Effects · Photoshop' },
]

function WavePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      style={{ opacity: 0.6 }}
    >
      <path
        d="M0 12 Q5 4 10 12 Q15 20 20 12 Q25 4 30 12 Q35 20 40 12 Q45 4 50 12 Q55 20 60 12 Q65 4 70 12 Q75 20 80 12 Q85 4 90 12 Q95 20 100 12 Q105 4 110 12 Q115 20 120 12 Q125 4 130 12 Q135 20 140 12 Q145 4 150 12 Q155 20 160 12 Q165 4 170 12 Q175 20 180 12 Q185 4 190 12 Q195 20 200 12"
        fill="none"
        stroke="#9FE1CB"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function BowTieIcon() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="#AFA9EC">
      <polygon points="0,0 10,8 0,16" />
      <polygon points="10,0 0,8 10,16" />
    </svg>
  )
}

function Clip({ left, width, bg, border, textColor, label, wave = false }) {
  return (
    <div
      className="absolute top-0.5 bottom-0.5 rounded flex items-center overflow-hidden"
      style={{ left, width, background: bg, border: `1px solid ${border}` }}
    >
      {wave && <WavePattern />}
      <span
        className="relative font-mono pl-1 whitespace-nowrap overflow-hidden"
        style={{ fontSize: 9, color: textColor, zIndex: 1 }}
      >
        {label}
      </span>
    </div>
  )
}

function Track({ label, children }) {
  return (
    <div className="flex items-center gap-1">
      <span
        className="font-mono text-right flex-shrink-0"
        style={{ fontSize: 10, color: '#8a8a8a', width: 26 }}
      >
        {label}
      </span>
      <div className="flex-1 relative rounded" style={{ height: 22, background: '#252525' }}>
        {children}
      </div>
    </div>
  )
}

function EdicionCard() {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ border: '1px solid #3a3a3a' }}
    >
      {/* Header ventana */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ background: '#2a2a2a' }}
      >
        <span className="font-mono text-xs text-white">Edición completa</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4" style={{ background: '#1e1e1e' }}>

        {/* Monitor de preview */}
        <div
          className="rounded p-4 mb-3.5 flex items-start justify-between gap-2"
          style={{ background: '#4a4a4a', border: '1px solid #5a5a5a' }}
        >
          {/* Precio */}
          <div className="min-w-0">
            <p className="font-mono tracking-widest mb-1.5" style={{ fontSize: 10, color: '#b0b0b0' }}>
              PRECIO POR VIDEO
            </p>
            <div className="flex items-baseline gap-2 leading-none">
              <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(2rem, 9vw, 2.75rem)', lineHeight: 1 }}>
                $20
              </span>
              <span className="font-mono text-sm" style={{ color: '#b0b0b0' }}>USD</span>
            </div>
            <p className="font-mono text-xs mt-1" style={{ color: '#9a9a9a' }}>≈ $30.000 ARS</p>
          </div>

          {/* Incluye */}
          <div className="text-right flex-shrink-0">
            <p className="font-mono tracking-widest mb-1.5" style={{ fontSize: 9, color: '#8a8a8a' }}>
              INCLUYE
            </p>
            <p className="font-mono leading-relaxed" style={{ fontSize: 10, color: '#b0b0b0' }}>
              Video + color<br />
              Audio + música<br />
              Subtítulos
            </p>
          </div>
        </div>

        {/* Regla de tiempo */}
        <div
          className="flex mb-1.5"
          style={{ paddingLeft: 34, borderBottom: '1px solid #3a3a3a', paddingBottom: 4, marginBottom: 6 }}
        >
          {['00:00', '00:06', '00:12', '00:18', '00:24'].map((t) => (
            <span key={t} className="flex-1 font-mono" style={{ fontSize: 9, color: '#8a8a8a' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Pistas */}
        <div className="flex flex-col" style={{ gap: 3 }}>
          {/* V3 */}
          <Track label="V3">
            <Clip left="25%" width="50%" bg="#7C3AED" border="#AFA9EC" textColor="#EEEDFE" label="subtitulos" />
          </Track>

          {/* V2 */}
          <Track label="V2">
            <Clip left="10%" width="70%" bg="#534AB7" border="#7F77DD" textColor="#EEEDFE" label="correccion_color" />
          </Track>

          {/* V1 */}
          <Track label="V1">
            <Clip left="0" width="45%" bg="#378ADD" border="#85B7EB" textColor="#E6F1FB" label="video.mp4" />
            <div
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{ left: '45%', width: '3%' }}
            >
              <BowTieIcon />
            </div>
            <Clip left="48%" width="52%" bg="#378ADD" border="#85B7EB" textColor="#E6F1FB" label="video.mp4" />
          </Track>

          {/* Separador video/audio */}
          <div style={{ height: 6 }} />

          {/* A1 */}
          <Track label="A1">
            <Clip left="0" width="96%" bg="#0F6E56" border="#1D9E75" textColor="#E1F5EE" label="audio_mejorado.wav" wave />
          </Track>

          {/* A2 */}
          <Track label="A2">
            <Clip left="8%" width="80%" bg="#0F6E56" border="#1D9E75" textColor="#E1F5EE" label="musica_fondo.mp3" wave />
          </Track>
        </div>

        {/* CTA */}
        <div
          className="mt-3.5 pt-3.5"
          style={{ borderTop: '1px solid #3a3a3a' }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-accent hover:bg-accent-dark text-white font-mono font-medium text-sm flex items-center justify-center gap-2 py-3 tracking-wide transition-colors duration-200"
            style={{ borderRadius: 3, border: '1px solid #a78bfa' }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 2l9 5-9 5V2z" />
            </svg>
            CONSULTAR POR WHATSAPP
          </a>
        </div>

      </div>
    </div>
  )
}

export default function Servicios() {
  return (
    <section id="servicios" className="relative min-h-screen flex flex-col items-center justify-center bg-base-soft overflow-hidden py-20 px-6">
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
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col gap-10 py-4">

        {/* Header */}
        <div>
          <motion.h2
            {...fadeUp(0)}
            className="font-bold text-3xl md:text-4xl text-base-ink text-center"
          >
            Servicios
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="text-base-muted text-sm text-center mt-3"
          >
            Edición profesional para tu contenido.
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.div
          {...fadeUp(0.15)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {HIGHLIGHTS.map(({ titulo, desc, icon }) => (
            <div key={titulo} className="flex flex-col gap-2 p-4 rounded-xl bg-base-soft border border-base-border">
              <span className="text-accent">{icon}</span>
              <p className="font-semibold text-sm text-base-ink">{titulo}</p>
              <p className="text-xs text-base-muted leading-snug">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* ═══════ SERVICIO (precio) + CONTACTO lado a lado ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Precio / edición */}
          <motion.div {...fadeUp(0.25)} className="flex flex-col">
            <h3 className="font-bold text-xl md:text-2xl text-base-ink mb-1">
              El servicio
            </h3>
            <p className="text-base-muted text-sm mb-4">
              Todo lo que incluye tu edición.
            </p>
            <EdicionCard />
          </motion.div>

          {/* Contacto */}
          <motion.div
            {...fadeUp(0.35)}
            id="contacto"
            className="scroll-mt-16 flex flex-col"
          >
            <h3 className="font-bold text-xl md:text-2xl text-base-ink mb-1">
              ¿Hablamos?
            </h3>
            <p className="text-base-muted text-sm mb-4">
              Contame sobre tu proyecto y te respondo a la brevedad.
            </p>

            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #3a3a3a' }}>
              {/* Header ventana */}
              <div className="flex items-center justify-between px-4 py-2" style={{ background: '#2a2a2a' }}>
                <span className="font-mono text-xs text-white">contacto.prproj</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col" style={{ background: '#1e1e1e' }}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {METADATA.map(({ label, valor }) => (
                    <div key={label}>
                      <p className="font-mono tracking-widest mb-1" style={{ fontSize: 10, color: '#8a8a8a' }}>
                        {label}
                      </p>
                      <p className="font-mono text-sm text-white leading-snug">{valor}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6" style={{ borderTop: '1px solid #3a3a3a' }}>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-mono font-medium text-sm flex items-center justify-center gap-2 py-4 tracking-wide transition-colors duration-200"
                    style={{ borderRadius: 3, border: '1px solid #a78bfa' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 2l9 5-9 5V2z" />
                    </svg>
                    HABLEMOS POR WHATSAPP
                  </a>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="font-mono text-[11px]" style={{ color: '#8a8a8a' }}>También en redes</span>
                    <SocialLinks iconClassName="w-9 h-9" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Nota extras */}
        <motion.p
          {...fadeUp(0.45)}
          className="text-center text-xs text-base-muted max-w-md mx-auto leading-relaxed"
        >
          Extras disponibles: guion previo, motion graphics, multi-formato. Para proyectos grandes o necesidades específicas, escribime y lo charlamos.
        </motion.p>

      </div>
    </section>
  )
}
