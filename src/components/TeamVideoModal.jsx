import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// Ruta del video — cuando lo tengan, reemplazar por '/videos/team/presentacion.mp4'
const VIDEO_SRC = null

export default function TeamVideoModal({ onClose }) {
  const videoRef = useRef(null)
  const { lang } = useLanguage()

  const label     = lang === 'es' ? 'Quiénes somos'       : 'Who we are'
  const soon      = lang === 'es' ? 'Video próximamente'  : 'Video coming soon'
  const soonSub   = lang === 'es'
    ? 'Estamos preparando nuestra presentación. Volvé pronto.'
    : "We're preparing our intro. Check back soon."

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(2,5,13,0.92)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden border"
          style={{ borderColor: 'rgba(255,107,0,0.2)', background: '#04080f' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#ff6b00] opacity-80" />
              <span className="font-orbitron text-xs tracking-[3px] text-white/60 uppercase">{label}</span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11"/>
                <line x1="11" y1="1" x2="1" y2="11"/>
              </svg>
            </button>
          </div>

          {/* Video o placeholder */}
          <div className="relative" style={{ aspectRatio: '16/9' }}>
            {VIDEO_SRC ? (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                controls
                autoPlay
                className="w-full h-full object-cover"
                style={{ background: '#02050d' }}
              />
            ) : (
              /* Placeholder — reemplazar VIDEO_SRC con la ruta real cuando tengan el video */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(126,184,255,0.04) 100%)' }}
              >
                {/* Radar animado */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#ff6b00]/20"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-3 rounded-full border border-[#ff6b00]/15"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center border"
                    style={{ background: 'rgba(255,107,0,0.08)', borderColor: 'rgba(255,107,0,0.25)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="10 8 16 12 10 16 10 8" fill="#ff6b00" stroke="none"/>
                    </svg>
                  </div>
                </div>

                <div className="text-center px-6">
                  <p className="font-orbitron font-bold text-white/70 text-base mb-1">{soon}</p>
                  <p className="text-white/30 text-sm">{soonSub}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
