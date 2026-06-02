import { useApi } from '../../hooks/useApi'
import { getSocialLinks } from '../../services/portfolioApi'

function Footer({ profile }) {
  const { data: socialLinks } = useApi(
    getSocialLinks,
    true,
    []
  )



  // Helper to map platform name to readable name or icons
  const getPlatformLabel = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return 'GitHub'
      case 'linkedin':
        return 'LinkedIn'
      case 'leetcode':
        return 'LeetCode'
      case 'hackerrank':
        return 'HackerRank'
      case 'email':
        return 'Email'
      case 'resume':
        return 'Resume'
      default:
        return platform
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            {profile?.full_name || 'Portfolio'}
          </h2>
          
          <p className="text-sm text-zinc-500 mt-1">
            © {currentYear} Harsha. All rights reserved.
          </p>
        </div>

        {Array.isArray(socialLinks) && socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 capitalize font-medium"
              >
                {getPlatformLabel(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
