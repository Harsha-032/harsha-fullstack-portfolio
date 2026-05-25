function SkillsSection({
  skills,
  error,
  loading,
}) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }

    acc[skill.category].push(skill)

    return acc
  }, {})

  return (
    <section
      id="skills"
      className="py-24 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 mb-3">
            Technologies
          </p>

          <h2 className="text-4xl font-bold">
            Skills & Tools
          </h2>
        </div>

        {error ? (
          <p className="text-red-400">
            {error}
          </p>
        ) : loading ? (
          <p className="text-gray-400">
            Loading skills...
          </p>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(
              ([category, items]) => (
                <div key={category}>
                  <h3 className="text-2xl font-semibold capitalize mb-6">
                    {category}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">
                            {skill.name}
                          </h4>

                          <span className="text-sm text-gray-400">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="w-full bg-zinc-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${skill.proficiency}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsSection
