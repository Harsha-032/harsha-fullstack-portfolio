import { useEffect, useState } from 'react'

import Navbar from './components/common/Navbar'

import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'

import {
  getPortfolioItems,
  getTechStack,
} from './services/portfolioApi'


function App() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [currentProjectPage, setCurrentProjectPage] =
    useState(1)
  const [projectsPagination, setProjectsPagination] =
    useState(null)
  const [projectsError, setProjectsError] = useState('')
  const [skills, setSkills] = useState([])
  const [skillsError, setSkillsError] = useState('')

  const [loadingProjects, setLoadingProjects] =
    useState(true)

  const [loadingSkills, setLoadingSkills] =
    useState(true)

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      setLoadingProjects(true)
      setProjectsError('')

      try {
        const data = await getPortfolioItems(currentProjectPage)

        if (Array.isArray(data)) {
          setPortfolioItems(data)
          setProjectsPagination(null)
        } else {
          setPortfolioItems(data.results)
          setProjectsPagination({
            count: data.count,
            next: data.next,
            previous: data.previous,
          })
        }
      } catch (error) {
        console.error(error)
        setProjectsError(
          'Unable to load projects. Please try again later.'
        )
      } finally {
        setLoadingProjects(false)
      }
    }

    fetchPortfolioItems()
  }, [currentProjectPage])

  useEffect(() => {
    const fetchTechStack = async () => {
      setLoadingSkills(true)
      setSkillsError('')

      try {
        const data = await getTechStack()
        setSkills(data)
      } catch (error) {
        console.error(error)
        setSkillsError(
          'Unable to load skills. Please try again later.'
        )
      } finally {
        setLoadingSkills(false)
      }
    }

    fetchTechStack()
  }, [])

  return (
    <main className="bg-black text-white">
      <Navbar />

      <HeroSection />

      <ProjectsSection
        portfolioItems={portfolioItems}
        pagination={projectsPagination}
        currentPage={currentProjectPage}
        onPageChange={setCurrentProjectPage}
        error={projectsError}
        loading={loadingProjects}
      />

      <SkillsSection
        skills={skills}
        error={skillsError}
        loading={loadingSkills}
      />
    </main>
  )
}

export default App
