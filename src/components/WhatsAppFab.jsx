import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WA } from '../contact'
const url = `https://wa.me/${WA}?text=${encodeURIComponent('Hello Sridhi, I would like to know more about your idli & dosa batter supply.')}`
export default function WhatsAppFab() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => { const t = setTimeout(() => !dismissed && setOpen(true), 8000); return () => clearTimeout(t) }, [dismissed])
  return (
    <div className="fab-wrap">
      <AnimatePresence>
        {open && (
          <motion.div className="fab-pop" initial={{ opacity: 0, y: 30, scale: 0.8, transformOrigin: '90% 100%' }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.85 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <button className="fab-x" aria-label="Dismiss" onClick={() => { setOpen(false); setDismissed(true) }}>&times;</button>
            <p><strong>Need batter for your kitchen?</strong>Tell us your daily requirement and we will plan the supply.</p>
            <a className="btn btn-green" href={url} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a className="fab" href={url} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sridhi on WhatsApp" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 2.4 }} whileHover={{ scale: 1.1, rotate: -6 }} whileTap={{ scale: 0.92 }}>
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M16 3.5C9.1 3.5 3.5 8.7 3.5 15.1c0 2.5.9 4.8 2.4 6.7L4.4 28.5l6.9-2.1c1.4.5 2.9.8 4.7.8 6.9 0 12.5-5.2 12.5-11.600S22.900 3.500 16 3.500z" /><circle cx="10.5" cy="15.2" r="1.7" fill="#1f7a34" /><circle cx="16" cy="15.2" r="1.7" fill="#1f7a34" /><circle cx="21.5" cy="15.2" r="1.7" fill="#1f7a34" /></svg>
        <span className="fab-ring" />
      </motion.a>
    </div>
  )
}
