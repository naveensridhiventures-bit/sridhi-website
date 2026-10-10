import { motion } from 'framer-motion'
import { CLIENTS_A, CLIENTS_B } from '../data'

function Row({ items, reverse }) {
  const list = [...items, ...items]
  return (
    <div className={`logo-row ${reverse ? 'rev' : ''}`}>
      <div className="logo-track">
        {list.map(([name, file], i) => (
          <figure className="logo-card" key={`${file}-${i}`} aria-hidden={i >= items.length}>
            <img src={`/images/clients/${file}.png`} alt={name} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function Clients() {
  return (
    <section id="clients" className="section clients">
      <div className="wrap">
        <motion.div
          className="section-head center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8 }}
        >
          <h2>Trusted by hotels, hospitals and institutions across Chennai</h2>
          <p>More than 30 renowned establishments from the catering industry rely on Sridhi batter.</p>
        </motion.div>
      </div>
      <Row items={CLIENTS_A} />
      <Row items={CLIENTS_B} reverse />
    </section>
  )
}
