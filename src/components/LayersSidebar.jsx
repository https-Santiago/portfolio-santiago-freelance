import { useState, useEffect, useRef } from 'react'

const LAYERS = [
  { id: 'hero',      name: 'Hero.psd' },
  { id: 'trabajos',  name: 'Trabajos.psd' },
  { id: 'servicios', name: 'Servicios.psd' },
  { id: 'faq',       name: 'FAQ.psd' },
]

// Nota: "contacto" vive dentro de la sección Servicios (mismo bloque).

function EyeIcon({ open }) {
  return open ? (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function LayersSidebar() {
  const [active, setActive] = useState('hero')
  const visiblePx = useRef({})

  useEffect(() => {
    const observers = []

    LAYERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          visiblePx.current[id] = entry.intersectionRect.height
          const top = Object.entries(visiblePx.current).sort((a, b) => b[1] - a[1])[0]
          if (top && top[1] > 0) setActive(top[0])
        },
        { threshold: Array.from({ length: 101 }, (_, i) => i * 0.01) }
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col w-[280px]"
      style={{ background: '#3a3a3a' }}
    >
      {/* 1) Fila de tabs */}
      <div
        className="flex items-end gap-0 px-2 pt-2"
        style={{ background: '#454545', borderBottom: '1px solid #2f2f2f' }}
      >
        <div
          className="px-3 pb-1.5 pt-1"
          style={{ borderBottom: '2px solid #a78bfa' }}
        >
          <span className="font-mono text-xs font-bold text-white">Capas</span>
        </div>
        <div className="px-3 pb-1.5 pt-1">
          <span className="font-mono text-xs" style={{ color: '#8a8a8a' }}>Canales</span>
        </div>
        <div className="px-3 pb-1.5 pt-1">
          <span className="font-mono text-xs" style={{ color: '#8a8a8a' }}>Trazados</span>
        </div>
      </div>

      {/* 2) Fila de filtro */}
      <div
        className="flex items-center gap-2 px-2 py-1.5"
        style={{ borderBottom: '1px solid #4a4a4a' }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <div className="flex items-center gap-0.5" style={{ color: '#8a8a8a' }}>
          <span className="font-mono text-[10px]">Tipo</span>
          <ChevronDown />
        </div>
      </div>

      {/* 3) Fila blend mode */}
      <div
        className="flex items-center gap-2 px-2 py-1.5"
        style={{ borderBottom: '1px solid #4a4a4a' }}
      >
        <div className="flex items-center gap-0.5" style={{ color: '#c0c0c0' }}>
          <span className="font-mono text-[10px]">Normal</span>
          <ChevronDown />
        </div>
        <span className="font-mono text-[10px]" style={{ color: '#5a5a5a' }}>|</span>
        <span className="font-mono text-[10px]" style={{ color: '#c0c0c0' }}>Opacidad: 100%</span>
      </div>

      {/* 4) Lista de capas */}
      <ul className="flex flex-col">
        {LAYERS.map(({ id, name }) => {
          const isActive = active === id
          return (
            <li
              key={id}
              onClick={() => scrollTo(id)}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-colors duration-100"
              style={{
                background: isActive ? 'rgba(124,58,237,0.25)' : 'transparent',
                borderBottom: '1px solid #2f2f2f',
              }}
            >
              {/* Ojo */}
              <span style={{ color: isActive ? '#c0c0c0' : '#6a6a6a', flexShrink: 0 }}>
                <EyeIcon open={isActive} />
              </span>

              {/* Thumbnail */}
              <div
                className="flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: '#5a5a5a',
                  border: '1px solid #6a6a6a',
                }}
              />

              {/* Nombre */}
              <span
                className="font-mono text-xs truncate flex-1"
                style={{ color: isActive ? '#ffffff' : '#a0a0a0' }}
              >
                {name}
              </span>

              {/* Candado */}
              <span style={{ color: '#6a6a6a', flexShrink: 0 }}>
                <LockIcon />
              </span>
            </li>
          )
        })}
      </ul>

      {/* 5) Barra inferior */}
      <div
        className="flex items-center justify-center gap-4 px-2 py-2"
        style={{ borderTop: '1px solid #4a4a4a', background: '#3a3a3a' }}
      >
        {/* Link */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {/* Fx */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        {/* Máscara */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
        {/* Carpeta */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        {/* Basura */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </div>
    </aside>
  )
}
