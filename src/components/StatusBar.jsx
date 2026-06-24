export default function StatusBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 h-7 flex items-center justify-between px-4"
      style={{ background: '#2a2a2a', borderTop: '1px solid #3a3a3a' }}
    >
      {/* Estado izquierda */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="font-mono text-[10px]" style={{ color: '#6a6a6a' }}>Listo para exportar</span>
      </div>

      {/* Specs — solo desktop */}
      <span className="hidden md:block font-mono text-[10px]" style={{ color: '#6a6a6a' }}>
        1920x1080 · 30fps · H.264
      </span>

      {/* Ubicación derecha */}
      <span className="font-mono text-[10px]" style={{ color: '#6a6a6a' }}>
        Rosario, Argentina
      </span>
    </div>
  )
}
