import Navbar from './components/Navbar'
import Hero, { TrustStrip } from './components/Hero'
import Why from './components/Why'
import Process from './components/Process'
import Showcase from './components/Showcase'
import About from './components/About'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Why />
        <Process />
        <Showcase />
        <About />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
