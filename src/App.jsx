import { useCallback, useMemo, useState } from 'react'
import { QuoteCtx } from './quote'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero, { TrustStrip } from './components/Hero'
import Statement from './components/Statement'
import Stats from './components/Stats'
import About from './components/About'
import Pack5kg from './components/Pack5kg'
import Clients from './components/Clients'
import OneKg from './components/OneKg'
import PlateZoom from './components/PlateZoom'
import Features from './components/Features'
import Process from './components/Process'
import Taste from './components/Taste'
import Serve from './components/Serve'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import WhatsAppFab from './components/WhatsAppFab'
import CursorGlow from './components/CursorGlow'

export default function App() {
  const [ready, setReady] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const onExit = useCallback(() => setReady(true), [])
  const ctx = useMemo(() => ({ isOpen, open: () => setOpen(true), close: () => setOpen(false) }), [isOpen])
  return (
    <QuoteCtx.Provider value={ctx}>
      <Preloader onExit={onExit} />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <TrustStrip />
        <Clients />
        <Pack5kg />
        <Stats />
        <About />
        <Statement />
        <PlateZoom />
        <Features />
        <Process />
        <Taste />
        <OneKg />
        <Serve />
      </main>
      <Footer />
      <QuoteModal />
      <WhatsAppFab />
    </QuoteCtx.Provider>
  )
}
