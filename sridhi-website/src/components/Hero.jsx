import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { TRUST } from '../data'

const LINES = ['Batter made', 'the slow way,', 'delivered fresh.']

const lineV = {
  hidden: { y: '115%' },
  show: (i) => ({ y: 0, transition: { duration: 0.95, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 + i * 0.13 } }),
}

const BADGES = [
  { text: '100% natural', cls: 'b1', depth: 38, delay: 1.5 },
  { text: 'No preservatives', cls: 'b2', depth: -30, delay: 1.65 },
  { text: 'RO purified water', cls: 'b3', depth: 46, delay: 1.8 },
  { text: 'Naturally fermented', cls: 'b4', depth: -40, delay: 1.95 },
]

const LEAVES = Array.from({ length: 9 }, (_, i) => ({
  left: 4 + ((i * 11) % 92),
  size: 18 + ((i * 7) % 20),
  delay: -((i * 2.3) % 14),
  dur: 14 + ((i * 3) % 9),
}))

function Leaf() {
  return (
    <svg viewBox="0 0 40 60" aria-hidden="true">
      <path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="currentColor" />
      <path d="M20 12v42" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12])
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40])
  const glowY = useTransform(sy, [-0.5, 0.5], [-30, 30])

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section id="top" className="hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-pattern" aria-hidden="true" />
      {!reduce && (
        <div className="leaves" aria-hidden="true">
          {LEAVES.map((l, i) => (
            <span
              key={i}
              style={{
                left: `${l.left}%`,
                width: l.size,
                animationDelay: `${l.delay}s`,
                animationDuration: `${l.dur}s`,
              }}
            >
              <Leaf />
            </span>
          ))}
        </div>
      )}

      <div className="hero-inner">
        <div className="hero-copy">
          <motion.p
            className="hero-kicker"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Idli &amp; dosa batter from Chennai, since 2016
          </motion.p>
          <h1 className="hero-title" aria-label={LINES.join(' ')}>
            {LINES.map((t, i) => (
              <span className="line" key={t} aria-hidden="true">
                <motion.span custom={i} variants={lineV} initial="hidden" animate="show">
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
          >
            Sridhi batter is naturally fermented, made with RO purified water and no preservatives, for
            soft idlis and crispy dosas. We supply caterers, hotels, hospitals and institutions across Chennai.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <a href="#contact" className="btn btn-lime btn-lg">
              Request bulk supply
            </a>
            <a href="#process" className="btn btn-ghost btn-lg">
              See how we make it
            </a>
          </motion.div>
        </div>

        <div className="hero-stage">
          <motion.div className="stage-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
          <div className="stage-ring" aria-hidden="true" />
          <div className="stage-ring r2" aria-hidden="true" />

          <motion.div
            className="packet-drop"
            initial={{ y: -380, opacity: 0, rotate: -14, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 11, mass: 1.1, delay: 0.55 }}
          >
            <motion.div
              className="packet-tilt"
              style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1100 }}
            >
              <motion.img
                src="/images/packet.png"
                alt="Sridhi Premium Idli & Dosa Batter pack"
                className="packet"
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                width="776"
                height="900"
              />
              <span className="packet-shadow" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {BADGES.map((b) => (
            <BadgeChip key={b.text} {...b} sx={sx} reduce={reduce} />
          ))}
        </div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="wave w2"
          d="M0 80 C 200 40, 400 120, 600 80 S 1000 40, 1200 80 S 1600 120, 1800 80 S 2200 40, 2400 80 V120 H0z"
        />
        <path
          className="wave w1"
          d="M0 60 C 200 10, 400 110, 600 60 S 1000 10, 1200 60 S 1600 110, 1800 60 S 2200 10, 2400 60 V120 H0z"
        />
      </svg>
    </section>
  )
}

function BadgeChip({ text, cls, depth, delay, sx, reduce }) {
  const x = useTransform(sx, [-0.5, 0.5], [-depth, depth])
  return (
    <motion.div className={`badge ${cls}`} style={{ x }}>
      <motion.span
        initial={{ scale: 0, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay }}
        className="badge-body"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 4 + (depth % 3), repeat: Infinity, ease: 'easeInOut', delay: delay }}
          className="badge-float"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="#3fa535" />
            <path d="M5.5 10.5l3 3 6-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {text}
        </motion.span>
      </motion.span>
    </motion.div>
  )
}

export function TrustStrip() {
  const items = [...TRUST, ...TRUST]
  return (
    <div className="trust" aria-label="Sridhi promises">
      <div className="trust-track">
        {items.map((t, i) => (
          <span key={i} className="trust-item">
            <svg viewBox="0 0 40 60" width="14" height="20" aria-hidden="true">
              <path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="currentColor" />
            </svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
