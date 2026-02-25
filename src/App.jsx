import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import FeaturedPro from './components/FeaturedPro'
import Team from './components/Team'
import TrackRecord from './components/TrackRecord'
import Insights from './components/Insights'
import SecureIntake from './components/SecureIntake'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'

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
        <TrackRecord />
        <Insights />
        <SecureIntake />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}

export default App
