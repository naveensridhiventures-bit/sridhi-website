import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { TRUST } from '../content'
import { useQuote } from '../quote'
import Magnetic from './Magnetic'
import { Leaf } from './Logo'

const LINES = ['Batter made', 'the slow way,', 'delivered fresh.']
const lineV = { hidden: { y: '115%' }, show: (i) => ({ y: 0, transition: { duration: 0.95, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 + i * 0.13 } }) }
const fadeUp = (d) => ({ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: d } } })
const BADGES = [
  { text: '100% natural', cls: 'b1', depth: 38, delay: 1.5 },
  { text: 'No preservatives', cls: 'b2', depth: -30, delay: 1.65 },
  { text: 'RO purified water', cls: 'b3', depth: 46, delay: 1.8 },
  { text: 'Naturally fermented', cls: 'b4', depth: -40, delay: 1.95 },
]

function Orb({ kind }) {
  if (kind === 'idli') return (<svg viewBox="0 0 60 44"><ellipse cx="30" cy="38" rx="26" ry="5" fill="rgba(0,0,0,.25)" /><path d="M5 32C5 12 18 4 30 4s25 8 25 28c0 5-8 7-25 7S5 37 5 32z" fill="#fff" /><path d="M12 28c2-12 10-18 18-18" stroke="#e8efe0" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>)
  if (kind === 'dosa') return (<svg viewBox="0 0 60 60"><ellipse cx="30" cy="54" rx="26" ry="5" fill="rgba(0,0,0,.25)" /><path d="M30 4L54 50H6z" fill="#f2b84b" /><path d="M30 4L54 50H30z" fill="#d98f2b" /><path d="M30 14L40 38" stroke="#fff3c4" strokeWidth="2.5" strokeLinecap="round" /></svg>)
  if (kind === 'leaf') return (<svg viewBox="0 0 40 60"><path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="#3fa535" /><path d="M20 12v42" stroke="#e4ee2b" strokeWidth="3" strokeLinecap="round" /></svg>)
  if (kind === 'chilli') return (<svg viewBox="0 0 60 30"><path d="M4 8c14 0 36 2 52 16-20 2-40-2-52-16z" fill="#d6371f" /><path d="M2 6l8 2" stroke="#2f8f2f" strokeWidth="4" strokeLinecap="round" /></svg>)
  return (<svg viewBox="0 0 30 20"><ellipse cx="15" cy="10" rx="12" ry="7" fill="#fffbe3" /><path d="M6 10h18" stroke="#d8cf9a" strokeWidth="2" /></svg>)
}
const ORBITS = [
  { size: 78, dur: 26, items: [['idli', 0, 74], ['grain', 50, 30], ['leaf', 75, 30]] },
  { size: 100, dur: 38, rev: true, items: [['dosa', 12, 76], ['chilli', 62, 66], ['grain', 88, 26]] },
]

function PackStage({ sx, sy, reduce, ready }) {
  const rY = useTransform(sx, [-0.5, 0.5], [-22, 22])
  const rX = useTransform(sy, [-0.5, 0.5], [14, -14])
  return (
    <div className="pack-stage">
      <div className="pack-glow" aria-hidden="true" />
      <div className="pack-ring r1" aria-hidden="true" /><div className="pack-ring r2" aria-hidden="true" />
      {ORBITS.map((o, i) => (
        <div key={i} className={`orbit ${o.rev ? 'rev' : ''}`} style={{ width: `${o.size}%`, height: `${o.size}%`, animationDuration: `${o.dur}s` }} aria-hidden="true">
          {o.items.map(([k, a, w], j) => (
            <span key={j} className="orb" style={{ '--a': `${a * 3.6}deg`, width: k === 'grain' ? 26 : w * 0.95, animationDuration: `${o.dur}s` }}><Orb kind={k} /></span>
          ))}
        </div>
      ))}
      <motion.div className="pack-3d" style={{ rotateX: reduce ? 0 : rX, rotateY: reduce ? 0 : rY }} initial={{ opacity: 0, scale: 0.4, y: 120, rotateZ: -25 }} animate={ready ? { opacity: 1, scale: 1, y: 0, rotateZ: 0 } : {}} transition={{ type: 'spring', stiffness: 70, damping: 11, delay: 0.5 }}>
        <div className="pack-float">
          <img src="/images/pack-cutout-v6.png" alt="Sridhi Premium Idli and Dosa Batter pack" className="pack-img" width="624" height="662" fetchPriority="high" />
          <span className="pack-sheen" aria-hidden="true" />
        </div>
      </motion.div>
      <div className="pack-shadow" aria-hidden="true" />
      {BADGES.map((b) => (<BadgeChip key={b.text} {...b} sx={sx} reduce={reduce} ready={ready} />))}
    </div>
  )
}
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
      <div className="hero-top">
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
      <PackStage sx={sx} sy={sy} reduce={reduce} ready={ready} />
      </div>
      <div className="hero-media-wrap">
        <motion.div className="hero-media" initial={{ scale: 0.88, opacity: 0, y: 60 }} animate={ready ? { scale: 1, opacity: 1, y: 0 } : {}} transition={{ duration: 1.5, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 }}>
          <motion.img src="/images/sridhi-hero-v5.jpg" alt="Sridhi batter pack with dosa, idlis, sambar and chutneys on a wooden table" style={{ x: imgX, y: imgY }} width="1981" height="793" fetchPriority="high" />
          <span className="shine" aria-hidden="true" />
        </motion.div>
        <motion.div className="stamp" initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={ready ? { scale: 1, rotate: 0, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 1.7 }} aria-hidden="true">
          <svg viewBox="0 0 160 160" className="stamp-ring"><defs><path id="circ" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" /></defs><text><textPath href="#circ" textLength="382" lengthAdjust="spacing">Naturally fermented · No preservatives · Chennai ·</textPath></text></svg>
          <svg viewBox="0 0 40 60" className="stamp-leaf"><path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="#3fa535" /><path d="M20 14v40" stroke="#e4ee2b" strokeWidth="3" strokeLinecap="round" /></svg>
        </motion.div>
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
