import { useState, useEffect, useCallback } from 'react'
import { useApi } from '../hooks/useApi'
import { getPortfolioItems } from '../services/portfolioApi'
import ProjectCard from '../components/common/ProjectCard'

function ProjectsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [featured, setFeatured] = useState(false)
  const [ordering, setOrdering] = useState('-created_at')

  // API handler using useApi. immediate is false because we will manually synchronize via useEffect
  const {
    data: projectsData,
    loading,
    error,
    execute: fetchProjects,
  } = useApi(getPortfolioItems, false, null)

  const loadProjects = useCallback(() => {
    fetchProjects({
      page,
      search,
      featured: featured ? true : null, // Backend handles featured=true, or ignores if null
      ordering,
    }).catch(() => {
      // Handled in UI
    })
  }, [fetchProjects, page, search, featured, ordering])

  // Fetch whenever filters or pages change
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Reset page to 1 when filters change
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleFeaturedChange = (e) => {
    setFeatured(e.target.checked)
    setPage(1)
  }

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value)
    setPage(1)
  }

  const projects = projectsData?.results || []
  const count = projectsData?.count || 0
  const hasNext = !!projectsData?.next
  const hasPrev = !!projectsData?.previous

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Title Header */}
      <div className="space-y-4">
        <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
          Catalog
        </p>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          All Projects
        </h1>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 grid gap-6 md:grid-cols-4 items-center">
        {/* Search input */}
        <div className="md:col-span-2 relative">
          <label
            htmlFor="project-search"
            className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2"
          >
            Search Projects
          </label>
          
          <input
            id="project-search"
            type="text"
            placeholder="Search by title, description, or tags..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-black border border-zinc-800 text-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition duration-200"
          />
        </div>

        {/* Featured checkbox toggle */}
        <div className="flex items-center gap-3 pt-6 md:pt-0">
          <input
            id="featured-filter"
            type="checkbox"
            checked={featured}
            onChange={handleFeaturedChange}
            className="w-4 h-4 rounded border-zinc-800 bg-black text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          
          <label
            htmlFor="featured-filter"
            className="text-sm font-medium text-zinc-400 cursor-pointer select-none"
          >
            Featured Projects Only
          </label>
        </div>

        {/* Ordering selection */}
        <div>
          <label
            htmlFor="project-ordering"
            className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2"
          >
            Order By
          </label>
          
          <select
            id="project-ordering"
            value={ordering}
            onChange={handleOrderingChange}
            className="w-full bg-black border border-zinc-800 text-zinc-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 cursor-pointer transition duration-200"
          >
            <option value="-created_at">Newest First</option>
            <option value="created_at">Oldest First</option>
            <option value="title">Alphabetical (A-Z)</option>
            <option value="-title">Alphabetical (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {error ? (
        <div className="text-red-400 py-12 text-center bg-red-500/5 rounded-2xl border border-red-500/10">
          {error}
        </div>
      ) : loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 bg-zinc-950 border border-zinc-900 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
          <p className="text-zinc-500 text-base">
            No projects found matching the search criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-zinc-500 font-medium">
            Showing {projects.length} of {count} projects
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} item={project} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-6 pt-8 border-t border-zinc-900">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={!hasPrev || loading}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-500 text-sm font-medium text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition duration-200"
            >
              Previous
            </button>

            <span className="text-sm font-semibold text-zinc-400">
              Page {page}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNext || loading}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-500 text-sm font-medium text-zinc-300 hover:text-white disabled:opacity-40 disabled:hover:border-zinc-800 disabled:hover:text-zinc-300 disabled:cursor-not-allowed transition duration-200"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectsPage
