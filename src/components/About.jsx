import { motion } from 'framer-motion'
import { useQuote } from '../quote'
import Magnetic from './Magnetic'

/* DUMMY CONTENT: replace the text below with the final "Who we are" copy. */
export default function About() {
  const { open } = useQuote()
  return (
    <section id="about" className="section about">
      <div className="wrap about-grid">
        <motion.div className="about-media" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}>
          <img src="/images/who-we-are-v14.jpg" alt="Sridhi batter pack beside fresh idlis, sambar and chutney" loading="lazy" />
          <span className="about-shine" aria-hidden="true" />
          <span className="about-badge"><b>Since</b>2016</span>
        </motion.div>
        <div className="about-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Who we are</motion.p>
          <motion.h2 className="h2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}>A name behind Chennai&rsquo;s finest kitchens.</motion.h2>
          <motion.p className="about-p" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}>
            Sridhi began in 2016 with a simple promise: batter that tastes the way it should, every single day. Today we supply hotels, caterers, hospitals and institutions across Chennai from a modern, hygienic processing unit.
          </motion.p>
          <motion.p className="about-p" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}>
            Quality, service, trust and commitment are not slogans for us. They are how we earn our place in some of the most demanding kitchens in the city.
          </motion.p>
          <motion.div className="about-actions" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <Magnetic><button className="btn btn-green btn-lg" onClick={open}>Partner with Sridhi</button></Magnetic>
            <span className="dummy-tag">Dummy content. Final text coming soon.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
