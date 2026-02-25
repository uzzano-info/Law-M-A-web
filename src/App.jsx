import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import FeaturedPro from './components/FeaturedPro'
import Team from './components/Team'
import Insights from './components/Insights'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Expertise />
        <FeaturedPro />
        <Team />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
