import ProjectCard from '../components/common/ProjectCard'


function ProjectsSection({ portfolioItems, loading }) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 mb-3">
            Portfolio
          </p>

          <h2 className="text-4xl font-bold">
            Featured Projects
          </h2>
        </div>

        {loading ? (
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
      </div>
    </section>
  )
}

export default ProjectsSection