import Hero from './components/Hero'
import Trabajos from './components/Trabajos'
import Servicios from './components/Servicios'
import FAQ from './components/FAQ'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LayersSidebar from './components/LayersSidebar'
import TopToolbar from './components/TopToolbar'
import StatusBar from './components/StatusBar'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <TopToolbar />
      <LayersSidebar />
      <div className="pt-10 pb-7">
        <Hero />
        <Trabajos />
        <Servicios />
        <FAQ />
      </div>
      <FloatingWhatsApp />
      <StatusBar />
    </div>
  )
}
