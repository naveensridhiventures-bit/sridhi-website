import { motion, useReducedMotion } from 'framer-motion'

const BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  left: 6 + ((i * 37) % 86),
  size: 6 + ((i * 11) % 16),
  delay: ((i * 0.43) % 4).toFixed(2),
  dur: (3.2 + ((i * 0.37) % 2.6)).toFixed(2),
}))

/** Batter that rises and bubbles, used to show fermentation. */
export default function Bowl({ className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`bowl ${className}`} aria-hidden="true">
      <motion.div
        className="bowl-batter"
        initial={{ height: reduce ? '78%' : '44%' }}
        whileInView={{ height: '78%' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 2.6, ease: [0.3, 0.7, 0.2, 1] }}
      >
        <span className="bowl-surface" />
        {!reduce &&
          BUBBLES.map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
              }}
            />
          ))}
      </motion.div>
    </div>
  )
}
