/**
 * Textura de grano sutil y ESTÁTICA (no reactiva a scroll/mouse) sobre todo
 * el sitio. Generada con SVG feTurbulence vía data-URI: no descarga ninguna
 * imagen y no corre JS, así que el costo de rendimiento es prácticamente
 * cero — un solo paint, sin listeners.
 */
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        opacity: 0.045,
        mixBlendMode: 'overlay',
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
