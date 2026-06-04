import { useApi } from '../../hooks/useApi'
import { getSocialLinks } from '../../services/portfolioApi'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa'

const platformIcons = {
  github: <FaGithub size={18} />,
  linkedin: <FaLinkedin size={18} />,
  email: <FaEnvelope size={18} />,
  leetcode: <FaCode size={18} />,
}

function Footer({ profile }) {
  const { data: socialLinks } = useApi(getSocialLinks, true, [])
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#050505]">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-black tracking-tight text-white">
              {profile?.full_name || 'Harsha C'}
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social links */}
          {Array.isArray(socialLinks) && socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#7c3aed]/30 hover:bg-[#7c3aed]/10 transition-all duration-300"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {platformIcons[link.platform?.toLowerCase()] || <FaCode size={16} />}
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
