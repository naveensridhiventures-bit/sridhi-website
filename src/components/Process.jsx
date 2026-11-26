import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { STEPS } from '../content'
import useMedia from '../hooks/useMedia'

function Panel({ s, n }) {
  return (
    <article className="jcard">
      <img src={s.img} alt={s.place} loading="lazy" draggable="false" />
      <span className="jnum" aria-hidden="true">0{n + 1}</span>
      <span className="jplace">{s.place}</span>
      <div className="jcap"><h3>{s.title}</h3><p>{s.text}</p></div>
    </article>
  )
}

const Head = () => (
  <div className="wrap jhead">
    <p className="eyebrow light">Our process</p>
    <h2 className="h2 light">From grain to your kitchen in six steps</h2>
  </div>
)

/** Desktop: the page scroll drives a cinematic sideways journey. */
function Journey() {
  const ref = useRef(null), track = useRef(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const fit = () => setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })
  const x = useTransform(p, [0.04, 0.96], [0, -dist], { clamp: true })
  const bar = useTransform(p, [0.04, 0.96], [0, 1])
  const left = useTransform(bar, (v) => `${v * 100}%`)
  return (
    <section id="process" ref={ref} className="journey" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="jpin">
        <Head />
        <motion.div ref={track} className="jtrack" style={{ x }}>
          {STEPS.map((s, n) => <Panel key={s.key} s={s} n={n} />)}
        </motion.div>
        <div className="wrap jrail" aria-hidden="true">
          <motion.i style={{ scaleX: bar }} />
          <motion.b style={{ left }} />
        </div>
      </div>
    </section>
  )
}

function Stack({ reduce }) {
  return (
    <section id="process" className="journey stack">
      <Head />
      <div className="wrap jlist">
        {STEPS.map((s, n) => (
          <motion.div key={s.key} initial={reduce ? false : { opacity: 0, x: 60, rotate: 3 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
            <Panel s={s} n={n} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Process() {
  const reduce = useReducedMotion()
  const wide = useMedia('(min-width: 901px) and (min-height: 560px)')
  return wide && !reduce ? <Journey /> : <Stack reduce={reduce} />
}
