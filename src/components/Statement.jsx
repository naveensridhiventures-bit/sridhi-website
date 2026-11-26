import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

const START = 2016
const NOW = Math.max(new Date().getFullYear(), START + 1)
const YEARS = Array.from({ length: NOW - START + 1 }, (_, i) => START + i)
const WORDS = ['Ground.', 'Packed.', 'Delivered.']

/** "Since 2016": a giant year that rolls up to today as you scroll. */
export default function Statement() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const y = useTransform(p, [0.05, 0.75], ['0em', `-${YEARS.length - 1}em`], { clamp: true })
  const fill = useTransform(p, [0.05, 0.75], [0, 1])
  const [lit, setLit] = useState(reduce ? 3 : 0)
  const [done, setDone] = useState(!!reduce)
  useMotionValueEvent(p, 'change', (v) => {
    if (reduce) return
    setLit(v > 0.58 ? 3 : v > 0.34 ? 2 : v > 0.1 ? 1 : 0)
    setDone(v > 0.74)
  })
  return (
    <section className={`since ${reduce ? 'still' : ''}`} ref={ref} aria-label={`Since ${START}, Sridhi has ground, packed and delivered batter for Chennai's busiest kitchens.`}>
      <div className="since-pin">
        <div className="since-glow" aria-hidden="true" />
        <p className="since-kicker">Since {START}</p>
        <div className="since-year" aria-hidden="true">
          <motion.div className="since-strip" style={{ y: reduce ? `-${YEARS.length - 1}em` : y }}>
            {YEARS.map((n) => <span key={n}>{n}</span>)}
          </motion.div>
        </div>
        <div className="since-line" aria-hidden="true">
          <b>{START}</b>
          <div className="since-track"><motion.i style={{ scaleX: reduce ? 1 : fill }} />{YEARS.map((n) => <em key={n} />)}</div>
          <b>Today</b>
        </div>
        <p className="since-words">
          {WORDS.map((t, i) => <span key={t} className={i < lit ? 'on' : ''}>{t}</span>)}
        </p>
        <p className="since-sub">Batter for Chennai&rsquo;s busiest kitchens.</p>
        <motion.p className="since-close" initial={false} animate={{ opacity: done ? 1 : 0, y: done ? 0 : 24 }} transition={{ duration: 0.6 }}>No preservatives. No additives. <em>Just batter, the way it should be.</em></motion.p>
      </div>
    </section>
  )
}
