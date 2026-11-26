import { motion } from 'framer-motion'
import { FEATURES } from '../content'

const ICONS = {
  leaf: <path d="M6 34C6 16 18 6 36 6c0 18-10 30-28 30M6 34l16-16" />,
  drop: <path d="M21 4c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22z" />,
  bubble: <><circle cx="14" cy="26" r="8" /><circle cx="28" cy="14" r="6" /><circle cx="30" cy="30" r="3" /></>,
  stone: <><ellipse cx="21" cy="14" rx="14" ry="6" /><path d="M7 14v12c0 3 6 6 14 6s14-3 14-6V14" /></>,
  shield: <><path d="M21 4l14 5v10c0 9-6 15-14 18C13 34 7 28 7 19V9z" /><path d="M14 20l5 5 9-10" /></>,
  truck: <><path d="M3 10h22v18H3zM25 16h8l5 6v6H25z" /><circle cx="11" cy="30" r="3" /><circle cx="31" cy="30" r="3" /></>,
}

function Quality({ f, i, side }) {
  const dir = side === 'l' ? -1 : 1
  const delay = 0.35 + (i % 3) * 0.22
  return (
    <motion.li className={`q ${side} q${i % 3}`} initial={{ opacity: 0, x: dir * 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
      <span className="q-medal">
        <svg viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[f.icon]}</svg>
      </span>
      <div className="q-text"><h3>{f.title}</h3><p>{f.text}</p></div>
      <motion.i className="q-wire" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.5, duration: 0.8 }} />
    </motion.li>
  )
}

/** Premium showcase: the pack in the centre, six qualities around it. */
export default function Features() {
  return (
    <section id="why" className="section show">
      <div className="wrap">
        <motion.div className="show-head" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="eyebrow light">Why Sridhi</p>
          <h2 className="h2 light">Simple ingredients, <em>done properly</em></h2>
        </motion.div>
        <div className="show-grid">
          <ul className="show-col">{FEATURES.slice(0, 3).map((f, i) => <Quality key={f.title} f={f} i={i} side="l" />)}</ul>
          <motion.div className="show-centre" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}>
            <span className="show-halo" aria-hidden="true" />
            <span className="show-ring a" aria-hidden="true" /><span className="show-ring b" aria-hidden="true" />
            <img src="/images/pack-5kg-v14.png" alt="Sridhi 5 kg batter pack" loading="lazy" width="787" height="901" />
            <span className="show-plinth" aria-hidden="true" />
          </motion.div>
          <ul className="show-col">{FEATURES.slice(3).map((f, i) => <Quality key={f.title} f={f} i={i + 3} side="r" />)}</ul>
        </div>
      </div>
    </section>
  )
}
