import Logo from './Logo'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../utils/scrollTo'

/* Solo secciones que existen de verdad en App.jsx.
   Este nav es SOLO para mobile — en desktop la navegación
   ya la resuelve LayersSidebar (barra de "Capas"). */
const NAV_LINKS = [
  { label: 'Trabajos',    id: 'trabajos'    },
  { label: 'Testimonios', id: 'testimonios' },
  { label: 'Servicios',   id: 'servicios'   },
  { label: 'FAQ',         id: 'faq'         },
  { label: 'Contacto',    id: 'contacto'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    scrollTo(id)
    setOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`md:hidden fixed top-10 left-0 right-0 z-50 h-16 flex items-center transition-colors duration-300 ${
        scrolled ? 'bg-[#02050d]/95 border-b border-white/5' : 'bg-[#02050d]/80'
      }`}
    >
      <div className="w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={32} />
          <span className="font-orbitron font-black text-sm tracking-[4px] text-accent">SANTIAGO</span>
        </div>

        <button
          className="flex flex-col gap-1.5 p-1"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menú desplegable */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-[#04080f] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left text-white/60 hover:text-white tracking-widest uppercase text-sm"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('servicios')}
                className="bg-[#c8ff00] text-[#0a0a0a] text-sm font-semibold px-5 py-3 rounded-lg mt-2"
              >
                Ver servicios
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
