import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FEATURES } from '../content'

const ICONS = {
  leaf: <path d="M6 34C6 16 18 6 36 6c0 18-10 30-28 30M6 34l16-16" />,
  drop: <path d="M21 4c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22z" />,
  bubble: <><circle cx="14" cy="26" r="8" /><circle cx="28" cy="14" r="6" /><circle cx="30" cy="30" r="3" /></>,
  stone: <><ellipse cx="21" cy="14" rx="14" ry="6" /><path d="M7 14v12c0 3 6 6 14 6s14-3 14-6V14" /></>,
  shield: <><path d="M21 4l14 5v10c0 9-6 15-14 18C13 34 7 28 7 19V9z" /><path d="M14 20l5 5 9-10" /></>,
  truck: <><path d="M3 10h22v18H3zM25 16h8l5 6v6H25z" /><circle cx="11" cy="30" r="3" /><circle cx="31" cy="30" r="3" /></>,
}

function Tilt({ f, i }) {
  const ref = useRef(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 }), sry = useSpring(ry, { stiffness: 200, damping: 18 })
  const gx = useMotionValue(50), gy = useMotionValue(50)
  const bg = useTransform([gx, gy], ([x, y]) => `radial-gradient(260px circle at ${x}% ${y}%, rgba(228,238,43,.35), transparent 60%)`)
  const move = (e) => {
    if (e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 14); rx.set((0.5 - py) * 14); gx.set(px * 100); gy.set(py * 100)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div className="tilt-wrap" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}>
      <motion.article ref={ref} className="fcard" style={{ rotateX: srx, rotateY: sry }} onPointerMove={move} onPointerLeave={leave}>
        <motion.span className="glare" style={{ background: bg }} />
        <svg viewBox="0 0 42 42" className="ficon" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[f.icon]}</svg>
        <h3>{f.title}</h3>
        <p>{f.text}</p>
      </motion.article>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <p className="eyebrow">Why Sridhi</p>
        <h2 className="h2">Simple ingredients, done properly</h2>
        <div className="fgrid">{FEATURES.map((f, i) => (<Tilt key={f.title} f={f} i={i} />))}</div>
      </div>
    </section>
  )
}
