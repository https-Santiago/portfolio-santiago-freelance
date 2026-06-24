import { motion } from 'framer-motion'

const WA_LINK = `https://wa.me/5493464692656?text=${encodeURIComponent('Hola Santiago! Vi tu portfolio y quiero consultarte sobre edición de video.')}`

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const PHOTO_RATIO = 0.5
const PHOTO_H_VH = 92
const PHOTO_W_VH = PHOTO_H_VH * PHOTO_RATIO  // 46vh

/* Polígonos a mano que aproximan el contorno del cuerpo. */
const siluetaBase = {
  width: `${PHOTO_W_VH}vh`,
  height: `${PHOTO_H_VH}vh`,
  shapeOutside: 'url(/foto-santiago.webp)',
  shapeImageThreshold: 0.5,
  shapeMargin: '50px',
  opacity: 0,
  pointerEvents: 'none',
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-base">

      {/* Grilla decorativa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ═══════ LAYOUT MOBILE (apilado, < lg) ═══════ */}
      <div className="lg:hidden relative z-30 flex flex-col items-center px-6 pt-12 pb-16 min-h-screen">
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold text-base-ink text-center"
          style={{ fontSize: 'clamp(1.7rem, 8vw, 2.4rem)', lineHeight: 1.1 }}
        >
          <span>Cada detalle cuenta,</span>
          <br />
          <span className="text-accent" style={{ fontSize: 'clamp(2rem, 9vw, 2.9rem)' }}>
            y yo me ocupo de eso.
          </span>
        </motion.h1>

        <motion.img
          {...fadeUp(0.05)}
          src="/foto-santiago.webp"
          alt="Santiago Ferlatti"
          className="object-contain object-top mt-6 mb-2"
          style={{
            height: '46vh',
            maxHeight: 360,
            width: 'auto',
            maxWidth: '100%',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.4))',
          }}
        />

        <motion.p
          {...fadeUp(0.2)}
          className="text-base-muted leading-relaxed text-center text-base mt-2 max-w-md"
        >
          Soy editor de video con 2 años de experiencia. Me enfoco en los detalles —color, audio, ritmo— para que cada proyecto salga lo mejor posible. Trabajo con Premiere, After Effects y Photoshop.
        </motion.p>

        <motion.a
          {...fadeUp(0.3)}
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3.5 rounded-lg text-sm transition-colors duration-200 w-full max-w-xs"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Hablemos por WhatsApp
        </motion.a>

        <motion.div {...fadeUp(0.4)} className="flex gap-10 mt-8">
          {[
            { value: '+2', label: 'años de experiencia' },
            { value: '+30', label: 'proyectos entregados' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-0.5 text-center">
              <span className="text-accent font-bold" style={{ fontSize: '1.7rem' }}>
                {value}
              </span>
              <span className="text-base-muted text-xs leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══════ CAPA 1: FOTO (desktop ≥ lg) ═══════ */}
      <div className="hidden lg:flex absolute inset-0 items-start justify-center pointer-events-none">
        <motion.img
          {...fadeUp(0.05)}
          src="/foto-santiago.webp"
          alt="Santiago Ferlatti"
          className="relative object-contain object-top"
          style={{
            height: `${PHOTO_H_VH}vh`,
            width: 'auto',
            maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
            filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.4))',
            imageRendering: 'auto',
            zIndex: 10,
          }}
        />
      </div>

      {/* ═══════ CAPA 2: TEXTO IZQUIERDO (desktop ≥ lg) ═══════ */}
      <motion.div
        className="hidden lg:flex absolute left-0 top-0 pl-8 lg:pl-12 pr-4 flex-col"
        style={{ width: `calc(50% + ${PHOTO_W_VH / 2}vh)`, height: '100vh', overflow: 'visible', zIndex: 40 }}
        initial="initial"
        animate="animate"
      >
        <div style={{ paddingTop: '24vh', maxWidth: '50vw' }}>
          {/* Silueta invisible que reproduce la foto y define el contorno IZQUIERDO */}
          <div
            aria-hidden="true"
            style={{ ...siluetaBase, float: 'right' }}
          />

          <motion.h1
            {...fadeUp(0.1)}
            className="font-bold text-base-ink"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3.4rem)',
              lineHeight: 1.05,
              textShadow: '0 2px 20px rgba(30,30,30,0.8)',
            }}
          >
            <span>Cada detalle cuenta,</span>
            <br />
            <span
              className="text-accent"
              style={{ fontSize: 'clamp(2.3rem, 4.6vw, 4.2rem)' }}
            >
              y yo me ocupo de eso.
            </span>
          </motion.h1>
        </div>

        {/* CTA + stats anclados al fondo del bloque (absolute) para no depender del flow del float */}
        <div
          className="absolute bottom-[12vh] left-0 right-0 pl-8 lg:pl-12 pr-4 flex flex-col gap-6"
          style={{ zIndex: 50 }}
        >
          <motion.a
            {...fadeUp(0.3)}
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hablemos por WhatsApp
          </motion.a>

          <motion.div {...fadeUp(0.4)} className="flex gap-8">
            {[
              { value: '+2', label: 'años de experiencia' },
              { value: '+30', label: 'proyectos entregados' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-accent font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                  {value}
                </span>
                <span className="text-base-muted text-xs leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════ CAPA 3: TEXTO DERECHO ═══════ */}
      <motion.div
        {...fadeUp(0.25)}
        className="hidden lg:block absolute right-0 top-0 pr-[300px] pl-4"
        style={{ width: 'calc(50% + 38vh)', height: '100vh', overflow: 'visible', zIndex: 40 }}
      >
        <div style={{ paddingTop: '7vh' }}>
          {/* Silueta float-left que define el lado DERECHO del cuerpo */}
          <div
            aria-hidden="true"
            style={{ ...siluetaBase, float: 'left', marginLeft: '15vh' }}
          />
          <p
            className="text-base-muted leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.35rem)',
              textShadow: '0 2px 20px rgba(30,30,30,0.8)',
            }}
          >
            Soy editor de video con 2 años de experiencia. Me enfoco en los detalles —color, audio, ritmo— para que cada proyecto salga lo mejor posible. Trabajo con Premiere, After Effects y Photoshop.
          </p>
        </div>
      </motion.div>

      {/* ═══════ FADE de transición hacia la siguiente sección ═══════ */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30vh',
          background: 'linear-gradient(to top, #1a1a1a 0%, #1a1a1a 15%, rgba(26,26,26,0.6) 55%, transparent 100%)',
          zIndex: 25,
        }}
      />

    </section>
  )
}
