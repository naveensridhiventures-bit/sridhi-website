import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { CLIENTS, WORDS } from '../content'

const byId = Object.fromEntries(CLIENTS.map((c) => [c.id, c]))
const FLOATERS = [
  { id: 'taj-connemara', cls: 'f1', d: 0 }, { id: 'apollo', cls: 'f2', d: 0.8 },
  { id: 'iit', cls: 'f3', d: 1.6 }, { id: 'vivanta', cls: 'f4', d: 0.4 },
  { id: 'krishna', cls: 'f5', d: 1.2 }, { id: 'joot', cls: 'f6', d: 2 },
]

function LogoCard({ id, cls = '', d = 0, float = false }) {
  const c = byId[id]
  return (
    <div className={`lcard ${cls}`} style={float ? { animationDelay: `${d}s` } : undefined} title={c.name}>
      <img src={`/images/clients/${id}.jpg`} alt={c.name} loading="lazy" draggable="false" />
    </div>
  )
}

function Marquee({ items, rev }) {
  const list = [...items, ...items]
  return (
    <div className="mq" aria-hidden="true">
      <div className={`mq-track ${rev ? 'rev' : ''}`}>
        {list.map((c, i) => <LogoCard key={c.id + i} id={c.id} />)}
      </div>
    </div>
  )
}

export default function Clients() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 16 }), sy = useSpring(my, { stiffness: 60, damping: 16 })
  const rY = useTransform(sx, [-0.5, 0.5], [-7, 7]), rX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const [i, setI] = useState(0)
  useEffect(() => { if (reduce) return; const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 5500); return () => clearInterval(t) }, [reduce])
  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const half = Math.ceil(CLIENTS.length / 2)
  return (
    <section id="clients" className="section dark clients">
      <div className="wrap">
        <div className="clients-head">
          <motion.p className="eyebrow light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our valued clients</motion.p>
          <motion.h2 className="h2 light" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}>Brands That Trust Sridhi</motion.h2>
          <motion.p className="clients-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>From heritage hotels to leading hospitals and institutions, Chennai&rsquo;s most respected names put Sridhi on their kitchen table.</motion.p>
        </div>

        <div className="featured" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
          <motion.div className="featured-frame" style={reduce ? undefined : { rotateY: rY, rotateX: rX }} initial={{ opacity: 0, scale: 0.88, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>
            <img src="/images/clientele-featured.jpg" alt="Sridhi premium clientele: Apollo Hospitals, Sri Ramachandra, Chettinad Hospital, Taj hotels, Vivanta, JOOT Foods, Sakthi's Kitchen and Origin Cafe" loading="lazy" />
            <span className="shine" aria-hidden="true" />
          </motion.div>
          {FLOATERS.map((f) => (
            <motion.div key={f.id} className={`float-wrap ${f.cls}`} initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.5 + f.d * 0.25 }}>
              <LogoCard id={f.id} float d={f.d} cls="floaty" />
            </motion.div>
          ))}
        </div>

        <div className="mq-wrap">
          <Marquee items={CLIENTS.slice(0, half)} />
          <Marquee items={CLIENTS.slice(half)} rev />
        </div>

        {/* DUMMY testimonials: replace with real client words */}
        <div className="words">
          <AnimatePresence mode="wait">
            <motion.figure key={i} className="word" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.55 }}>
              <svg viewBox="0 0 40 30" width="34" aria-hidden="true"><path d="M0 30V17C0 7 5 1 15 0v6c-5 1-8 4-8 9h8v15H0zm22 0V17c0-10 5-16 15-17v6c-5 1-8 4-8 9h8v15H22z" fill="#e4ee2b" /></svg>
              <blockquote>{WORDS[i].q}</blockquote>
              <figcaption><b>{WORDS[i].who}</b> &middot; {WORDS[i].org}</figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="word-dots">{WORDS.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} />)}</div>
          <span className="dummy-tag light">Sample testimonials. Real client words coming soon.</span>
        </div>
      </div>
    </section>
  )
}
