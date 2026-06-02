import { Link } from 'react-router-dom'

function ProjectCard({ item }) {
  // Split tech stack string into array for tag chips
  const tags = item.tech_stack ? item.tech_stack.split(',') : []

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden flex flex-col justify-between h-[420px] transition-all duration-300 hover:border-zinc-800 hover:-translate-y-1 shadow-lg shadow-black/5 hover:shadow-black/20 group">
      
      {/* Project Image */}
      <div className="h-44 overflow-hidden relative bg-zinc-900 border-b border-zinc-900 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-zinc-800 group-hover:text-zinc-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* Featured Tag Badge */}
        {item.featured && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider text-blue-400 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 px-2.5 py-1 rounded-full uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <Link
            to={`/projects/${item.slug}`}
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200 line-clamp-1"
          >
            {item.title}
          </Link>
          
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-normal">
            {item.tagline || 'View project study details.'}
          </p>
        </div>

        {/* Tags Block (capped at 4 for space layout) */}
        <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden max-h-[58px]">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag.trim()}
              className="text-[10px] font-semibold text-zinc-500 bg-zinc-900 border border-zinc-900 px-2 py-0.5 rounded"
            >
              {tag.trim()}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] font-semibold text-zinc-600 px-1 py-0.5">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer link controls */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="flex gap-4">
          <a
            href={item.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors duration-200 hover:underline"
          >
            GitHub
          </a>

          {item.live_url && (
            <a
              href={item.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors duration-200 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>

        <Link
          to={`/projects/${item.slug}`}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard