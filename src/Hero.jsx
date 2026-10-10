import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { TRUST } from '../content'
import { useQuote } from '../quote'
import Magnetic from './Magnetic'
import { Leaf } from './Logo'

const LINES = ['Batter made', 'the slow way,', 'delivered fresh.']
const lineV = { hidden: { y: '115%' }, show: (i) => ({ y: 0, transition: { duration: 0.95, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 + i * 0.13 } }) }
const fadeUp = (d) => ({ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: d } } })
const BADGES = [
  { text: '100% natural', cls: 'b1', depth: 38, delay: 1.1 },
  { text: 'No preservatives', cls: 'b2', depth: -30, delay: 1.25 },
  { text: 'RO purified water', cls: 'b3', depth: 46, delay: 1.4 },
  { text: 'Naturally fermented', cls: 'b4', depth: -40, delay: 1.55 },
]
const LEAVES = Array.from({ length: 10 }, (_, i) => ({ left: 4 + ((i * 11) % 92), size: 16 + ((i * 7) % 20), delay: -((i * 2.3) % 14), dur: 14 + ((i * 3) % 9) }))

function BadgeChip({ text, cls, depth, delay, sx, reduce, ready }) {
  const x = useTransform(sx, [-0.5, 0.5], [-depth, depth])
  return (
    <motion.div className={`badge ${cls}`} style={{ x }}>
      <motion.span initial={{ scale: 0, opacity: 0, rotate: -12 }} animate={ready ? { scale: 1, opacity: 1, rotate: 0 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 14, delay }}>
        <motion.span className="badge-float" animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 4 + (Math.abs(depth) % 3), repeat: Infinity, ease: 'easeInOut', delay }}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#3fa535" /><path d="M5.5 10.5l3 3 6-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {text}
        </motion.span>
      </motion.span>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const { open } = useQuote()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 18 })
  const sy = useSpring(my, { stiffness: 70, damping: 18 })
  const imgX = useTransform(sx, [-0.5, 0.5], [22, -22])
  const imgY = useTransform(sy, [-0.5, 0.5], [12, -12])
  const state = ready ? 'show' : 'hidden'
  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }
  return (
    <section id="top" className="hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-pattern" aria-hidden="true" />
      {!reduce && (
        <div className="leaves" aria-hidden="true">
          {LEAVES.map((l, i) => (<span key={i} style={{ left: `${l.left}%`, width: l.size, animationDelay: `${l.delay}s`, animationDuration: `${l.dur}s` }}><Leaf /></span>))}
        </div>
      )}
      <div className="hero-copy">
        <motion.p className="hero-kicker" variants={fadeUp(0)} initial="hidden" animate={state}>Idli &amp; dosa batter from Chennai, since 2016</motion.p>
        <h1 className="hero-title" aria-label={LINES.join(' ')}>
          {LINES.map((t, i) => (<span className="line" key={t} aria-hidden="true"><motion.span custom={i} variants={lineV} initial="hidden" animate={state}>{t}</motion.span></span>))}
        </h1>
        <motion.p className="hero-sub" variants={fadeUp(0.7)} initial="hidden" animate={state}>
          Naturally fermented, made with RO purified water and no preservatives, for soft idlis and crispy dosas. We supply caterers, hotels, hospitals and institutions across Chennai.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp(0.9)} initial="hidden" animate={state}>
          <Magnetic><button className="btn btn-lime btn-lg" onClick={open}>Request bulk supply</button></Magnetic>
          <Magnetic><a href="#plate" className="btn btn-ghost btn-lg">Explore the plate</a></Magnetic>
        </motion.div>
      </div>
      <div className="hero-media-wrap">
        <motion.div className="hero-media" initial={{ scale: 0.88, opacity: 0, y: 60 }} animate={ready ? { scale: 1, opacity: 1, y: 0 } : {}} transition={{ duration: 1.5, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}>
          <motion.img src="/images/hero.jpg" alt="Sridhi batter pack with dosa, idlis, sambar and chutneys on a wooden table" style={{ x: imgX, y: imgY }} width="1981" height="793" fetchPriority="high" />
          <span className="shine" aria-hidden="true" />
        </motion.div>
        <motion.div className="stamp" initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={ready ? { scale: 1, rotate: 0, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 1.7 }} aria-hidden="true">
          <svg viewBox="0 0 160 160" className="stamp-ring"><defs><path id="circ" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" /></defs><text><textPath href="#circ" textLength="382" lengthAdjust="spacing">Naturally fermented · No preservatives · Chennai ·</textPath></text></svg>
          <svg viewBox="0 0 40 60" className="stamp-leaf"><path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="#3fa535" /><path d="M20 14v40" stroke="#e4ee2b" strokeWidth="3" strokeLinecap="round" /></svg>
        </motion.div>
        {BADGES.map((b) => (<BadgeChip key={b.text} {...b} sx={sx} reduce={reduce} ready={ready} />))}
      </div>
    </section>
  )
}

export function TrustStrip() {
  const items = [...TRUST, ...TRUST, ...TRUST]
  return (
    <div className="trust" aria-label="Sridhi promises">
      <div className="trust-track">
        {items.map((t, i) => (<span key={i} className="trust-item"><svg viewBox="0 0 40 60" width="12" height="18" aria-hidden="true"><path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="currentColor" /></svg>{t}</span>))}
      </div>
    </div>
  )
}
