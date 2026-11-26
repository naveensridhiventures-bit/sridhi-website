import { useEffect, useRef, useState } from 'react'
import { animate, motion, useAnimationFrame, useInView, useReducedMotion } from 'framer-motion'
import { CLIENTS } from '../content'

const STEP = 360 / CLIENTS.length
const PROMISE = 'Your reputation is safe with us.'

function LogoCard({ c }) {
  return (
    <div className="lcard">
      <img src={`/images/clients/${c.id}.png`} alt={c.name} draggable="false" />
    </div>
  )
}

/** 3D rotating ring of client logos. Turns on its own; drag or swipe to spin. */
function Ring() {
  const box = useRef(null), ring = useRef(null), cards = useRef([])
  const angle = useRef(0), speed = useRef(0), drag = useRef(null)
  const inView = useInView(box)
  const [radius, setRadius] = useState(500)

  useEffect(() => {
    const fit = () => {
      const w = cards.current[0]?.offsetWidth || 210
      setRadius(Math.round((w * 1.1) / (2 * Math.tan(Math.PI / CLIENTS.length))))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useAnimationFrame((_, delta) => {
    if (!inView || !ring.current) return
    const dt = Math.min(delta, 50) / 1000
    if (!drag.current) {
      speed.current *= Math.pow(0.12, dt)
      angle.current -= (11 + speed.current) * dt
    }
    ring.current.style.transform = `translateZ(${-radius}px) rotateY(${angle.current}deg)`
    cards.current.forEach((el, i) => {
      if (!el) return
      const front = Math.cos(((i * STEP + angle.current) * Math.PI) / 180) // 1 = facing viewer
      el.style.opacity = front > 0 ? 0.35 + 0.65 * front : 0.12
      el.classList.toggle('front', front > Math.cos((STEP / 2) * Math.PI / 180))
    })
  })

  const down = (e) => { drag.current = { x: e.clientX }; speed.current = 0; e.currentTarget.setPointerCapture(e.pointerId) }
  const move = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    drag.current.x = e.clientX
    angle.current += dx * 0.25
    speed.current = -dx * 6
  }
  const up = () => { drag.current = null }

  return (
    <motion.div ref={box} className="ring-box" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      initial={{ opacity: 0, scale: 0.7, y: 60 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}>
      <div className="ring-halo" aria-hidden="true" />
      <div className="ring-floor" aria-hidden="true" />
      <div ref={ring} className="ring">
        {CLIENTS.map((c, i) => (
          <div key={c.id} className="ring-slot" style={{ transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)` }}>
            <div ref={(el) => (cards.current[i] = el)} className="ring-card"><LogoCard c={c} /></div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Clients() {
  const reduce = useReducedMotion()
  return (
    <section id="clients" className="section dark clients">
      <div className="wrap">
        <div className="clients-head">
          <motion.h2 className="h2 light" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>Our Valued Clients, <span className="gold">Trusted By</span></motion.h2>
          <motion.p className="clients-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>From heritage hotels to leading hospitals and institutions, Chennai&rsquo;s most respected names put Sridhi on their kitchen table.</motion.p>
        </div>
      </div>

      {reduce
        ? <div className="wrap cgrid">{CLIENTS.map((c) => <LogoCard key={c.id} c={c} />)}</div>
        : <Ring />}

      <div className="wrap promise">
        <motion.span className="promise-rule" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <p className="promise-line" aria-label={PROMISE}>
          {PROMISE.split(' ').map((w, i) => (
            <motion.span key={i} aria-hidden="true" initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.14, duration: 0.8 }}>{w}</motion.span>
          ))}
        </p>
        <p className="promise-by">The Sridhi promise</p>
      </div>
    </section>
  )
}
