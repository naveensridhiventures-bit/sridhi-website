import { NAV, CONTACT } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <img src="/images/logo.png" alt="Sridhi" className="footer-logo" />
          <p className="footer-by">
            Manufactured &amp; marketed by
            <strong> Sridhi Ventures</strong>
          </p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <address>
          {CONTACT.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <a href={`tel:${CONTACT.phones[0].tel}`}>{CONTACT.phones[0].label}</a>
          <a href={`tel:${CONTACT.phones[1].tel}`}>{CONTACT.phones[1].label}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
      </div>
      <div className="wrap footer-base">
        <span>&copy; {new Date().getFullYear()} Sridhi Ventures. All rights reserved.</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}
