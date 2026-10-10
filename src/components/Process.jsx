import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { STEPS } from '../content'
import Scene from './Scenes'

export default function Process() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const box = useRef(null)
  const seen = useInView(box, { margin: '-20% 0px' })
  useEffect(() => {
    if (!auto || !seen) return
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), 4600)
    return () => clearInterval(t)
  }, [auto, seen])
  const s = STEPS[i]
  return (
    <section id="process" className="section dark" ref={box}>
      <div className="wrap">
        <p className="eyebrow light">Our process</p>
        <h2 className="h2 light">From grain to your kitchen in seven steps</h2>
        <div className="proc">
          <ol className="proc-list">
            {STEPS.map((st, n) => (
              <li key={st.key}>
                <button className={n === i ? 'on' : ''} onClick={() => { setI(n); setAuto(false) }}>
                  <span className="pn">0{n + 1}</span>
                  <span className="pt">{st.title}</span>
                  {n === i && auto && <i className="pbar" key={i} />}
                </button>
              </li>
            ))}
          </ol>
          <div className="proc-stage">
            <AnimatePresence mode="wait">
              <motion.div key={s.key} className="proc-card" initial={{ opacity: 0, x: 60, rotateY: -12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -60, rotateY: 12 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="proc-media">
                  {s.img ? <img src={s.img} alt={s.place} /> : <Scene id={s.key} />}
                  <span className="proc-badge">{s.place}</span>
                </div>
                <div className="proc-cap"><span>Step 0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
