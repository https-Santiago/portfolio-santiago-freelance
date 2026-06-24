import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'

const PROYECTOS = [
  { id: 1, titulo: 'reel-01.mp4', tipo: 'Reel para redes', desc: 'Corte dinámico, color y subtítulos', duracion: '00:48', videoUrl: '/reels/reel-01.mp4', poster: '/reels/posters/reel-01.jpg' },
  { id: 2, titulo: 'reel-02.mp4', tipo: 'Contenido para creador', desc: 'Ritmo musical y mejora de audio', duracion: '00:36', videoUrl: '/reels/reel-02.mp4', poster: '/reels/posters/reel-02.jpg' },
  { id: 3, titulo: 'reel-03.mp4', tipo: 'Video promocional', desc: 'Color cinematográfico y transiciones', duracion: '00:30', videoUrl: '/reels/reel-03.mp4', poster: '/reels/posters/reel-03.jpg' },
  { id: 4, titulo: 'reel-04.mp4', tipo: 'Reel para redes', desc: 'Storytelling con subtítulos y música', duracion: '00:55', videoUrl: '/reels/reel-04.mp4', poster: '/reels/posters/reel-04.jpg' },
  { id: 5, titulo: 'reel-05.mp4', tipo: 'Contenido para marca', desc: 'Cortes al ritmo, color y subtítulos', duracion: '00:32', videoUrl: '/reels/reel-05.mp4', poster: '/reels/posters/reel-05.jpg' },
  { id: 6, titulo: 'reel-06.mp4', tipo: 'Reel para redes', desc: 'Cortes precisos, color y sonido', duracion: '00:46', videoUrl: '/reels/reel-06.mp4', poster: '/reels/posters/reel-06.jpg' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Trabajos() {
  const [modalProyecto, setModalProyecto] = useState(null)

  return (
    <section id="trabajos" className="relative min-h-screen flex flex-col items-center justify-center bg-base-soft overflow-hidden py-20 px-6">
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
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        <motion.h2
          {...fadeUp(0)}
          className="font-bold text-3xl md:text-4xl text-base-ink text-center"
        >
          Trabajos
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-base-muted text-sm text-center mt-3 mb-10"
        >
          Algunos proyectos en los que trabajé recientemente.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROYECTOS.map((proyecto, i) => (
            <motion.div
              key={proyecto.id}
              {...fadeUp(0.1 + i * 0.08)}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${proyecto.tipo}: ${proyecto.desc}`}
              className="group rounded-lg overflow-hidden cursor-pointer border border-[#3a3a3a] hover:border-accent focus:border-accent focus:outline-none transition-colors duration-200 flex flex-col"
              style={{ aspectRatio: '9/16' }}
              onClick={() => setModalProyecto(proyecto)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalProyecto(proyecto) } }}
            >
              {/* Área principal con poster del clip estilo frame Premiere */}
              <div className="flex-1 relative bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
                <img
                  src={proyecto.poster}
                  alt={`${proyecto.tipo} — ${proyecto.desc}, editado por Santiago Ferlatti`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />

                {/* Etiqueta tipo */}
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/55 backdrop-blur-sm">
                  <span className="font-mono text-[10px] text-accent">{proyecto.tipo}</span>
                </div>

                {/* Play */}
                <div className="relative w-12 h-12 rounded-full bg-black/45 group-hover:bg-accent flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="white">
                    <path d="M3 2l9 5-9 5V2z" />
                  </svg>
                </div>

                {/* Descripción al hover */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[11px] text-white/90 leading-snug">{proyecto.desc}</p>
                </div>
              </div>

              {/* Barra inferior estilo Premiere */}
              <div className="bg-[#1e1e1e] py-2 px-3 flex items-center justify-between flex-shrink-0">
                <span className="font-mono text-xs text-white">{proyecto.titulo}</span>
                <span className="font-mono text-xs" style={{ color: '#8a8a8a' }}>{proyecto.duracion || '▶'}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <VideoModal
        videoUrl={modalProyecto?.videoUrl || ''}
        titulo={modalProyecto?.titulo || ''}
        isOpen={!!modalProyecto}
        onClose={() => setModalProyecto(null)}
      />
    </section>
  )
}
