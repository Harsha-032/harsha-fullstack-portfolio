import { Outlet } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getProfile } from '../services/portfolioApi'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

function RootLayout() {
  // Centralized profile fetch to prevent redundant API calls across pages
  const { data: profile, loading: loadingProfile } = useApi(getProfile, true, null)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-zinc-800 selection:text-white">
      <Navbar profile={profile} />
      
      <main className="flex-grow pt-20">
        <Outlet context={{ profile, loadingProfile }} />
      </main>
      
      <Footer profile={profile} />
    </div>
  )
}

export default RootLayout

