import { motion } from 'framer-motion'
import fotoSebastian from '../assets/testimonios/sebastian.jpg'
import fotoRafael from '../assets/testimonios/rafael.jpg'
import fotoFabrizio from '../assets/testimonios/fabrizio.jpg'
import fotoKarly from '../assets/testimonios/karly.jpg'
import capturaSebastian from '../assets/testimonios/sebastian-chat.jpg'
import capturaRafael from '../assets/testimonios/rafael-chat.jpg'
import capturaFabrizio from '../assets/testimonios/fabrizio-chat.jpg'
import capturaSebasStruck from '../assets/testimonios/sebasstruck-chat.jpg'
import capturaKarly from '../assets/testimonios/karly-chat.jpg'

/* Capturas reales de WhatsApp, publicadas con permiso de cada cliente. */
const TESTIMONIOS = [
  {
    nombre: 'Sebastián S.',
    mensaje: 'Pfff quedaron tremendos, amigo 🔥',
    foto: fotoSebastian,
    captura: capturaSebastian,
  },
  {
    nombre: 'Rafael C.',
    mensaje: 'Trabajás muy bien, así que seguro te paso video de otras personas para que puedas sumar más 💪',
    foto: fotoRafael,
    captura: capturaRafael,
  },
  {
    nombre: 'Fabrizio M.',
    mensaje: 'Épico el reel 5, mientras lo veía pensaba: "acá hay buen reel" 😎. El 6 también.',
    foto: fotoFabrizio,
    captura: capturaFabrizio,
  },
  {
    nombre: 'Sebas Struck',
    mensaje: '¡Super! Lo veo muy bien.',
    foto: null,
    captura: capturaSebasStruck,
  },
  {
    nombre: 'Karly',
    mensaje: 'Me encantó. Buen trabajo 👏',
    foto: fotoKarly,
    captura: capturaKarly,
  },
]

const AVATAR_COLORS = ['#c8ff00', '#7eb8ff', '#a78bfa', '#ff6b00', '#9FE1CB']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function WhatsAppIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function Avatar({ nombre, foto, color }) {
  if (foto) {
    return (
      <img
        src={foto}
        alt={nombre}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
      />
    )
  }
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{ background: `${color}22`, color, fontSize: 10 }}
    >
      {nombre.charAt(0)}
    </div>
  )
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto w-full">

        <motion.h2
          {...fadeUp(0)}
          className="font-bold text-3xl md:text-4xl text-base-ink text-center mb-10"
        >
          Lo que dicen mis clientes
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIOS.map(({ nombre, mensaje, foto, captura }, i) => (
            <motion.div
              key={nombre}
              {...fadeUp(0.08 + i * 0.07)}
              whileHover={{ y: -5, boxShadow: '0 14px 32px rgba(0,0,0,0.6)', transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="rounded-lg overflow-hidden flex flex-col"
              style={{ border: '1px solid #3a3a3a', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {/* Header — cada card es su propia "ventana" de chat */}
              <div
                className="px-3 py-2 flex items-center gap-2"
                style={{ background: '#2a2a2a', borderBottom: '1px solid #3a3a3a' }}
              >
                <Avatar nombre={nombre} foto={foto} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
                <span className="font-mono text-xs text-white truncate flex-1">{nombre}</span>
                <span style={{ color: '#3ea36b' }} aria-hidden="true">
                  <WhatsAppIcon />
                </span>
              </div>

              {/* Body: captura real de WhatsApp */}
              <div className="flex-1 flex items-center" style={{ background: '#1e1e1e' }}>
                <img
                  src={captura}
                  alt={`Mensaje de ${nombre}: ${mensaje}`}
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
