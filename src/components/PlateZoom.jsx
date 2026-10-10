import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { HOTSPOTS } from '../content'
import { PHONE_TEXT, WA } from '../contact'
import useMedia from '../hooks/useMedia'

const ICONS = {
  grain: <><ellipse cx="14" cy="22" rx="7" ry="4.5" transform="rotate(-30 14 22)" /><ellipse cx="27" cy="14" rx="7" ry="4.5" transform="rotate(25 27 14)" /><ellipse cx="26" cy="29" rx="7" ry="4.5" transform="rotate(-10 26 29)" /></>,
  idli: <><path d="M5 28C5 12 14 6 21 6s16 6 16 22c0 4-6 6-16 6S5 32 5 28z" /><path d="M11 24c1-7 5-11 10-12" /></>,
  dosa: <><path d="M21 4L38 36H4z" /><path d="M21 12l7 16" /></>,
  stone: <><ellipse cx="21" cy="14" rx="14" ry="6" /><path d="M7 14v12c0 3 6 6 14 6s14-3 14-6V14" /></>,
  pack: <><path d="M9 5h24l2 32H7z" /><path d="M9 14h24" /><path d="M21 20c6 3 7 8 0 15-7-7-6-12 0-15z" /></>,
}
const Icon = ({ k }) => (<svg viewBox="0 0 42 42" className="pop-ico" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[k]}</svg>)

const CALL = `tel:+${WA}`
const WAURL = `https://wa.me/${WA}?text=${encodeURIComponent('Hello Sridhi, I would like to know more about your idli & dosa batter supply.')}`

