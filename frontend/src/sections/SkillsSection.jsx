import { useState } from 'react'

function SkillsSection({ skills, error, loading }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'tools', label: 'Tools & DevOps' },
    { id: 'cloud', label: 'Cloud Services' },
  ]

  // Filter skills based on selected category
  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section
      id="skills"
      className="py-24 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
              Expertise
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Skills & Tools
            </h2>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white border-white text-black'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className="text-red-400 py-12 text-center bg-red-500/5 rounded-2xl border border-red-500/10">
            {error}
          </div>
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-28 bg-zinc-950 border border-zinc-900 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
            <p className="text-zinc-500">No skills found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 transition duration-200 flex flex-col justify-between h-28"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white text-base">
                      {skill.name}
                    </h4>
                    
                    <span className="text-xs text-zinc-500 capitalize mt-0.5 inline-block">
                      {skill.category}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.proficiency}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsSection

