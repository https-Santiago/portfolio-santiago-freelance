import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'

const PROYECTOS = [
  { id: 1, titulo: 'reel-01.mp4', tipo: 'Contenido educativo', desc: 'Talking head sobre criptomonedas y trading, con motion graphics y subtítulos', duracion: '01:18', videoUrl: '/reels/reel-01.mp4', poster: '/reels/posters/reel-01.jpg' },
  { id: 2, titulo: 'reel-02.mp4', tipo: 'Call con alumnos', desc: 'Fragmento de call de formación para setters, con cortes y subtítulos', duracion: '00:46', videoUrl: '/reels/reel-02.mp4', poster: '/reels/posters/reel-02.jpg' },
  { id: 3, titulo: 'reel-03.mp4', tipo: 'Reel promocional', desc: 'Resultados de una promo con avalancha de pedidos, motion graphics y texto animado', duracion: '00:37', videoUrl: '/reels/reel-03.mp4', poster: '/reels/posters/reel-03.jpg' },
  { id: 4, titulo: 'reel-04.mp4', tipo: 'Talking head', desc: 'Talking head sobre appointment setting, cortes ágiles y subtítulos', duracion: '00:52', videoUrl: '/reels/reel-04.mp4', poster: '/reels/posters/reel-04.jpg' },
  { id: 5, titulo: 'reel-05.mp4', tipo: 'Contenido para creador', desc: 'Talking head personal con edición dinámica y subtítulos', duracion: '01:30', videoUrl: '/reels/reel-05.mp4', poster: '/reels/posters/reel-05.jpg', cliente: { nombre: 'Yulene Galera Trillas', instagram: 'https://www.instagram.com/yulenegaleratrillas' } },
  { id: 6, titulo: 'reel-06.mp4', tipo: 'Contenido educativo', desc: 'Talking head sobre ingresos y appointment setting, con motion graphics', duracion: '01:11', videoUrl: '/reels/reel-06.mp4', poster: '/reels/posters/reel-06.jpg' },
]

const YOUTUBE_VIDEOS = [
  { id: 1, titulo: 'She Doesn’t Want Equality. She Wants You To Lead.', canal: 'Flourish with Laurin', videoId: 'zwbJnXpkRHs', videoUrl: 'https://www.youtube.com/embed/zwbJnXpkRHs?autoplay=1', poster: 'https://i.ytimg.com/vi/zwbJnXpkRHs/hqdefault.jpg', externalUrl: 'https://www.youtube.com/watch?v=zwbJnXpkRHs' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function YoutubeCard({ video, i, onPlay }) {
  return (
    <motion.div
      {...fadeUp(0.1 + i * 0.1)}
      role="button"
      tabIndex={0}
      aria-label={`Reproducir video de YouTube: ${video.titulo}`}
      className="group rounded-lg overflow-hidden cursor-pointer border border-[#3a2323] hover:border-[#ff3b3b] focus:border-[#ff3b3b] focus:outline-none transition-colors duration-200 flex flex-col"
      style={{ aspectRatio: '16/9' }}
      onClick={() => onPlay(video)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(video) } }}
    >
      <div className="flex-1 relative bg-[#2a2a2a] overflow-hidden">
        <img
          src={video.poster}
          alt={`Miniatura de "${video.titulo}", editado por Santiago Ferlatti`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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

                {/* Play */}
                <div className="relative w-12 h-12 rounded-full bg-black/45 group-hover:bg-accent flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="white">
                    <path d="M3 2l9 5-9 5V2z" />
                  </svg>
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
                <YoutubeCard key={video.id} video={video} i={i} onPlay={setModalProyecto} />
              ))}
            </div>
          </div>
        )}

      </div>

      <VideoModal
        videoUrl={modalProyecto?.videoUrl || ''}
        titulo={modalProyecto?.titulo || ''}
        aspect={modalProyecto?.videoId ? '16/9' : '9/16'}
        externalUrl={modalProyecto?.externalUrl}
        isOpen={!!modalProyecto}
        onClose={() => setModalProyecto(null)}
      />
    </section>
  )
}
