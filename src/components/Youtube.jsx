import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'

const VIDEOS = [
  {
    id: 1,
    videoId: 'zwbJnXpkRHs',
    titulo: 'She Doesn’t Want Equality. She Wants You To Lead.',
    canal: 'Flourish with Laurin',
    url: 'https://www.youtube.com/watch?v=zwbJnXpkRHs',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function VideoCard({ video, i, onPlay }) {
  return (
    <motion.div
      {...fadeUp(0.1 + i * 0.1)}
      role="button"
      tabIndex={0}
      aria-label={`Reproducir: ${video.titulo}`}
      whileHover={{ y: -5, boxShadow: '0 14px 32px rgba(0,0,0,0.6)', transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
      className="group rounded-lg overflow-hidden cursor-pointer border border-[#3a3a3a] hover:border-accent focus:border-accent focus:outline-none transition-colors duration-200 flex flex-col"
      onClick={() => onPlay(video)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(video) } }}
    >
      {/* Área principal con thumbnail estilo frame Premiere */}
      <div className="relative bg-[#2a2a2a] overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
          alt={`Miniatura de "${video.titulo}", editado por Santiago Ferlatti`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-200" />

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/45 group-hover:bg-accent flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="white">
              <path d="M3 2l9 5-9 5V2z" />
            </svg>
          </div>
        </div>

        {/* Botón ir a YouTube */}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Ver "${video.titulo}" en YouTube`}
          className="absolute bottom-2 right-2 h-7 pl-2 pr-2.5 rounded-full bg-black/55 hover:bg-accent flex items-center gap-1.5 backdrop-blur-sm font-mono text-[10px] text-white transition-colors duration-200"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          YouTube
        </a>
      </div>

      {/* Barra inferior estilo Premiere */}
      <div className="bg-[#1e1e1e] py-3 px-3 flex flex-col gap-0.5 flex-shrink-0">
        <span className="font-mono text-xs text-white leading-snug line-clamp-2">{video.titulo}</span>
        <span className="font-mono text-[10px]" style={{ color: '#8a8a8a' }}>{video.canal}</span>
      </div>
    </motion.div>
  )
}

export default function Youtube() {
  const [modalVideo, setModalVideo] = useState(null)

  return (
    <section id="youtube" className="relative py-20 px-6">
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        <motion.h2
          {...fadeUp(0)}
          className="font-bold text-3xl md:text-4xl text-base-ink text-center"
        >
          YouTube
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-base-muted text-sm text-center mt-3 mb-10"
        >
          Videos de formato largo que edité para creadores.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} i={i} onPlay={setModalVideo} />
          ))}
        </div>

      </div>

      <VideoModal
        videoUrl={modalVideo ? `https://www.youtube.com/embed/${modalVideo.videoId}?autoplay=1` : ''}
        titulo={modalVideo?.titulo || ''}
        externalUrl={modalVideo?.url}
        aspect="16/9"
        isOpen={!!modalVideo}
        onClose={() => setModalVideo(null)}
      />
    </section>
  )
}
