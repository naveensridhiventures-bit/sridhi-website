const grains = Array.from({ length: 14 }, (_, i) => ({ x: 150 + ((i * 29) % 100), d: ((i * 0.31) % 3).toFixed(2) }))
const bubbles = Array.from({ length: 8 }, (_, i) => ({ x: 14 + ((i * 37) % 110), d: ((i * 0.5) % 3).toFixed(1), r: 3 + (i % 3) * 2 }))
const fb = Array.from({ length: 9 }, (_, i) => ({ x: 130 + ((i * 41) % 140), d: ((i * 0.43) % 3).toFixed(2), r: 4 + (i % 3) * 3 }))

const S = ({ label, children }) => (<svg viewBox="0 0 400 350" className="scene" role="img" aria-label={label}>{children}</svg>)

function Sourcing() {
  return (<S label="Grains falling into a sack">
    {grains.map((g, i) => (<ellipse key={i} className="grain" cx={g.x} cy="40" rx="6" ry="4" fill="#fffbe3" style={{ animationDelay: `${g.d}s` }} />))}
    <path d="M105 310C88 230 104 178 140 152h120c36 26 52 78 35 158z" fill="#d6b67d" />
    <path d="M138 154q62-30 124 0" stroke="#9c7338" strokeWidth="8" fill="none" strokeLinecap="round" />
    <g className="sack-badge"><rect x="136" y="205" width="128" height="44" rx="22" fill="#0b3d1e" /><path d="M154 227l8 8 16-17" stroke="#e4ee2b" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><text x="186" y="233" fill="#fff" fontSize="15" fontWeight="700">Selected</text></g>
  </S>)
}
function Soaking() {
  return (<S label="A vessel filling with water">
    <rect x="186" y="26" width="28" height="64" rx="6" fill="#cfd8d2" /><rect x="170" y="20" width="60" height="14" rx="7" fill="#e8efe9" />
    {[0, 1, 2].map((i) => (<circle key={i} className="drop" cx="200" cy="96" r="6" fill="#7fd0ff" style={{ animationDelay: `${i * 0.5}s` }} />))}
    <rect x="120" y="120" width="160" height="180" rx="22" fill="rgba(255,255,255,.07)" stroke="#cfd8d2" strokeWidth="5" />
    <svg x="125" y="125" width="150" height="170" overflow="hidden">
      <g className="water-rise"><path className="wavey" d="M-150 0 q37 -16 75 0 t75 0 t75 0 t75 0 t75 0 V200 H-150z" fill="#7fd0ff" /><rect x="0" y="12" width="150" height="200" fill="#7fd0ff" /></g>
      {bubbles.map((b, i) => (<circle key={i} className="sbub" cx={b.x} cy="160" r={b.r} fill="none" stroke="#fff" strokeWidth="2" style={{ animationDelay: `${b.d}s` }} />))}
    </svg>
  </S>)
}
function Grinding() {
  return (<S label="A grinding stone turning">
    <ellipse cx="200" cy="290" rx="120" ry="28" fill="#3d4843" /><ellipse cx="200" cy="272" rx="112" ry="28" fill="#5b6660" /><ellipse cx="200" cy="262" rx="104" ry="26" fill="#fff9e3" />
    <ellipse cx="200" cy="246" rx="86" ry="22" fill="#7b8781" /><rect x="114" y="226" width="172" height="20" fill="#7b8781" /><ellipse cx="200" cy="226" rx="86" ry="22" fill="#a2aea8" />
    <g transform="translate(200 226) scale(1 .26)"><g className="spin-plain"><line x1="0" y1="0" x2="86" y2="0" stroke="#b8864b" strokeWidth="14" strokeLinecap="round" /><circle cx="86" cy="0" r="16" fill="#8a5f2c" /></g></g>
    <circle className="drip" cx="286" cy="262" r="6" fill="#fff9e3" />
    <rect x="190" y="150" width="20" height="76" rx="8" fill="#8f9b95" /><rect x="168" y="140" width="64" height="16" rx="8" fill="#b8c4bd" />
  </S>)
}
function Fermenting() {
  return (<S label="Batter rising and bubbling in a bowl">
    <clipPath id="bowlclip"><path d="M90 130h220c0 90-40 160-110 160S90 220 90 130z" /></clipPath>
    <path d="M90 130h220c0 90-40 160-110 160S90 220 90 130z" fill="rgba(255,255,255,.08)" stroke="#e8efe9" strokeWidth="6" />
    <g clipPath="url(#bowlclip)">
      <g className="batter-rise"><rect x="80" y="30" width="240" height="280" fill="#fffbe3" /><ellipse cx="200" cy="30" rx="120" ry="14" fill="#fff" /></g>
      {fb.map((b, i) => (<circle key={i} className="sbub" cx={b.x} cy="270" r={b.r} fill="none" stroke="#e4d9a2" strokeWidth="2.5" style={{ animationDelay: `${b.d}s` }} />))}
    </g>
    <ellipse cx="200" cy="130" rx="110" ry="12" fill="none" stroke="#e8efe9" strokeWidth="6" />
    <rect x="130" y="290" width="140" height="12" rx="6" fill="#5b6660" />
  </S>)
}
function Packing() {
  return (<S label="Packs moving along a conveyor">
    <rect x="150" y="30" width="100" height="30" rx="8" fill="#b8c4bd" /><rect className="press" x="165" y="64" width="70" height="26" rx="6" fill="#e4ee2b" />
    <g className="belt">{[0, 1, 2, 3, 4].map((i) => (<g key={i} transform={`translate(${20 + i * 110} 150)`}><rect width="74" height="100" rx="8" fill="#fff" /><path d="M0 52C20 40 50 62 74 48V92a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill="#1f7a34" /><path d="M0 8a8 8 0 0 1 8-8h58a8 8 0 0 1 8 8v8H0z" fill="#115a2b" /><path d="M37 24c8 4 10 12 0 24-10-12-8-20 0-24z" fill="#3fa535" /></g>))}</g>
    <rect x="0" y="250" width="400" height="22" rx="11" fill="#25332c" />
  </S>)
}
function Cold() {
  return (<S label="Crates in a cold room">
    <circle className="frost" cx="200" cy="110" r="90" fill="rgba(160,225,255,.16)" />
    <g transform="translate(200 110)"><g className="snow" stroke="#d8f3ff" strokeWidth="7" strokeLinecap="round">{[0, 60, 120].map((r) => (<g key={r} transform={`rotate(${r})`}><line x1="-62" y1="0" x2="62" y2="0" /><path d="M-50 -12l-12 12 12 12M50 -12l12 12-12 12" fill="none" strokeWidth="5" /></g>))}</g></g>
    {[0, 1, 2, 3, 4].map((i) => (<g key={i}><rect className="crate" x={40 + i * 64} y="236" width="56" height="42" rx="7" fill={i % 2 ? '#2fb27a' : '#3858d6'} style={{ animationDelay: `${i * 0.15}s` }} /><rect className="crate" x={40 + i * 64} y="284" width="56" height="42" rx="7" fill={i % 2 ? '#3858d6' : '#2fb27a'} style={{ animationDelay: `${0.4 + i * 0.15}s` }} /></g>))}
  </S>)
}
function Delivery() {
  const city = (<g fill="rgba(255,255,255,.1)"><rect x="10" y="150" width="46" height="130" /><rect x="66" y="110" width="56" height="170" /><rect x="134" y="170" width="40" height="110" /><rect x="190" y="130" width="60" height="150" /><rect x="262" y="180" width="44" height="100" /><rect x="318" y="120" width="64" height="160" /></g>)
  return (<S label="A delivery truck driving past the city">
    <g className="city">{city}<g transform="translate(400 0)">{city}</g></g>
    <g className="pin"><path d="M330 70c-18 0-30 13-30 28 0 20 30 44 30 44s30-24 30-44c0-15-12-28-30-28z" fill="#e4ee2b" /><circle cx="330" cy="98" r="10" fill="#0b3d1e" /></g>
    <rect y="276" width="400" height="74" fill="#25332c" /><line className="dash" x1="0" y1="316" x2="400" y2="316" stroke="#e4ee2b" strokeWidth="5" strokeDasharray="26 18" />
    <g className="truck"><rect x="76" y="186" width="150" height="84" rx="10" fill="#fff" /><rect x="90" y="204" width="60" height="18" rx="9" fill="#1f7a34" /><path d="M226 212h44l26 28v30h-70z" fill="#1f7a34" /><path d="M238 222h28l16 18h-44z" fill="#bfe9ff" />
      {[116, 262].map((x) => (<g key={x}><circle cx={x} cy="272" r="17" fill="#10231a" /><circle className="wheel" cx={x} cy="272" r="8" fill="#b8c4bd" /></g>))}</g>
  </S>)
}
const MAP = { sourcing: Sourcing, soaking: Soaking, grinding: Grinding, fermenting: Fermenting, packing: Packing, cold: Cold, delivery: Delivery }
export default function Scene({ id }) {
  const C = MAP[id] || Delivery
  return <div className={`scene-wrap ${id}`}><C /></div>
}
