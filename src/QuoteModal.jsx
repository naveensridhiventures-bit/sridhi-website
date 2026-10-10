import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import QuoteForm from './QuoteForm'
import { useQuote } from '../quote'
export default function QuoteModal() {
  const { isOpen, close } = useQuote()
  useEffect(() => {
    if (!isOpen) return
    const key = (e) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key) }
  }, [isOpen, close])
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div className="modal-panel" role="dialog" aria-modal="true" aria-label="Request a quote" initial={{ y: 80, opacity: 0, scale: 0.92, rotateX: 12 }} animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }} exit={{ y: 40, opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={close} aria-label="Close"><span /><span /></button>
            <h3 className="modal-title">Tell us how much you cook</h3>
            <p className="modal-sub">We reply with a supply plan for your kitchen.</p>
            <QuoteForm idPrefix="m" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
