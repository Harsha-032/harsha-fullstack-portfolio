function ProjectCard({ item }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-semibold mb-3">
        {item.title}
      </h2>

      <div
        className="text-gray-300 mb-4"
        dangerouslySetInnerHTML={{
          __html: item.description,
        }}
      />

      <p className="text-sm text-blue-400 mb-4">
        {item.tech_stack}
      </p>

      <div className="flex gap-4">
        <a
          href={item.github_url}
          target="_blank"
          className="text-white underline"
        >
          GitHub
        </a>

        {item.live_url && (
          <a
            href={item.live_url}
            target="_blank"
            className="text-green-400 underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard