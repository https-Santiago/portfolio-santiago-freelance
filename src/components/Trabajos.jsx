import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'
import { useScrollEntrance, scrollVariantFor } from '../hooks/useScrollEntrance'
import { useScrollBlur } from '../hooks/useScrollBlur'
import { usePointerFine } from '../hooks/usePointerFine'
import { useParallax } from '../hooks/useParallax'

const PROYECTOS = [
  { id: 2, titulo: 'reel-02.mp4', tipo: 'Contenido educativo', desc: 'Talking head sobre cómo planificar 30 días de contenido, con motion graphics y calendario animado', duracion: '01:24', videoUrl: '/reels/reel-02.mp4', poster: '/reels/posters/reel-02.jpg', fecha: '2026-08-09' },
  { id: 3, titulo: 'reel-03.mp4', tipo: 'Reel promocional', desc: 'Resultados de una promo con avalancha de pedidos, motion graphics y texto animado', duracion: '00:37', videoUrl: '/reels/reel-03.mp4', poster: '/reels/posters/reel-03.jpg', fecha: '2026-07-20' },
  { id: 4, titulo: 'reel-04.mp4', tipo: 'Talking head', desc: 'Talking head sobre appointment setting, cortes ágiles y subtítulos', duracion: '00:52', videoUrl: '/reels/reel-04.mp4', poster: '/reels/posters/reel-04.jpg', fecha: '2026-07-13' },
  { id: 7, titulo: 'reel-07.mp4', tipo: 'Contenido para creador', desc: 'Talking head sobre reventa de mercadería, cortes dinámicos y subtítulos', duracion: '00:42', videoUrl: '/reels/reel-07.mp4', poster: '/reels/posters/reel-07.jpg', fecha: '2026-08-24' },
  { id: 8, titulo: 'reel-08.mp4', tipo: 'Talking head', desc: 'Talking head sobre encontrar rumbo profesional, con motion graphics y subtítulos', duracion: '00:39', videoUrl: '/reels/reel-08.mp4', poster: '/reels/posters/reel-08.jpg', fecha: '2026-08-28' },
  { id: 9, titulo: 'reel-09.mp4', tipo: 'Contenido educativo', desc: 'Contenido educativo sobre marketing y atención, con motion graphics y texto animado', duracion: '00:48', videoUrl: '/reels/reel-09.mp4', poster: '/reels/posters/reel-09.jpg', fecha: '2026-09-02' },
  { id: 10, titulo: 'reel-10.mp4', tipo: 'Contenido educativo', desc: 'Talking head sobre cómo conectar con clientes, con motion graphics y subtítulos', duracion: '00:52', videoUrl: '/reels/reel-10.mp4', poster: '/reels/posters/reel-10.jpg', fecha: '2026-07-09' },
  { id: 11, titulo: 'reel-11.mp4', tipo: 'Contenido para creador', desc: 'Sketch actuado sobre atención al cliente, con motion graphics y subtítulos', duracion: '01:10', videoUrl: '/reels/reel-11.mp4', poster: '/reels/posters/reel-11.jpg', fecha: '2026-08-05' },
  { id: 12, titulo: 'reel-12.mp4', tipo: 'Contenido educativo', desc: 'Talking head sobre estructura de guion (hook y lead), con motion graphics y subtítulos', duracion: '00:40', videoUrl: '/reels/reel-12.mp4', poster: '/reels/posters/reel-12.jpg', fecha: '2026-08-15' },
]

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatFecha(fechaStr) {
  if (!fechaStr) return ''
  const fecha = new Date(`${fechaStr}T00:00:00`)
  const dias = Math.floor((Date.now() - fecha.getTime()) / 86400000)
  if (dias < 1) return 'Hoy'
  if (dias < 2) return 'Ayer'
  if (dias < 14) return `Hace ${dias} días`
  if (dias < 60) return `Hace ${Math.floor(dias / 7)} semanas`
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]}`
}

const YOUTUBE_VIDEOS = [
  { id: 1, titulo: 'She Doesn’t Want Equality. She Wants You To Lead.', canal: 'Flourish with Laurin', videoId: 'zwbJnXpkRHs', videoUrl: 'https://www.youtube.com/embed/zwbJnXpkRHs?autoplay=1', poster: 'https://i.ytimg.com/vi/zwbJnXpkRHs/hqdefault.jpg', externalUrl: 'https://www.youtube.com/watch?v=zwbJnXpkRHs' },
]

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: EASE },
})

function ProyectoCard({ proyecto, i, blurFilter, onOpen }) {
  const ref = useRef(null)
  const entrada = useScrollEntrance(ref, scrollVariantFor(i))
  const posterY = useParallax(ref, 14)

  return (
    <motion.div
      ref={ref}
      style={{ ...entrada, filter: blurFilter, aspectRatio: '9/16' }}
      role="button"
      tabIndex={0}
      aria-label={`Ver ${proyecto.tipo}: ${proyecto.desc}`}
      className="group rounded-lg overflow-hidden cursor-pointer border border-[#3a3a3a] hover:border-accent focus:border-accent focus:outline-none transition-colors duration-200 flex flex-col"
      onClick={() => onOpen(proyecto)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(proyecto) } }}
    >
      {/* Área principal con poster del clip estilo frame Premiere */}
      <div className="flex-1 relative bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
        {/* Wrapper con buffer de 20px arriba/abajo para que el parallax nunca deje ver un borde */}
        <motion.div className="absolute -top-5 -bottom-5 left-0 right-0" style={{ y: posterY }}>
          <img
            src={proyecto.poster}
            alt={`${proyecto.tipo} — ${proyecto.desc}, editado por Santiago Ferlatti`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />

        {/* Fecha de subida */}
        {proyecto.fecha && (
          <div className="absolute top-2 left-2 h-6 px-2 rounded bg-black/55 backdrop-blur-sm flex items-center font-mono text-[10px] text-white">
            {formatFecha(proyecto.fecha)}
          </div>
        )}

        {/* Play */}
        <div className="relative w-12 h-12 rounded-full bg-black/45 group-hover:bg-accent flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="white">
            <path d="M3 2l9 5-9 5V2z" />
          </svg>
        </div>
      </div>

      {/* Barra inferior estilo Premiere */}
      <div className="bg-[#1e1e1e] py-2 px-3 flex items-center justify-between flex-shrink-0">
        <span className="font-mono text-xs text-white">{proyecto.tipo}</span>
        <span className="font-mono text-xs" style={{ color: '#8a8a8a' }}>{proyecto.duracion || '▶'}</span>
      </div>
    </motion.div>
  )
}

function YoutubeCard({ video, i, blurFilter, onPlay }) {
  const ref = useRef(null)
  const entrada = useScrollEntrance(ref, scrollVariantFor(i))
  const posterY = useParallax(ref, 14)

  return (
    <motion.div
      ref={ref}
      style={{ ...entrada, filter: blurFilter, aspectRatio: '16/9' }}
      role="button"
      tabIndex={0}
      aria-label={`Reproducir video de YouTube: ${video.titulo}`}
      className="group rounded-lg overflow-hidden cursor-pointer border border-[#3a2323] hover:border-[#ff3b3b] focus:border-[#ff3b3b] focus:outline-none transition-colors duration-200 flex flex-col"
      onClick={() => onPlay(video)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(video) } }}
    >
      <div className="flex-1 relative bg-[#2a2a2a] overflow-hidden">
        {/* Wrapper con buffer de 20px arriba/abajo para que el parallax nunca deje ver un borde */}
        <motion.div className="absolute -top-5 -bottom-5 left-0 right-0" style={{ y: posterY }}>
          <img
            src={video.poster}
            alt={`Miniatura de "${video.titulo}", editado por Santiago Ferlatti`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />

        {/* Play (rojo, look YouTube) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/45 group-hover:bg-[#ff0000] flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="white">
              <path d="M3 2l9 5-9 5V2z" />
            </svg>
          </div>
        </div>

        {/* Badge YouTube siempre visible */}
        <div className="absolute top-2 left-2 h-6 px-2 rounded bg-[#ff0000] flex items-center gap-1 font-mono text-[10px] font-bold text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M21.6 7.2s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.1c-.4.1-1.3.1-2.1.9-.6.7-.8 2.2-.8 2.2S2 9 2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.2c.8.8 1.9.8 2.3.9C6.9 19 12 19 12 19s3.9 0 6.7-.1c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5z" />
            <path d="M9.8 14.3V8.7l5.4 2.8-5.4 2.8z" fill="#1e1e1e" />
          </svg>
          YouTube
        </div>

        {/* Botón ir a YouTube */}
        <a
          href={video.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Ver "${video.titulo}" en YouTube`}
          className="absolute bottom-2 right-2 h-7 pl-2 pr-2.5 rounded-full bg-black/55 hover:bg-[#ff0000] flex items-center gap-1.5 backdrop-blur-sm font-mono text-[10px] text-white transition-colors duration-200"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Abrir
        </a>
      </div>

      {/* Barra inferior estilo Premiere */}
      <div className="bg-[#1e1e1e] py-2 px-3 flex flex-col gap-0.5 flex-shrink-0">
        <span className="font-mono text-xs text-white leading-snug line-clamp-1">{video.titulo}</span>
        <span className="font-mono text-[10px]" style={{ color: '#8a8a8a' }}>{video.canal}</span>
      </div>
    </motion.div>
  )
}

