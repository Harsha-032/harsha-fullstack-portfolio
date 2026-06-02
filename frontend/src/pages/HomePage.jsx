import { Link, useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import {
  getPortfolioItems,
  getTechStack,
} from '../services/portfolioApi'
import HeroSection from '../sections/HeroSection'
import ProjectCard from '../components/common/ProjectCard'

function HomePage() {
  const { profile, loadingProfile } = useOutletContext()

  // 2. Fetch Featured Projects (only featured=true)
  const {
    data: projectsData,
    loading: loadingProjects,
  } = useApi(
    () => getPortfolioItems({ featured: true }),
    true,
    null
  )

  // 3. Fetch Top Skills (sorted by highest proficiency)
  const {
    data: skills,
    loading: loadingSkills,
  } = useApi(
    () => getTechStack({ ordering: '-proficiency' }),
    true,
    []
  )



  // Extract featured projects array
  const featuredProjects = projectsData?.results || []

  // Get top 6 skills for the summary section
  const topSkills = Array.isArray(skills) ? skills.slice(0, 6) : []

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      {loadingProfile ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <HeroSection profile={profile} />
      )}

      {/* Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
              Featured Work
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Selected Projects
            </h2>
          </div>

          <Link
            to="/projects"
            className="text-sm font-medium text-zinc-400 hover:text-white transition duration-200 flex items-center gap-1 group"
          >
            View All Projects
            <span className="transform group-hover:translate-x-1 transition duration-200">
              →
            </span>
          </Link>
        </div>

        {loadingProjects ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-zinc-950 border border-zinc-900 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
            <p className="text-zinc-500">No featured projects found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} item={project} />
            ))}
          </div>
        )}
      </section>

      {/* Skills Showcase Section */}
      <section className="border-t border-zinc-900 pt-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:sticky lg:top-32 space-y-4">
            <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
              Capabilities
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Core Skills & Technologies
            </h2>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              A brief list of my primary tech stacks and tools used to build production-ready systems. Click below to view detailed breakdown categories and proficiency mappings.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 text-sm font-medium transition duration-200"
              >
                View Full Bio & Experience
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            {loadingSkills ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-20 bg-zinc-950 border border-zinc-900 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : topSkills.length === 0 ? (
              <div className="text-zinc-500 py-6">No skills loaded.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {topSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 transition duration-200 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-white text-base">
                        {skill.name}
                      </h4>
                      
                      <span className="text-xs text-zinc-500 capitalize mt-1 inline-block">
                        {skill.category}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
