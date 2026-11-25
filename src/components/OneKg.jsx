import { motion, useReducedMotion } from 'framer-motion'
import { WA } from '../contact'
const URL_ = `https://wa.me/${WA}?text=${encodeURIComponent('Hello Sridhi, please notify me when Sridhi 1 kg launches.')}`

export default function OneKg() {
  const reduce = useReducedMotion()
  return (
    <section id="onekg" className="onekg">
      <div className="onekg-bg" aria-hidden="true" />
      {!reduce && <div className="onekg-sparks" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${-(i * 0.9)}s`, animationDuration: `${7 + (i % 6)}s` }} />)}</div>}
      <div className="wrap onekg-grid">
        <div>
          <motion.p className="eyebrow light" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Coming soon</motion.p>
          <motion.h2 className="onekg-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>Something small<br /><em>is on its way.</em></motion.h2>
          <motion.p className="onekg-p" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            For years, Sridhi has fed Chennai&rsquo;s biggest kitchens. Now we are bringing that same trusted batter to yours. Meet <b>Sridhi 1 kg</b>. Be the first to know.
          </motion.p>
          <motion.a className="btn btn-lime btn-lg" href={URL_} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }} whileHover={{ scale: 1.04 }}>
            Notify me on WhatsApp
          </motion.a>
        </div>
        <div className="mystery" aria-label="Sridhi 1 kg pack, revealed soon">
          <div className="mystery-ring r1" aria-hidden="true" /><div className="mystery-ring r2" aria-hidden="true" />
          <motion.div className="mystery-pack" initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <img src="/images/pack-5kg.png" alt="" aria-hidden="true" />
            <span className="mystery-veil" aria-hidden="true" />
            <span className="mystery-label"><small>Sridhi</small><b>1 KG</b><em>? ? ?</em></span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
