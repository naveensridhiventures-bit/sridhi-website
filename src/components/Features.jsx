import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FEATURES } from '../content'

const ICONS = {
  leaf: <path d="M6 34C6 16 18 6 36 6c0 18-10 30-28 30M6 34l16-16" />,
  drop: <path d="M21 4c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22z" />,
  bubble: <><circle cx="14" cy="26" r="8" /><circle cx="28" cy="14" r="6" /><circle cx="30" cy="30" r="3" /></>,
  stone: <><ellipse cx="21" cy="14" rx="14" ry="6" /><path d="M7 14v12c0 3 6 6 14 6s14-3 14-6V14" /></>,
  shield: <><path d="M21 4l14 5v10c0 9-6 15-14 18C13 34 7 28 7 19V9z" /><path d="M14 20l5 5 9-10" /></>,
  truck: <><path d="M3 10h22v18H3zM25 16h8l5 6v6H25z" /><circle cx="11" cy="30" r="3" /><circle cx="31" cy="30" r="3" /></>,
}

/** Six pillars: the active one opens wide. Opens in turn until the visitor takes over. */
export default function Features() {
  const [on, setOn] = useState(0)
  const [auto, setAuto] = useState(true)
  const box = useRef(null)
  const seen = useInView(box, { margin: '-25% 0px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!auto || !seen || reduce) return
    const t = setInterval(() => setOn((v) => (v + 1) % FEATURES.length), 3600)
    return () => clearInterval(t)
  }, [auto, seen, reduce])
  const pick = (i) => { setOn(i); setAuto(false) }
  return (
    <section id="why" className="section why">
      <div className="wrap">
        <p className="eyebrow">Why Sridhi</p>
        <h2 className="h2">Simple ingredients, done properly</h2>
        <div className="pillars" ref={box}>
          {FEATURES.map((f, i) => (
            <motion.button type="button" key={f.title} className={`pillar ${i === on ? 'on' : ''}`} aria-expanded={i === on}
              onClick={() => pick(i)} onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)} onFocus={() => pick(i)}
              initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.7 }}>
              <span className="pl-num" aria-hidden="true">0{i + 1}</span>
              <svg viewBox="0 0 42 42" className="pl-icon" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[f.icon]}</svg>
              <span className="pl-body"><b>{f.title}</b><span>{f.text}</span></span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
