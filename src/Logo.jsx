import { useState } from 'react'
function Leaf() {
  return (
    <svg viewBox="0 0 40 60" aria-hidden="true">
      <path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="currentColor" />
      <path d="M20 14v40" stroke="#e4ee2b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
export { Leaf }
/** Uses /images/logo.png if it exists, otherwise a text wordmark. */
export default function Logo({ light = false, size = 40 }) {
  const [failed, setFailed] = useState(light)
  if (!failed)
    return <img src="/images/logo.png" alt="Sridhi" className="logo-img" height={size} style={{ height: size, width: 'auto' }} onError={() => setFailed(true)} />
  return (
    <span className={`wordmark ${light ? 'light' : ''}`} style={{ fontSize: size * 0.7 }} aria-label="Sridhi">
      <i><Leaf /></i>Sridhi
    </span>
  )
}
