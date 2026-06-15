export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="rB" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8cce0"/>
          <stop offset="40%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#7a9cbd"/>
        </linearGradient>
        <linearGradient id="fG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff9d4d"/>
          <stop offset="55%" stopColor="#ff6b00"/>
          <stop offset="100%" stopColor="#ff6b0000"/>
        </linearGradient>
        <linearGradient id="fG2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff0a0"/>
          <stop offset="100%" stopColor="#fff0a000"/>
        </linearGradient>
        <linearGradient id="noseG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c0d4e8"/>
          <stop offset="50%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#8aafc8"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="1000" height="1000" rx="120" fill="#02050d"/>

      {/* Rings */}
      <circle cx="500" cy="500" r="434" fill="none" stroke="#ff6b00" strokeWidth="1" opacity="0.11"/>
      <circle cx="500" cy="500" r="375" fill="none" stroke="#7eb8ff" strokeWidth="1.4" opacity="0.16"/>
      <circle cx="500" cy="500" r="294" fill="none" stroke="#ff6b00" strokeWidth="1.8" opacity="0.22"/>
      <circle cx="500" cy="500" r="209" fill="none" stroke="#7eb8ff" strokeWidth="1" opacity="0.13"/>
      <circle cx="500" cy="500" r="121" fill="none" stroke="#ff6b00" strokeWidth="0.8" opacity="0.10"/>

      {/* Grid */}
      <line x1="500" y1="64" x2="500" y2="936" stroke="#7eb8ff" strokeWidth="0.7" opacity="0.07"/>
      <line x1="64" y1="500" x2="936" y2="500" stroke="#7eb8ff" strokeWidth="0.7" opacity="0.07"/>

      {/* Ticks */}
      <line x1="500" y1="64" x2="500" y2="82" stroke="#ff6b00" strokeWidth="1.8" opacity="0.4"/>
      <line x1="500" y1="918" x2="500" y2="936" stroke="#ff6b00" strokeWidth="1.8" opacity="0.4"/>
      <line x1="64" y1="500" x2="82" y2="500" stroke="#ff6b00" strokeWidth="1.8" opacity="0.4"/>
      <line x1="918" y1="500" x2="936" y2="500" stroke="#ff6b00" strokeWidth="1.8" opacity="0.4"/>
      <circle cx="500" cy="64" r="3.8" fill="#ff6b00" opacity="0.6"/>
      <circle cx="500" cy="936" r="3.8" fill="#ff6b00" opacity="0.6"/>
      <circle cx="64" cy="500" r="3.8" fill="#ff6b00" opacity="0.6"/>
      <circle cx="936" cy="500" r="3.8" fill="#ff6b00" opacity="0.6"/>

      {/* Stars */}
      <circle cx="838" cy="213" r="3" fill="#ffffff" opacity="0.35"/>
      <circle cx="174" cy="272" r="2.2" fill="#ffffff" opacity="0.3"/>
      <circle cx="794" cy="721" r="2.6" fill="#ffffff" opacity="0.3"/>
      <circle cx="676" cy="130" r="2.6" fill="#ffffff" opacity="0.28"/>
      <circle cx="770" cy="500" r="5.8" fill="#7eb8ff" opacity="0.6"/>
      <circle cx="230" cy="500" r="4.4" fill="#ff6b00" opacity="0.45"/>
      <circle cx="618" cy="247" r="3.7" fill="#ff6b00" opacity="0.5"/>

      {/* Rocket — flames */}
      <ellipse cx="500" cy="656" rx="19" ry="53" fill="url(#fG)" opacity="0.88"/>
      <ellipse cx="500" cy="644" rx="9" ry="28" fill="url(#fG2)" opacity="0.8"/>

      {/* Nozzle */}
      <path d="M 470 612 L 461 635 L 539 635 L 530 612 Z" fill="#5a7a9a" opacity="0.75"/>

      {/* Left fin */}
      <rect x="444" y="553" width="29" height="56" rx="3" fill="#8aabcc"/>
      <rect x="435" y="582" width="38" height="29" rx="3" fill="#7a9cbd"/>
      {/* Right fin */}
      <rect x="527" y="553" width="29" height="56" rx="3" fill="#8aabcc"/>
      <rect x="527" y="582" width="38" height="29" rx="3" fill="#7a9cbd"/>

      {/* Body */}
      <rect x="468" y="316" width="64" height="298" rx="6" fill="url(#rB)"/>
      <line x1="468" y1="441" x2="532" y2="441" stroke="#8aabcc" strokeWidth="1.5" opacity="0.5"/>
      <line x1="468" y1="500" x2="532" y2="500" stroke="#8aabcc" strokeWidth="1.2" opacity="0.35"/>

      {/* Nose */}
      <path d="M 500 247 L 468 316 L 532 316 Z" fill="url(#noseG)"/>
      <rect x="491" y="238" width="18" height="15" rx="3" fill="#ddeeff"/>

      {/* Window */}
      <rect x="478" y="365" width="44" height="32" rx="7" fill="#02050d" opacity="0.85"/>
      <rect x="478" y="365" width="44" height="32" rx="7" fill="none" stroke="#7eb8ff" strokeWidth="2.2" opacity="0.8"/>
      <rect x="484" y="371" width="32" height="20" rx="4" fill="#7eb8ff" opacity="0.2"/>

      {/* Orange stripes */}
      <rect x="468" y="530" width="64" height="7" rx="1.5" fill="#ff6b00" opacity="0.75"/>
      <rect x="468" y="543" width="64" height="3" rx="1" fill="#ff6b00" opacity="0.35"/>
    </svg>
  )
}
