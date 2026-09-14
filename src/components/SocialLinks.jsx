export const SOCIALS = {
  x: 'https://x.com/EditorSantiagoo',
  instagram: 'https://instagram.com/santiferlatti',
  tiktok: 'https://www.tiktok.com/@santiferlatti',
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
      <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 3c.3 2.2 1.9 4 4.1 4.4v2.8a7.7 7.7 0 0 1-4.1-1.2v6.2a6 6 0 1 1-6-6c.3 0 .6 0 .9.07v2.9a3.1 3.1 0 1 0 2.2 3V3h2.9z" />
    </svg>
  )
}

/**
 * Links a redes. variant: 'light' (sobre fondo oscuro) por defecto.
 */
export default function SocialLinks({ className = '', iconClassName = '' }) {
  const base = `inline-flex items-center justify-center w-10 h-10 rounded-lg border border-base-border text-base-muted hover:text-accent hover:border-accent focus:text-accent focus:border-accent focus:outline-none transition-colors duration-200 ${iconClassName}`
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" aria-label="X de Santiago Ferlatti" className={base}>
        <XIcon />
      </a>
      <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Santiago Ferlatti" className={base}>
        <InstagramIcon />
      </a>
      <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Santiago Ferlatti" className={base}>
        <TikTokIcon />
      </a>
    </div>
  )
}
