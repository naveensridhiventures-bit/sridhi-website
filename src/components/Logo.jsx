function Leaf() {
  return (
    <svg viewBox="0 0 40 60" aria-hidden="true">
      <path d="M20 2C34 12 38 30 20 58 2 30 6 12 20 2z" fill="currentColor" />
      <path d="M20 14v40" stroke="#e4ee2b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
export { Leaf }
/** Official Sridhi logo. `light` = white version for dark backgrounds. */
export default function Logo({ light = false, size = 40 }) {
  const src = light ? '/images/brand/logo-white.png' : '/images/logo.png'
  return <img src={src} alt="Sridhi" className="logo-img" height={size} style={{ height: size, width: 'auto' }} />
}
