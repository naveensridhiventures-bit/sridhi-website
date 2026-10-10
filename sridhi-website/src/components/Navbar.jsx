import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { NAV } from '../data'

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      className={`nav ${solid ? 'is-solid' : ''}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Sridhi home" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="Sridhi" />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-lime nav-cta">
          Get a quote
        </a>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <motion.div className="scroll-bar" style={{ scaleX: progress }} />
      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07 } }}
              >
                {n.label}
              </motion.a>
            ))}
            <a href="#contact" className="btn btn-lime" onClick={() => setOpen(false)}>
              Get a quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
