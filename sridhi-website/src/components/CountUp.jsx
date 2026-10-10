import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export default function CountUp({ to, suffix = '', grouping = false, duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration, ease: [0.2, 0.7, 0.2, 1], onUpdate: (l) => setV(Math.round(l)) })
    return () => c.stop()
  }, [inView, to, duration, reduce])

  const out = grouping ? v.toLocaleString('en-IN') : v
  return (
    <span ref={ref}>
      {out}
      {suffix}
    </span>
  )
}
