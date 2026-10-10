# Sridhi website (React + Vite)

Marketing site for Sridhi Idli & Dosa Batter, Chennai.

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Stack
React 19, Vite, framer-motion. Plain CSS in `src/index.css` (colour tokens at the top).

## Edit your content
- `src/data.js`: phone numbers, email, address, process steps, client list.
- `public/images/`: packet cutout (`packet.png`), logo, gallery photos and client logos.
- Replace images in `public/images/gallery/` with higher-resolution photos for sharper results.

## Sections
Hero (3D-tilting packet) > promise strip > "why" bento cards > scroll-driven process viewer >
lifestyle hotspots > about + count-up stats > client logo marquee > enquiry form (WhatsApp / email) > footer.
Animations respect `prefers-reduced-motion`.
