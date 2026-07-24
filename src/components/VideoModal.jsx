import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const isLocal = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)

export default function VideoModal({ videoUrl, titulo, isOpen, onClose, aspect = '9/16', externalUrl }) {
  const [wRatio, hRatio] = aspect.split('/').map(Number)
  const ratio = wRatio / hRatio

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={titulo ? `Video: ${titulo}` : 'Video'}
          className="fixed inset-0 z-[100] flex items-center justify-center modal-backdrop"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: `min(85vh, calc(92vw / ${ratio}))`,
              width: `min(92vw, calc(85vh * ${ratio}))`,
              aspectRatio: aspect,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              aria-label="Cerrar video"
              className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-base-ink flex items-center justify-center shadow-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Botón ir a YouTube */}
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute -top-3 -left-3 z-10 h-7 pl-2 pr-3 rounded-full bg-accent flex items-center gap-1.5 shadow-sm font-mono text-[10px] text-white hover:bg-accent-dark transition-colors duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                YouTube
              </a>
            )}

            {/* Área de video */}
            <div className="w-full h-full rounded-lg overflow-hidden bg-[#1e1e1e] flex items-center justify-center">
              {videoUrl ? (
                isLocal(videoUrl) ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full"
                    style={{ display: 'block', objectFit: 'contain' }}
                  />
                ) : (
                  <iframe
                    src={videoUrl}
                    width="100%"
                    height="100%"
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                    title={titulo}
                    style={{ display: 'block' }}
                  />
                )
              ) : (
                <span className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Video próximamente
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
