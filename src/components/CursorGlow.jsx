import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useMedia from '../hooks/useMedia'
export default function CursorGlow() {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const x = useMotionValue(-400), y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })
  useEffect(() => {
    if (!fine) return
    const on = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [fine, x, y])
  if (!fine) return null
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
