import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { NAV } from '../content'
import { useQuote } from '../quote'
import Logo from './Logo'
export default function Navbar() {
  const { open } = useQuote()
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <div className="nav-in">
        <a href="#top" aria-label="Sridhi home"><Logo size={36} /></a>
        <nav className={`nav-links ${menu ? 'open' : ''}`}>
          {NAV.map((n) => (<a key={n.href} href={n.href} onClick={() => setMenu(false)}>{n.label}</a>))}
          <button className="btn btn-green" onClick={() => { setMenu(false); open() }}>Request a quote</button>
        </nav>
        <button className={`burger ${menu ? 'on' : ''}`} onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}><span /><span /></button>
      </div>
      <motion.div className="progress" style={{ scaleX: w }} />
    </header>
  )
}
