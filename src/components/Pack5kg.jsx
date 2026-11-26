import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useQuote } from '../quote'
import Magnetic from './Magnetic'

const POINTS = [
  { t: 'Food-grade packing', d: 'Sealed in food-grade covers using fully automated machinery.' },
  { t: 'Cold-room stored', d: 'Held in a temperature-controlled cold room until dispatch.' },
  { t: 'Delivered on schedule', d: 'Insulated container vehicles, regular supply across Chennai.' },
]

export default function Pack5kg() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [70, -70])
  const { open } = useQuote()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 70, damping: 14 })
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 70, damping: 14 })
  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <section id="pack" className="section dark pack5" ref={ref}>
      <div className="wrap pack5-grid">
        <div className="pack5-stage" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
          <div className="pack5-glow" aria-hidden="true" />
          <div className="pack5-orbit" aria-hidden="true" />
          <motion.div className="pack5-move" style={reduce ? undefined : { y }}>
            <motion.div className="pack5-tilt" style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY }} initial={{ opacity: 0, scale: 0.85, y: 80 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 70, damping: 12 }}>
              <img src="/images/pack-5kg-v14.jpg" alt="Sridhi 5 kg idli and dosa batter pack with rice, batter and fresh idlis" className="pack5-img" loading="lazy" width="1536" height="1024" />
              <span className="pack5-sheen" aria-hidden="true" />
            </motion.div>
            <motion.span className="pack5-seal" initial={{ scale: 0, rotate: -50 }} whileInView={{ scale: 1, rotate: -10 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 140, damping: 11, delay: 0.4 }}><b>5</b>KG</motion.span>
          </motion.div>
          <div className="pack5-shadow" aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow light">The pack our kitchens trust</p>
          <h2 className="h2 light">The 5 kg professional pack.</h2>
          <p className="pack5-p">The exact pack we deliver to hotels and caterers across Chennai. Fresh, naturally fermented batter, ready to pour the moment you open it.</p>
          <ul className="pack5-list">
            {POINTS.map((p, i) => (
              <motion.li key={p.t} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.15, duration: 0.6 }}>
                <i><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M5.5 10.5l3 3 6-7" stroke="#0b3d1e" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></i>
                <div><h3>{p.t}</h3><p>{p.d}</p></div>
              </motion.li>
            ))}
          </ul>
          <Magnetic><button className="btn btn-lime btn-lg" onClick={open}>Request 5 kg supply</button></Magnetic>
        </div>
      </div>
    </section>
  )
}
