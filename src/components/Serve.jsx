import { motion } from 'framer-motion'
import { SERVE } from '../content'
import { useQuote } from '../quote'
import Magnetic from './Magnetic'
import { PHONE_TEXT, WA } from '../contact'

export default function Serve() {
  const { open } = useQuote()
  return (
    <section className="section serve">
      <div className="wrap">
        <p className="eyebrow">Who we supply</p>
        <h2 className="h2">Built for kitchens that cook at scale</h2>
        <div className="sgrid">
          {SERVE.map((s, i) => (
            <motion.div key={s.t} className="scard" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} whileHover={{ y: -10 }}>
              <span>0{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="cta" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="cta-copy">
            <h3>Tell us how much you cook.</h3>
            <p>We reply with a supply plan for your kitchen.</p>
            <div className="cta-actions">
              <Magnetic><button className="btn btn-lime btn-lg" onClick={open}>Request bulk supply</button></Magnetic>
              <Magnetic><a className="btn btn-ghost btn-lg" href={`tel:+${WA}`}>Call {PHONE_TEXT}</a></Magnetic>
            </div>
          </div>
          <div className="cta-photo"><img src="/images/sridhi-hero-v5.jpg" alt="Sridhi idli and dosa batter pack with idlis and dosa" loading="lazy" /></div>
        </motion.div>
      </div>
    </section>
  )
}
