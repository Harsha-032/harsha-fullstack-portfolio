import { useEffect, useState } from 'react'
import Navbar from './components/common/Navbar'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'

import { getPortfolioItems } from './services/portfolioApi'


function App() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const data = await getPortfolioItems()
        setPortfolioItems(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [])

  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroSection />

      <ProjectsSection
        portfolioItems={portfolioItems}
        loading={loading}
      />
    </main>
  )
}

export default App