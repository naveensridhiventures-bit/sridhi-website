import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import CountUp from './CountUp'

const VALUES = ['Quality', 'Service', 'Trust', 'Commitment']

export default function About() {
  const ref = useRef(null)
  const mediaRef = useRef(null)
  const mediaIn = useInView(mediaRef, { once: true, margin: '-12%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const insetY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-media" ref={mediaRef}>
          <motion.div
            className="about-main"
            initial={{ clipPath: 'inset(0 100% 0 0 round 28px)' }}
            animate={{ clipPath: mediaIn ? 'inset(0 0% 0 0 round 28px)' : 'inset(0 100% 0 0 round 28px)' }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          >
            <motion.img src="/images/gallery/factory.jpg" alt="Sridhi food processing unit" style={{ y: imgY }} />
          </motion.div>
          <motion.div className="about-inset" style={{ y: insetY }}>
            <motion.img
              src="/images/gallery/delivery-bike.jpg"
              alt="Sridhi insulated delivery bike"
              initial={{ scale: 1.3 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>
        </div>

        <div className="about-copy">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8 }}
          >
            Supplying Chennai&rsquo;s kitchens since 2016
          </motion.h2>
          <p>
            Sridhi started by supplying freshly made idli and dosa batter to industrial caterers, then grew to
            serve major clients across Chennai. Our modern food processing unit meets the stringent quality and
            hygiene requirements set by renowned brands.
          </p>
          <p>
            We also take one-time bulk orders and regular supply, and deliver across Chennai on your schedule.
          </p>

          <ul className="values" aria-label="What we believe in">
            {VALUES.map((v, i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 + i * 0.1 }}
              >
                {v}
              </motion.li>
            ))}
          </ul>

          <dl className="stats">
            <div>
              <dt>Caterers and institutions served</dt>
              <dd>
                <CountUp to={30} suffix="+" />
              </dd>
            </div>
            <div>
              <dt>Installed capacity per day, scalable to your need</dt>
              <dd>
                <CountUp to={10000} grouping suffix=" kg" />
              </dd>
            </div>
            <div>
              <dt>Making batter in Chennai since</dt>
              <dd>
                <CountUp to={2016} duration={2.2} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
