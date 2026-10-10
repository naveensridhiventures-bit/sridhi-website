import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'

const SPOTS = [
  { id: 'pack', x: 50, y: 33, title: 'Premium Idli & Dosa Batter', text: 'Ready to pour. Naturally fermented.' },
  { id: 'idli', x: 26, y: 86, title: 'Soft idlis', text: 'Fluffy and light, steamed fresh from the batter.' },
  { id: 'dosa', x: 76, y: 80, title: 'Crispy dosas', text: 'Golden, crisp, and easy to spread thin.' },
  { id: 'sambar', x: 84, y: 54, title: 'Made for your sambar', text: 'Pair with sambar and chutneys of your choice.' },
]

const STEPS_COOK = [
  ['Open the pack', 'No soaking and no grinding needed.'],
  ['Pour or steam', 'Spread on a hot tawa for dosa, or fill idli moulds.'],
  ['Serve fresh', 'Soft idlis and crispy dosas, the way they should be.'],
]

export default function Showcase() {
  const ref = useRef(null)
  const [open, setOpen] = useState('pack')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })
  const rotate = useTransform(p, [0, 1], [7, 0])
  const scale = useTransform(p, [0, 1], [0.82, 1])
  const radius = useTransform(p, [0, 1], [90, 36])
  const current = SPOTS.find((s) => s.id === open)

  return (
    <section className="showcase" ref={ref}>
      <div className="wrap showcase-grid">
        <div className="showcase-copy">
          <h2>Open the pack. Pour. Cook.</h2>
          <ol className="cook">
            {STEPS_COOK.map(([t, d], i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <strong>{t}</strong>
                <span>{d}</span>
              </motion.li>
            ))}
          </ol>
          <p className="hint">Tap a dot on the photo to explore.</p>
          <div className="tip-slot">
            <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="hot-tip"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <strong>{current.title}</strong>
              <span>{current.text}</span>
            </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <motion.div className="showcase-frame" style={{ rotate, scale, borderRadius: radius }}>
          <img src="/images/lifestyle.jpg" alt="Sridhi batter pack with idlis, dosa, sambar and chutney" />
          {SPOTS.map((s) => (
            <button
              key={s.id}
              className={`hot ${open === s.id ? 'on' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onClick={() => setOpen(s.id)}
              onMouseEnter={() => setOpen(s.id)}
              onFocus={() => setOpen(s.id)}
              aria-label={s.title}
            >
              <span />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
