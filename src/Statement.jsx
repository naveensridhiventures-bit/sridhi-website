import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
const TEXT = 'Since 2016 Sridhi has ground, fermented, packed and delivered batter for Chennai\u2019s busiest kitchens. No preservatives. No additives. Just batter, the way it should be.'
function Word({ w, range, p, reduce }) {
  const o = useTransform(p, range, [0.14, 1])
  const y = useTransform(p, range, [12, 0])
  return <motion.span className="sw" style={reduce ? undefined : { opacity: o, y }}>{w}{' '}</motion.span>
}
export default function Statement() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = TEXT.split(' ')
  return (
    <section className="statement" ref={ref}>
      <p className="wrap statement-text" aria-label={TEXT}>
        {words.map((w, i) => { const a = i / words.length; return <Word key={i} w={w} p={scrollYProgress} range={[a, Math.min(1, a + 1.6 / words.length)]} reduce={reduce} /> })}
      </p>
    </section>
  )
}