export default function Trabajos() {
  const [modalProyecto, setModalProyecto] = useState(null)
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const proyectosOrdenados = [...PROYECTOS].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  const proyectosVisibles = mostrarTodos ? proyectosOrdenados : proyectosOrdenados.slice(0, 3)
  const hayMas = PROYECTOS.length > 3
  const pointerFine = usePointerFine()
  // Un solo listener de scroll para toda la sección — el blur se le pasa
  // a cada card ya calculado, en vej de que cada una lo recalcule.
  const blurFilter = useScrollBlur({ enabled: pointerFine })

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
          {proyectosVisibles.map((proyecto, i) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} i={i} blurFilter={blurFilter} onOpen={setModalProyecto} />
          ))}
        </div>

        {hayMas && (
          <motion.div {...fadeUp(0.15)} className="flex justify-center mt-8">
            <button
              type="button"
              onClick={() => setMostrarTodos((v) => !v)}
              className="font-mono text-xs tracking-wide px-5 py-2.5 rounded-lg border border-[#3a3a3a] hover:border-accent text-base-ink transition-colors duration-200"
            >
              {mostrarTodos ? 'Ver menos' : `Ver más (+${PROYECTOS.length - 3})`}
            </button>
          </motion.div>
        )}

        {/* Formato largo (YouTube) — separado y diferenciado del resto */}
        {YOUTUBE_VIDEOS.length > 0 && (
          <div className="mt-16">
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
              <span className="h-px flex-1 bg-[#3a3a3a]" />
              <span className="font-mono text-xs tracking-wide" style={{ color: '#8a8a8a' }}>Formato largo · YouTube</span>
              <span className="h-px flex-1 bg-[#3a3a3a]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {YOUTUBE_VIDEOS.map((video, i) => (
                <YoutubeCard key={video.id} video={video} i={i} blurFilter={blurFilter} onPlay={setModalProyecto} />
              ))}
            </div>
          </div>
        )}

      </div>

      <VideoModal
        videoUrl={modalProyecto?.videoUrl || ''}
        titulo={modalProyecto?.tipo || ''}
        aspect={modalProyecto?.videoId ? '16/9' : '9/16'}
        externalUrl={modalProyecto?.externalUrl}
        isOpen={!!modalProyecto}
        onClose={() => setModalProyecto(null)}
      />
    </section>
  )
}