function Body({ i, go, close }) {
  const h = HOTSPOTS[i]
  return (
    <>
      <div className="pop-top">
        <span className="pop-badge"><Icon k={h.icon} /></span>
        <span className="pop-count"><b>0{i + 1}</b> / 0{HOTSPOTS.length}</span>
        <button className="pop-close" onClick={close} aria-label="Close"><span /><span /></button>
      </div>
      <span className="pop-tag">{h.tag}</span>
      <h3>{h.title}</h3>
      <p>{h.text}</p>
      {h.cta && (
        <div className="pop-cta">
          <a className="btn btn-green" href={CALL}>Call {PHONE_TEXT}</a>
          <a className="btn btn-ghost-dark" href={WAURL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      )}
      <div className="pop-nav">
        <button onClick={() => go(-1)} aria-label="Previous">&#8592;</button>
        <div className="pop-steps" aria-hidden="true">{HOTSPOTS.map((x, n) => (<i key={x.id} className={n === i ? 'on' : ''} />))}</div>
        <button onClick={() => go(1)} aria-label="Next">&#8594;</button>
      </div>
    </>
  )
}

export default function PlateZoom() {
  const sec = useRef(null), shell = useRef(null), stage = useRef(null), inner = useRef(null), card = useRef(null)
  const dots = useRef([])
  const reduce = useReducedMotion()
  const mobile = useMedia('(max-width: 760px)')
  const [active, setActive] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0, w: 1, h: 1 })
  const x = useMotionValue(0)
  const { scrollYProgress: p } = useScroll({ target: sec, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], reduce || mobile ? [1, 1] : [1, 1.28])
  const ox = useTransform(p, [0, 1], [0.2, 0.75])
  const inv = useTransform(scale, (s) => 1 / s)

  const close = useCallback(() => setActive(null), [])
  const panTo = useCallback((i) => {
    if (!mobile || !stage.current || !inner.current) return
    const sw = stage.current.offsetWidth, iw = inner.current.offsetWidth
    const target = Math.max(sw - iw, Math.min(0, sw / 2 - (HOTSPOTS[i].x / 100) * iw))
    animate(x, target, { type: 'spring', stiffness: 160, damping: 22 })
  }, [mobile, x])
  const open = useCallback((i) => { setActive(i); panTo(i) }, [panTo])
  const go = useCallback((d) => setActive((a) => { const n = (((a ?? 0) + d) % HOTSPOTS.length + HOTSPOTS.length) % HOTSPOTS.length; panTo(n); return n }), [panTo])

  useEffect(() => { if (!mobile) x.set(0) }, [mobile, x])

  // keep desktop popup glued to its dot while the photo zooms
  useEffect(() => {
    if (active == null || mobile) return
    let raf
    const tick = () => {
      const d = dots.current[active], s = shell.current, c = card.current
      if (d && s) {
        const dr = d.getBoundingClientRect(), sr = s.getBoundingClientRect()
        const nx = dr.left + dr.width / 2 - sr.left, ny = dr.top + dr.height / 2 - sr.top
        const nw = sr.width, nh = c ? c.offsetHeight : 240
        setPos((o) => (Math.abs(o.x - nx) < 0.5 && Math.abs(o.y - ny) < 0.5 && o.w === nw && o.h === nh ? o : { x: nx, y: ny, w: nw, h: nh }))
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [active, mobile])

  useEffect(() => {
    if (active == null) return
    const key = (e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [active, close, go])

  const CW = 320
  const right = pos.x < pos.w / 2
  const left = Math.max(8, Math.min(right ? pos.x + 26 : pos.x - 26 - CW, pos.w - CW - 8))
  const cy = Math.max(pos.h / 2 + 6, pos.y)
  const top = cy - pos.h / 2
  const arrow = Math.max(26, Math.min(pos.h - 26, pos.y - top))

  return (
    <section id="plate" className="plate" ref={sec}>
      <div className="plate-sticky">
        <div className="wrap plate-head">
          <p className="eyebrow light">Tap the glowing dots</p>
          <h2>Everything on this plate starts with one batter</h2>
        </div>
        <div className="zoom-shell" ref={shell}>
          <div className="zoom-stage" ref={stage} onClick={close}>
            <motion.div ref={inner} className="zoom-inner" drag={mobile ? 'x' : false} dragConstraints={stage} dragElastic={0.06} style={{ scale, originX: ox, x }}>
              <img src="/images/sridhi-hero-v5.jpg" alt="Sridhi idli and dosa batter pack with fresh idlis and a crisp dosa" draggable="false" loading="lazy" />
              {HOTSPOTS.map((h, i) => (
                <motion.button key={h.id} ref={(el) => (dots.current[i] = el)} className={`dot ${active === i ? 'on' : ''}`} style={{ left: `${h.x}%`, top: `${h.y}%`, scale: inv }} onClick={(e) => { e.stopPropagation(); open(i) }} aria-label={h.title} aria-expanded={active === i}>
                  <span className="dot-core" /><span className="dot-ring" /><span className="dot-ring r2" />
                  <span className="dot-label">{h.tag}</span>
                </motion.button>
              ))}
            </motion.div>
            {mobile && <span className="swipe-hint" aria-hidden="true">&#8596; swipe the photo</span>}
          </div>

          {!mobile && (
            <AnimatePresence>
              {active != null && (
                <motion.div key={HOTSPOTS[active].id} ref={card} className={`pop ${right ? 'at-right' : 'at-left'}`} role="dialog" aria-label={HOTSPOTS[active].title} style={{ left, top, width: CW, '--arrow': `${arrow}px` }} initial={{ opacity: 0, scale: 0.55, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 340, damping: 22 }}>
                  <Body i={active} go={go} close={close} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <div className="wrap plate-chips" role="tablist" aria-label="Parts of the plate">
          {HOTSPOTS.map((h, i) => (
            <button key={h.id} className={`chip ${active === i ? 'on' : ''}`} onClick={() => open(i)}><b>0{i + 1}</b>{h.tag}</button>
          ))}
        </div>
      </div>

      {mobile && (
        <AnimatePresence>
          {active != null && (
            <>
              <motion.div key="bk" className="sheet-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
              <motion.div key="sheet" className="sheet" role="dialog" aria-label={HOTSPOTS[active].title} drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => { if (i.offset.y > 80 || i.velocity.y > 500) close() }} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <span className="sheet-grip" aria-hidden="true" />
                <motion.div key={active} className="sheet-body" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <Body i={active} go={go} close={close} />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
