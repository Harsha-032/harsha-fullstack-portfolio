import { useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getPortfolioItems } from '../services/portfolioApi'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/common/ProjectCard'

function ProjectsPage() {
  const { profile } = useOutletContext()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, loading, execute } = useApi(
    () => getPortfolioItems({ page, search }),
    true,
    null
  )

  const projects = data?.results || []
  const hasNext = !!data?.next
  const hasPrev = page > 1

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    execute()
  }

  return (
    <div className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#7c3aed] mb-6 block">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-white mb-6">
            All{' '}
            <span className="gradient-text-accent">Projects</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl">
            A collection of projects I've built, from full-stack applications to APIs and tools.
          </p>
        </motion.div>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-[#0d0d0d] border border-white/[0.06] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#7c3aed]/30 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-white/[0.04] text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-white/[0.02] border border-white/[0.04] animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/[0.06] rounded-2xl">
            <p className="text-zinc-600 text-sm">No projects found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} item={project} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {(hasPrev || hasNext) && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <button
              onClick={() => { if (hasPrev) { setPage(p => p - 1); execute() } }}
              disabled={!hasPrev}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                hasPrev
                  ? 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  : 'border-white/[0.04] text-zinc-700 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            <span className="text-xs text-zinc-600 font-mono">Page {page}</span>
            <button
              onClick={() => { if (hasNext) { setPage(p => p + 1); execute() } }}
              disabled={!hasNext}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                hasNext
                  ? 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  : 'border-white/[0.04] text-zinc-700 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage
