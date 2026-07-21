import { motion } from 'framer-motion'

const CLIENTES = [
  {
    id: 1,
    handle: 'karly.baptista',
    subtitulo: 'K A R L Y  |  Nutrición | Mentalidad',
    categoria: 'Sports & Fitness Instruction',
    stats: { publicaciones: '690', seguidores: '7061', siguiendo: '1300' },
    bio: [
      '🚩Ayudo a mujeres +40 a que se les caigan los patalones en 21 días',
      '💚+300 mujeres transformaron su metabolismo',
      'Empezá aquí ⬇️',
    ],
    link: 'metabolicresetcoach.com',
    instagramUrl: 'https://www.instagram.com/karly.baptista',
    foto: '/clientes/karly.png',
  },
  {
    id: 2,
    handle: 'yulenegaleratrillas',
    subtitulo: 'Yulene Galera',
    categoria: 'Motivational speaker',
    stats: { publicaciones: '785', seguidores: '121 mil', siguiendo: '2432' },
    bio: [
      'Te guío a encontrar la fuerza de tu voz y así cambiar tu vida',
      '🔥Co-founder @storytellher.mx',
      '🔥Comunicadora cuántica',
      '🎤Speaker Motivacional',
    ],
    link: 'linktr.ee/thewildflowersmx',
    instagramUrl: 'https://www.instagram.com/yulenegaleratrillas',
    foto: '/clientes/yulene.png',
  },
  {
    id: 3,
    handle: 'seba.spinassi',
    subtitulo: 'Sebastian Spinassi',
    categoria: 'Entrepreneur',
    stats: { publicaciones: '7', seguidores: '34,1 mil', siguiendo: '891' },
    bio: [
      '📌MAYORISTA DE PERFUMES',
      '@Lurux.perfumes (+22mil Seg.) ❌👈 Cuenta Bajada',
      '⭐+3.500 Referencias',
      '📲Mira la info y Unite al Grupo 👇',
    ],
    link: 'luruxperfumes.com',
    instagramUrl: 'https://www.instagram.com/seba.spinassi',
    foto: '/clientes/sebastian.png',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3897f0" className="flex-shrink-0">
      <path d="M12 0l2.39 2.42 3.34-.68.6 3.36 3.36.6-.68 3.34L23 12l-2.39 2.42.68 3.34-3.36.6-.6 3.36-3.34-.68L12 24l-2.39-2.42-3.34.68-.6-3.36-3.36-.6.68-3.34L1 12l2.39-2.42-.68-3.34 3.36-.6.6-3.36 3.34.68z" />
      <path d="M9.7 12.4l1.8 1.8 3.4-4.2" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClienteCard({ cliente, i }) {
  return (
    <motion.a
      {...fadeUp(0.1 + i * 0.1)}
      href={cliente.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver perfil de Instagram de ${cliente.handle}`}
      whileHover={{ y: -5, boxShadow: '0 14px 32px rgba(0,0,0,0.6)', transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
      className="group rounded-lg overflow-hidden border border-[#3a3a3a] hover:border-accent focus:border-accent focus:outline-none transition-colors duration-200 flex flex-col"
    >
      {/* Barra superior estilo ventana */}
      <div className="bg-[#2a2a2a] px-3 py-2 flex items-center justify-between flex-shrink-0">
        <span className="font-mono text-[10px] text-white truncate">@{cliente.handle}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#5f5e5a' }} />
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#1e1e1e] p-5 flex-1 flex flex-col">

        {/* Header: foto + nombre */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={cliente.foto}
            alt={`Foto de perfil de Instagram de ${cliente.handle}`}
            loading="lazy"
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base truncate">{cliente.handle}</span>
              <VerifiedBadge />
            </div>
            <p className="text-white/70 text-xs mt-1 leading-snug">{cliente.subtitulo}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3 font-mono" style={{ fontSize: 11 }}>
          <span className="text-white"><b>{cliente.stats.publicaciones}</b> <span style={{ color: '#8a8a8a' }}>publicaciones</span></span>
          <span className="text-white"><b>{cliente.stats.seguidores}</b> <span style={{ color: '#8a8a8a' }}>seguidores</span></span>
          <span className="text-white"><b>{cliente.stats.siguiendo}</b> <span style={{ color: '#8a8a8a' }}>seguidos</span></span>
        </div>

        {/* Categoria */}
        <p className="font-mono text-[10px] tracking-wide mb-2" style={{ color: '#8a8a8a' }}>{cliente.categoria}</p>

        {/* Bio */}
        <div className="flex flex-col gap-0.5 mb-3">
          {cliente.bio.map((linea, idx) => (
            <p key={idx} className="text-white/85 text-xs leading-snug">{linea}</p>
          ))}
        </div>

        {/* Link */}
        <p className="text-accent-light text-xs mt-auto pt-2 truncate">🔗 {cliente.link}</p>
      </div>
    </motion.a>
  )
}

export default function Clientes() {
  return (
    <section id="clientes" className="relative py-20 px-6">
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        <motion.h2
          {...fadeUp(0)}
          className="font-bold text-3xl md:text-4xl text-base-ink text-center"
        >
          Clientes
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-base-muted text-sm text-center mt-3 mb-10"
        >
          Creadores y marcas que confían en mi edición.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENTES.map((cliente, i) => (
            <ClienteCard key={cliente.id} cliente={cliente} i={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
