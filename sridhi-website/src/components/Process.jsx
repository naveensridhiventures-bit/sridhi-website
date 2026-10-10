import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion'
import { STEPS } from '../data'
import Bowl from './Bowl'

function Step({ step, index, active, setActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) setActive(index)
  }, [inView, index, setActive])

  return (
    <article ref={ref} className={`step ${active === index ? 'is-active' : ''}`}>
      <span className="step-dot" aria-hidden="true" />
      <p className="step-count">
        Step {index + 1} of {STEPS.length}
      </p>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
      <div className="step-photo-m">
        {step.img ? <img src={step.img} alt={step.place} loading="lazy" /> : <Bowl />}
        <span>{step.place}</span>
      </div>
    </article>
  )
}

export default function Process() {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const s = STEPS[active]

  return (
    <section id="process" className="section process">
      <div className="wrap">
        <div className="section-head">
          <h2>From raw material to your kitchen, in seven steps</h2>
          <p>A look inside our modern food processing unit in Chennai, in the order the batter moves through it.</p>
        </div>

        <div className="process-grid">
          <div className="process-list" ref={listRef}>
            <div className="rail" aria-hidden="true">
              <motion.div className="rail-fill" style={{ scaleY: fill }} />
            </div>
            {STEPS.map((st, i) => (
              <Step key={st.key} step={st} index={i} active={active} setActive={setActive} />
            ))}
          </div>

          <div className="process-pane" aria-hidden="true">
            <div className="pane-frame">
              <AnimatePresence mode="sync">
                <motion.figure
                  key={s.key}
                  className="pane-fig"
                  initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                >
                  {s.img ? <img src={s.img} alt="" /> : <Bowl className="bowl-lg" />}
                </motion.figure>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.figcaption
                  key={s.key + 'c'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.35 } }}
                  exit={{ y: -12, opacity: 0, transition: { duration: 0.2 } }}
                  className="pane-cap"
                >
                  {s.place}
                </motion.figcaption>
              </AnimatePresence>
            </div>
            <div className="pane-dots">
              {STEPS.map((st, i) => (
                <span key={st.key} className={i === active ? 'on' : ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
