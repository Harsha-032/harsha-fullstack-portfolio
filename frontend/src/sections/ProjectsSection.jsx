import ProjectCard from '../components/common/ProjectCard'


function ProjectsSection({
  portfolioItems,
  pagination,
  currentPage,
  onPageChange,
  error,
  loading,
}) {
  return (
    <section
      id="projects"
      className="py-24"
    >      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 mb-3">
            Portfolio
          </p>

          <h2 className="text-4xl font-bold">
            Featured Projects
          </h2>

          {pagination && (
            <p className="text-gray-400 mt-3">
              {pagination.count} projects available
            </p>
          )}
        </div>

        {error ? (
          <p className="text-red-400">
            {error}
          </p>
        ) : loading ? (
          <p className="text-gray-400">
            Loading projects...
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <ProjectCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}

        {pagination && !error && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={!pagination.previous}
              onClick={() => onPageChange(currentPage - 1)}
              className="border border-zinc-700 px-4 py-2 rounded-xl font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-400">
              Page {currentPage}
            </span>

            <button
              type="button"
              disabled={!pagination.next}
              onClick={() => onPageChange(currentPage + 1)}
              className="bg-white text-black px-4 py-2 rounded-xl font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
