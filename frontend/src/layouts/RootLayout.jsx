import { Outlet } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getProfile } from '../services/portfolioApi'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

function RootLayout() {
  const { data: profile, loading: loadingProfile } = useApi(getProfile, true, null)

  return (
    <div className="relative min-h-screen text-white flex flex-col selection:bg-[#7c3aed] selection:text-white">
      <Navbar profile={profile} />
      
      <main className="flex-grow">
        <Outlet context={{ profile, loadingProfile }} />
      </main>
      
      <Footer profile={profile} />
    </div>
  )
}

export default RootLayout
