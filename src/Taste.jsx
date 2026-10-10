import { useState } from 'react'
import { motion } from 'framer-motion'
import { TASTE } from '../content'

export default function Taste() {
  const [a, setA] = useState(0)
  return (
    <section id="taste" className="section">
      <div className="wrap">
        <p className="eyebrow">Taste</p>
        <h2 className="h2">What the batter becomes</h2>
        <div className="accordion">
          {TASTE.map((t, i) => (
            <motion.article key={t.id} className={`acard ${a === i ? 'on' : ''}`} onMouseEnter={() => setA(i)} onClick={() => setA(i)} tabIndex={0} onFocus={() => setA(i)} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <img src={t.img} alt={t.title} loading="lazy" />
              <span className="atag">{t.tag}</span>
              <div className="acopy"><h3>{t.title}</h3><p>{t.text}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
