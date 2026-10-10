import { CONTACT, HAS_EMAIL, PHONE_TEXT, WA } from '../contact'
import { NAV } from '../content'
import QuoteForm from './QuoteForm'
import Logo from './Logo'
export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="wrap fgrid2">
        <div>
          <Logo light size={46} />
          <p className="fabout">We make one thing, and we make it well: premium idli &amp; dosa batter. Naturally fermented, RO purified water, no preservatives. From our food processing unit in Chennai, Tamil Nadu.</p>
          <ul className="fcontact">
            <li><span>Call or WhatsApp</span><a className="fphone" href={`tel:+${WA}`}>{PHONE_TEXT}</a></li>
            {HAS_EMAIL && <li><span>Email</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>}
            <li><span>Based in</span>Chennai, Tamil Nadu</li>
          </ul>
          <nav className="flinks">{NAV.map((n) => (<a key={n.href} href={n.href}>{n.label}</a>))}</nav>
        </div>
        <div className="fform"><h3>Request a quote</h3><QuoteForm idPrefix="c" /></div>
      </div>
      <p className="copy">&copy; {new Date().getFullYear()} Sridhi. All rights reserved.</p>
    </footer>
  )
}
