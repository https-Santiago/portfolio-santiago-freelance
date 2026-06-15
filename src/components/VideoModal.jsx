import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { openSafe } from '../utils/openSafe'

export default function VideoModal({ pack, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!pack) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(2,5,13,0.92)' }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl rounded-2xl border overflow-hidden"
          style={{
            background: '#04080f',
            borderColor: `${pack.color}40`,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: pack.color }}
              />
              <span className="font-orbitron font-bold tracking-[3px] text-sm" style={{ color: pack.color }}>
                PACK {pack.name}
              </span>
              <span className="text-white/30 text-sm ml-2">— Ejemplos de trabajos</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Videos grid */}
          <div data-lenis-prevent className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
            {pack.videos.length === 0 ? (
              <p className="col-span-full text-center text-white/30 py-12 text-sm">Próximamente — ejemplos en camino.</p>
            ) : pack.videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <video
                    src={video.src}
                    title={video.title}
                    controls
                    preload="metadata"
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: 'cover' }}
                    onLoadedMetadata={(e) => { e.target.currentTime = 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="px-6 py-4 border-t flex items-center justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-white/30 text-xs">¿Te convence este estilo?</p>
            <button
              onClick={() => openSafe('https://wa.me/5493464680592?text=' + encodeURIComponent(`Hola! Vi los ejemplos del pack ${pack.name} y me interesa. ¿Me pueden dar más información?`))}
              className="text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              style={{ background: pack.color, color: '#fff' }}
            >
              Quiero este pack
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
