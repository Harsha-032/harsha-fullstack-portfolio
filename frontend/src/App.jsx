import { Suspense, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/common/SmoothScroll'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import Preloader from './components/common/Preloader'
import CustomCursor from './components/common/CustomCursor'
import { ThemeProvider } from './lib/theme'
import Landscape3D from './components/canvas/Landscape3D'
import { useScroll } from 'framer-motion'

function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])
  const { scrollYProgress } = useScroll()

  return (
    <ThemeProvider>
      {/* Preloader */}
      <Preloader onComplete={handleLoadComplete} />

      {/* Custom Cursor (Desktop only) */}
      {loaded && <CustomCursor />}

      {/* Main App */}
      <SmoothScroll />
      <>
        {/* Unified Dynamic Cinematic 3D WebGL Flight Background */}
        <Landscape3D scrollProgress={scrollYProgress} />
        <div className="fixed inset-0 bg-transparent pointer-events-none z-[1]" />

        {/* DOM Content */}
        <div className="relative z-10 font-sans selection:bg-emerald-500 selection:text-black antialiased">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout scrollYProgress={scrollYProgress} />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<ProjectDetailPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
