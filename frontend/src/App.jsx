import { Suspense, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { ReactLenis } from 'lenis/react'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import FloatingParticles from './components/canvas/FloatingParticles'
import Preloader from './components/common/Preloader'
import CustomCursor from './components/common/CustomCursor'

function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handleLoadComplete} />

      {/* Custom Cursor (Desktop only) */}
      {loaded && <CustomCursor />}

      {/* Main App */}
      <ReactLenis root options={{ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.8 }}>
        {/* Fixed WebGL Particle Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
          >
            <Suspense fallback={null}>
              <FloatingParticles count={600} />
            </Suspense>
          </Canvas>
        </div>

        {/* DOM Content */}
        <div className="relative z-10">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<ProjectDetailPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ReactLenis>
    </>
  )
}

export default App
