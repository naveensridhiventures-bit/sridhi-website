import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 })
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}
