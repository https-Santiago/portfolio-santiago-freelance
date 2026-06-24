const TOOLS = [
  /* Cursor de selección */
  <svg key="cursor" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 2l16 10-7 1.5L9 21z" />
  </svg>,
  /* Mano / pan */
  <svg key="hand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-4 0v5" />
    <path d="M14 10V4a2 2 0 0 0-4 0v6" />
    <path d="M10 10V5a2 2 0 0 0-4 0v9" />
    <path d="M6 14a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2.5" />
  </svg>,
  /* Lupa / zoom */
  <svg key="zoom" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>,
  /* Recorte */
  <svg key="crop" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2v14a2 2 0 0 0 2 2h14" />
    <path d="M18 22V8a2 2 0 0 0-2-2H2" />
  </svg>,
  /* Pincel */
  <svg key="brush" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1 3.5 1 1.66 0 3-1.34 3-3s-1.34-3.04-1.5-3.04z" />
  </svg>,
  /* Texto */
  <svg key="text" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>,
]

export default function TopToolbar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4"
      style={{ background: '#2a2a2a', borderBottom: '1px solid #3a3a3a' }}
    >
      {/* Herramientas izquierda */}
      <div className="flex items-center gap-3">
        {TOOLS.map((icon) => (
          <button
            key={icon.key}
            className="flex items-center justify-center rounded transition-colors duration-150"
            style={{ width: 28, height: 28, color: '#8a8a8a' }}
            onMouseEnter={e => e.currentTarget.style.background = '#3a3a3a'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Nombre de archivo — solo desktop */}
      <span className="hidden md:block font-mono text-xs" style={{ color: '#6a6a6a' }}>
        portfolio_santiago.prproj — Adobe Premiere Pro
      </span>

      {/* Zoom level */}
      <span className="font-mono text-xs" style={{ color: '#8a8a8a' }}>
        100%
      </span>
    </div>
  )
}
