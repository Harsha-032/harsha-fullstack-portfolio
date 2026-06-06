import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getPortfolioItemBySlug } from '../services/portfolioApi'
import { motion } from 'framer-motion'

function ProjectDetailPage() {
  const { slug } = useParams()

  const {
    data: project,
    loading,
    error,
    execute: fetchProject,
  } = useApi(() => getPortfolioItemBySlug(slug), false, null)

  useEffect(() => {
    if (slug) {
      fetchProject().catch(() => {})
    }
  }, [slug, fetchProject])

  return (
    <div className="relative pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Projects
          </Link>
        </motion.div>

        {error ? (
          <div className="text-center py-20 border border-dashed border-white/[0.06] rounded-2xl space-y-4">
            <p className="text-red-400 text-lg font-medium">{error}</p>
            <Link
              to="/projects"
              className="inline-flex px-5 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm"
            >
              Return to Projects
            </Link>
          </div>
        ) : loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="h-10 w-2/3 bg-white/[0.02] border border-white/[0.04] rounded-xl" />
            <div className="h-6 w-1/3 bg-white/[0.02] border border-white/[0.04] rounded-xl" />
            <div className="h-72 w-full bg-white/[0.02] border border-white/[0.04] rounded-2xl" />
          </div>
        ) : !project ? (
          <div className="text-center py-20 border border-dashed border-white/[0.06] rounded-2xl">
            <p className="text-zinc-600 text-sm">Project not found.</p>
          </div>
        ) : (
          <motion.article
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wider text-zinc-600 uppercase">
                {project.project_period && <span>{project.project_period}</span>}
                {project.featured && (
                  <>
                    <span>•</span>
                    <span className="text-[#7c3aed] bg-[#7c3aed]/10 px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white leading-tight">
                {project.title}
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Meta panel */}
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#0d0d0d] grid gap-6 md:grid-cols-3 items-center">
              <div className="md:col-span-2 space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.split(',').map((tech) => (
                    <span
                      key={tech.trim()}
                      className="text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-lg"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col gap-3 md:items-end">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-semibold transition-all w-full sm:w-auto"
                  >
                    GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/10 text-zinc-300 hover:text-white text-sm font-semibold transition-all w-full sm:w-auto"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            {project.image && (
              <div className="overflow-hidden border border-white/[0.04] rounded-2xl bg-[#0d0d0d]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Content */}
            <div className="border-t border-white/[0.04] pt-12">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-8">
                Case Study
              </h3>
              <div
                className="prose prose-invert max-w-none text-zinc-400 leading-[1.8]
                  prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                  prose-a:text-[#8b5cf6] hover:prose-a:text-[#a855f7]
                  prose-ul:list-disc prose-ul:pl-6
                  prose-li:text-zinc-400
                  prose-strong:text-white prose-strong:font-semibold
                  prose-code:text-[#22d3ee] prose-code:bg-[#0d0d0d] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </motion.article>
        )}
      </div>
    </div>
  )
}

export default ProjectDetailPage
