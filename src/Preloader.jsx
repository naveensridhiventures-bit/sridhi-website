import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'
export default function Preloader({ onExit }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(!reduce)
  useEffect(() => {
    if (reduce) { onExit(); return }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => { setShow(false); onExit() }, 1900)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [reduce, onExit])
  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = '')}>
      {show && (
        <motion.div className="preloader" exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 50% 50%)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }} style={{ clipPath: 'inset(0 0 0% 0 round 0)' }}>
          <motion.div initial={{ scale: 0.5, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.15 }}>
            <Logo size={74} />
          </motion.div>
          <div className="pre-bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: [0.5, 0, 0.2, 1], delay: 0.2 }} /></div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Fresh batter loading</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
