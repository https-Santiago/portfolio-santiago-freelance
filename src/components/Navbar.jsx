import Logo from './Logo'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '../utils/scrollTo'
import { useLanguage } from '../context/LanguageContext'

const NAV_LINKS = {
  es: [
    { label: 'Nosotros',   id: 'nosotros'  },
    { label: 'Servicios',  id: 'packs'     },
    { label: 'Extras',     id: 'extras'    },
    { label: 'FAQ',        id: 'faq'       },
    { label: 'Contacto',   id: 'contacto'  },
  ],
  en: [
    { label: 'About',    id: 'nosotros'  },
    { label: 'Services', id: 'packs'     },
    { label: 'Extras',   id: 'extras'    },
    { label: 'FAQ',      id: 'faq'       },
    { label: 'Contact',  id: 'contacto'  },
  ],
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()

  const links = NAV_LINKS[lang]
  const cta = lang === 'es' ? 'Ver packs' : 'See packs'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#02050d]/90 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <Logo size={36} />
          <span className="font-orbitron font-black text-lg tracking-[4px] text-accent">SANTIAGO</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-xs text-white/50 hover:text-white transition-colors tracking-widest uppercase font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center rounded-lg border border-white/10 overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang('es')}
              className="px-2.5 py-1.5 transition-colors"
              style={lang === 'es'
                ? { background: '#c8ff00', color: '#0a0a0a' }
                : { background: 'transparent', color: 'rgba(255,255,255,0.35)' }
              }
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              className="px-2.5 py-1.5 transition-colors"
              style={lang === 'en'
                ? { background: '#c8ff00', color: '#0a0a0a' }
                : { background: 'transparent', color: 'rgba(255,255,255,0.35)' }
              }
            >
              EN
            </button>
          </div>

          <button
            onClick={() => handleNav('packs')}
            className="bg-[#c8ff00] hover:bg-[#a8d600] text-[#0a0a0a] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors tracking-wide"
          >
            {cta}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#04080f] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left text-white/60 hover:text-white tracking-widest uppercase text-sm"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('packs')}
                className="bg-[#c8ff00] text-[#0a0a0a] text-sm font-semibold px-5 py-3 rounded-lg mt-2"
              >
                {cta}
              </button>
              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-white/25 text-xs tracking-wide">
                  {lang === 'es' ? 'Idioma' : 'Language'}:
                </span>
                <div className="flex items-center rounded-lg border border-white/10 overflow-hidden text-xs font-semibold">
                  <button
                    onClick={() => setLang('es')}
                    className="px-3 py-1.5 transition-colors"
                    style={lang === 'es'
                      ? { background: '#c8ff00', color: '#0a0a0a' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.35)' }
                    }
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className="px-3 py-1.5 transition-colors"
                    style={lang === 'en'
                      ? { background: '#c8ff00', color: '#0a0a0a' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.35)' }
                    }
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
