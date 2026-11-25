import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { STATS } from '../content'

function Count({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) { ref.current.textContent = to.toLocaleString('en-IN') + suffix; return }
    const c = animate(0, to, { duration: 2.2, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-IN') + suffix } })
    return () => c.stop()
  }, [inView, to, suffix, reduce])
  return <span ref={ref}>0{suffix}</span>
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Sridhi in numbers">
      <div className="wrap stats-grid">
        {STATS.map((s, i) => (
          <motion.div key={s.label} className="stat" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}>
            <b><Count to={s.n} suffix={s.suffix} /></b>
            <h3>{s.label}</h3>
            <p>{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
