import Header from './components/header'
import Hero from './components/hero'
import Aboutus from './components/Aboutus'
import { Maquee } from './components/Maquee'
import Ourvision from './components/Ourvision'
import Faq from "./components/faq";



const App = () => {
  return (
    <div className="bg-white min-h-screen relative">
      <Header />
      <Hero/>
     <Maquee/>
     <Aboutus/>
     <Ourvision/>
     <Faq/>
  
    </div>
  )
}

export default App