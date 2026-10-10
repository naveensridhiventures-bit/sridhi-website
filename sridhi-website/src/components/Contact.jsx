import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACT } from '../data'

const VOLUMES = ['Under 50 kg a day', '50 to 200 kg a day', '200 to 1,000 kg a day', 'Over 1,000 kg a day', 'One-time event order']

export default function Contact() {
  const [f, setF] = useState({ name: '', org: '', phone: '', volume: VOLUMES[0], note: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!f.name.trim()) e.name = 'Enter your name so we know who to call.'
    if (!/^[+\d][\d\s-]{8,}$/.test(f.phone.trim())) e.phone = 'Enter a phone number with at least 9 digits.'
    setErr(e)
    return Object.keys(e).length === 0
  }

  const message = () =>
    [
      'Hello Sridhi, I would like to enquire about idli & dosa batter supply.',
      `Name: ${f.name}`,
      f.org && `Organisation: ${f.org}`,
      `Phone: ${f.phone}`,
      `Requirement: ${f.volume}`,
      f.note && `Note: ${f.note}`,
    ]
      .filter(Boolean)
      .join('\n')

  const sendWhatsApp = () => {
    if (!validate()) return
    window.open(`https://wa.me/${CONTACT.phones[0].wa}?text=${encodeURIComponent(message())}`, '_blank', 'noopener')
    setSent('WhatsApp')
  }
  const sendEmail = () => {
    if (!validate()) return
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Batter supply enquiry')}&body=${encodeURIComponent(message())}`
    setSent('your email app')
  }

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h2>Tell us how much you cook. We will plan the supply.</h2>
          <p>
            Share your daily requirement and we will get back to you with a supply schedule. We take one-time bulk
            orders as well as regular supply.
          </p>

          <ul className="contact-list">
            {CONTACT.phones.map((p) => (
              <li key={p.tel}>
                <span className="ci">Call</span>
                <a href={`tel:${p.tel}`}>{p.label}</a>
              </li>
            ))}
            <li>
              <span className="ci">Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <span className="ci">Visit</span>
              <address>{CONTACT.address.map((l) => <span key={l}>{l}</span>)}</address>
            </li>
          </ul>
        </div>

        <motion.div
          className="form-card"
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                className="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg viewBox="0 0 100 100" width="84" height="84" aria-hidden="true">
                  <motion.circle cx="50" cy="50" r="42" stroke="#3fa535" strokeWidth="6" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                  <motion.path d="M30 52l14 14 27-32" stroke="#1f7a34" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
                </svg>
                <h3>Your enquiry is ready in {sent}</h3>
                <p>Send it from there and we will reply with a supply plan. You can also call us directly.</p>
                <button className="btn btn-ghost-dark" onClick={() => setSent(null)}>
                  Edit enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={(e) => e.preventDefault()} exit={{ opacity: 0 }}>
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.name} />
                  {err.name && <small role="alert">{err.name}</small>}
                </div>
                <div className="field">
                  <label htmlFor="org">Organisation (optional)</label>
                  <input id="org" value={f.org} onChange={set('org')} autoComplete="organization" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!err.phone} />
                  {err.phone && <small role="alert">{err.phone}</small>}
                </div>
                <div className="field">
                  <label htmlFor="volume">Your requirement</label>
                  <select id="volume" value={f.volume} onChange={set('volume')}>
                    {VOLUMES.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="note">Anything else we should know? (optional)</label>
                  <textarea id="note" rows="3" value={f.note} onChange={set('note')} />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-green" onClick={sendWhatsApp}>
                    Send on WhatsApp
                  </button>
                  <button type="button" className="btn btn-ghost-dark" onClick={sendEmail}>
                    Send by email
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
