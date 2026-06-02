import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getPortfolioItemBySlug } from '../services/portfolioApi'

function ProjectDetailPage() {
  const { slug } = useParams()

  // API handler using useApi. immediate is false because we need the slug parameter
  const {
    data: project,
    loading,
    error,
    execute: fetchProject,
  } = useApi(() => getPortfolioItemBySlug(slug), false, null)

  // Fetch when slug changes
  useEffect(() => {
    if (slug) {
      fetchProject().catch(() => {
        // Handled in UI error state
      })
    }
  }, [slug, fetchProject])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Back navigation */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition duration-200"
        >
          <span>←</span> Back to Projects
        </Link>
      </div>

      {error ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20 space-y-4">
          <p className="text-red-400 text-lg font-medium">{error}</p>
          
          <Link
            to="/projects"
            className="inline-flex px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            Return to Catalog
          </Link>
        </div>
      ) : loading ? (
        <div className="space-y-8 animate-pulse">
          <div className="h-10 w-2/3 bg-zinc-950 border border-zinc-900 rounded-xl" />
          <div className="h-6 w-1/3 bg-zinc-950 border border-zinc-900 rounded-xl" />
          <div className="h-64 w-full bg-zinc-950 border border-zinc-900 rounded-2xl" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-950 border border-zinc-900 rounded" />
            <div className="h-4 w-full bg-zinc-950 border border-zinc-900 rounded" />
            <div className="h-4 w-5/6 bg-zinc-950 border border-zinc-900 rounded" />
          </div>
        </div>
      ) : !project ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
          <p className="text-zinc-500">Project details could not be loaded.</p>
        </div>
      ) : (
        <article className="space-y-12">
          {/* Header Block */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              <span>{project.project_period}</span>
              {project.featured && (
                <>
                  <span>•</span>
                  <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Project URLs and Tech Badges Dashboard */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 grid gap-6 md:grid-cols-3 items-center">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Technologies Used
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.split(',').map((tech) => (
                  <span
                    key={tech.trim()}
                    className="text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col gap-3 justify-start md:justify-end md:items-end">
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-semibold transition duration-200 w-full sm:w-auto text-center"
              >
                GitHub Code
              </a>

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-sm font-semibold transition duration-200 w-full sm:w-auto text-center"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Image Display */}
          {project.image && (
            <div className="overflow-hidden border border-zinc-900 rounded-2xl bg-zinc-950/40">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
          )}

          {/* Detailed CKEditor HTML Description Block */}
          <div className="border-t border-zinc-900 pt-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6">
              Project Case Study
            </h3>
            
            <div
              className="prose prose-invert max-w-none text-zinc-300 space-y-4 leading-relaxed
                prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                prose-h4:text-lg prose-h4:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                prose-li:text-zinc-300 prose-a:text-blue-400 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        </article>
      )}
    </div>
  )
}

export default ProjectDetailPage
