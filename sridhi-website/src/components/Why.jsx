import { motion } from 'framer-motion'
import Tilt from './Tilt'
import Bowl from './Bowl'

const CRATES = Array.from({ length: 12 }, (_, i) => i)

const rise = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 },
  }),
}

export default function Why() {
  const vp = { once: true, margin: '-12%' }
  return (
    <section id="why" className="section why">
      <div className="wrap">
        <div className="section-head">
          <h2>What goes into every pack, and what stays out</h2>
          <p>
            Every step is checked, from the day raw material arrives until the pack leaves our cold room.
          </p>
        </div>

        <div className="bento">
          <motion.div custom={0} variants={rise} initial="hidden" whileInView="show" viewport={vp} className="bento-cell c-ferment">
            <Tilt className="card card-dark">
              <div className="card-copy">
                <h3>Naturally fermented</h3>
                <p>
                  We grind the traditional way and let the batter ferment naturally, which preserves its
                  nutritional value for a healthy diet.
                </p>
              </div>
              <Bowl />
              <span className="spot" />
            </Tilt>
          </motion.div>

          <motion.div custom={1} variants={rise} initial="hidden" whileInView="show" viewport={vp} className="bento-cell c-water">
            <Tilt className="card card-lime">
              <div className="card-copy">
                <h3>RO purified water</h3>
                <p>Quality water makes quality batter, so we check ours periodically.</p>
              </div>
              <div className="ripples" aria-hidden="true">
                <i /> <i /> <i />
                <b />
              </div>
              <span className="spot" />
            </Tilt>
          </motion.div>

          <motion.div custom={2} variants={rise} initial="hidden" whileInView="show" viewport={vp} className="bento-cell c-pick">
            <Tilt className="card card-paper">
              <div className="card-copy">
                <h3>Handpicked raw materials</h3>
                <p>Chosen from selected vendors for consistent quality, batch after batch.</p>
              </div>
              <motion.svg
                className="sprout"
                viewBox="0 0 120 120"
                aria-hidden="true"
                initial="hidden"
                whileInView="show"
                viewport={vp}
                variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } } }}
              >
                <motion.path
                  d="M60 112V58"
                  stroke="#1f7a34" strokeWidth="5" strokeLinecap="round" fill="none"
                  variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9 } } }}
                />
                <motion.path
                  d="M60 62C60 36 40 24 16 28c0 24 18 38 44 34z"
                  fill="#3fa535"
                  style={{ transformOrigin: '60px 62px', transformBox: 'view-box' }}
                  variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 130, damping: 12 } } }}
                />
                <motion.path
                  d="M60 52C60 26 80 14 104 18c0 24-18 38-44 34z"
                  fill="#1f7a34"
                  style={{ transformOrigin: '60px 52px', transformBox: 'view-box' }}
                  variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 130, damping: 12 } } }}
                />
              </motion.svg>
              <span className="spot" />
            </Tilt>
          </motion.div>

          <motion.div custom={3} variants={rise} initial="hidden" whileInView="show" viewport={vp} className="bento-cell c-clean">
            <Tilt className="card card-paper">
              <div className="card-copy">
                <h3>No preservatives. No additives.</h3>
                <p>Nothing is added to the batter at any stage of production.</p>
              </div>
              <svg className="bigcheck" viewBox="0 0 100 100" aria-hidden="true">
                <motion.circle
                  cx="50" cy="50" r="42" stroke="#1f7a34" strokeWidth="6" fill="none"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
                  transition={{ duration: 1.1, delay: 0.3 }}
                />
                <motion.path
                  d="M30 52l14 14 27-32" stroke="#3fa535" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp}
                  transition={{ duration: 0.7, delay: 1.2 }}
                />
              </svg>
              <span className="spot" />
            </Tilt>
          </motion.div>

          <motion.div custom={4} variants={rise} initial="hidden" whileInView="show" viewport={vp} className="bento-cell c-cold">
            <Tilt className="card card-green">
              <div className="card-copy">
                <h3>Packed by machine, held in the cold</h3>
                <p>
                  Fully automated packing in food-grade covers only, then a temperature-controlled cold room
                  until your scheduled delivery.
                </p>
              </div>
              <div className="crates" aria-hidden="true">
                {CRATES.map((i) => (
                  <motion.i
                    key={i}
                    className={i % 3 === 1 ? 'g' : 'b'}
                    initial={{ y: -60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={vp}
                    transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.3 + i * 0.07 }}
                  />
                ))}
              </div>
              <span className="spot" />
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
