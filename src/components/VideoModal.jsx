import { AnimatePresence, motion } from 'framer-motion'

const isLocal = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)

export default function VideoModal({ videoUrl, titulo, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            style={{ maxHeight: '85vh', maxWidth: '92vw', aspectRatio: '9/16' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-base-ink flex items-center justify-center shadow-sm"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e1e1e" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

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
