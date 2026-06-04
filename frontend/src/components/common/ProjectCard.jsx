import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ProjectCard({ item, index = 0 }) {
  const tags = item.tech_stack ? item.tech_stack.split(',').map(t => t.trim()) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl border border-white/[0.04] bg-[#0d0d0d] overflow-hidden flex flex-col gradient-border"
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-[#111111]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#7c3aed]/10 to-[#22d3ee]/5 flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <motion.div
            className="flex items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {item.github_url && (
              <a
                href={item.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white hover:bg-white/20 transition-all border border-white/10"
              >
                GitHub
              </a>
            )}
            {item.live_url && (
              <a
                href={item.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#7c3aed] text-xs font-medium text-white hover:bg-[#8b5cf6] transition-all"
              >
                Live Demo
              </a>
            )}
          </motion.div>
        </div>

        {/* Featured badge */}
        {item.featured && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 backdrop-blur-md border border-[#7c3aed]/20 px-2.5 py-1 rounded-full uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <Link
          to={`/projects/${item.slug}`}
          className="text-lg font-bold text-white hover:text-[#8b5cf6] transition-colors duration-300 line-clamp-1 tracking-tight"
        >
          {item.title}
        </Link>

        <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {item.tagline || 'View project details.'}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.04] px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] text-zinc-600 px-1">+{tags.length - 3}</span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={`/projects/${item.slug}`}
            className="text-xs font-semibold text-zinc-500 hover:text-[#8b5cf6] transition-colors inline-flex items-center gap-1 group/link"
          >
            View Case Study
            <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
