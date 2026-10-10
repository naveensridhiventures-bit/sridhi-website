import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { HOTSPOTS } from '../content'

export default function PlateZoom() {
  const sec = useRef(null)
  const stage = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)
  const last = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: sec, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [1, 1.5])
  const ox = useTransform(p, [0, 1], [0.15, 0.8])
  const inv = useTransform(scale, (s) => 1 / s)
  useMotionValueEvent(p, 'change', (v) => {
    const idx = v < 0.07 ? null : Math.min(HOTSPOTS.length - 1, Math.floor((v - 0.07) / 0.185))
    if (idx !== last.current) { last.current = idx; setActive(idx) }
  })
  const cur = active != null ? HOTSPOTS[active] : null
  return (
    <section id="plate" className="plate" ref={sec}>
      <div className="plate-sticky">
        <div className="wrap plate-head">
          <p className="eyebrow light">Scroll to zoom in</p>
          <h2>Everything on this plate starts with one batter</h2>
        </div>
        <div className="zoom-stage" ref={stage}>
          <motion.div className="zoom-inner" drag="x" dragConstraints={stage} dragElastic={0.08} style={{ scale, originX: ox }}>
            <img src="/images/hero.jpg" alt="Sridhi batter with dosa, idlis, sambar and chutneys" draggable="false" loading="lazy" />
            {HOTSPOTS.map((h, i) => (
              <motion.button key={h.id} className={`dot ${active === i ? 'on' : ''}`} style={{ left: `${h.x}%`, top: `${h.y}%`, scale: inv }} onClick={() => { last.current = i; setActive(i) }} aria-label={h.title}>
                <span className="dot-core" /><span className="dot-ring" />
              </motion.button>
            ))}
          </motion.div>
        </div>
        <div className="wrap plate-info">
          <AnimatePresence mode="wait">
            <motion.div key={cur ? cur.id : 'hint'} className="pop-card" initial={{ opacity: 0, y: 26, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.97 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
              {cur ? (<><span className="pop-n">0{active + 1}</span><div><h3>{cur.title}</h3><p>{cur.text}</p></div></>) : (<div><h3>Keep scrolling, or tap a dot</h3><p>We zoom in on every part of the plate, one by one.</p></div>)}
            </motion.div>
          </AnimatePresence>
          <div className="pop-dots" aria-hidden="true">{HOTSPOTS.map((h, i) => (<i key={h.id} className={active === i ? 'on' : ''} />))}</div>
        </div>
      </div>
    </section>
  )
}
