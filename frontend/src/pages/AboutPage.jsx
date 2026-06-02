import { useOutletContext } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { getExperiences } from '../services/portfolioApi'

function AboutPage() {
  const { profile, loadingProfile } = useOutletContext()

  // 2. Fetch Experiences
  const {
    data: experiences,
    loading: loadingExp,
  } = useApi(getExperiences, true, [])



  // Format date helper (e.g. "2025-03-01" -> "Mar 2025")
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  const getEmploymentTypeLabel = (type) => {
    switch (type) {
      case 'full_time':
        return 'Full Time'
      case 'internship':
        return 'Internship'
      case 'freelance':
        return 'Freelance'
      case 'contract':
        return 'Contract'
      default:
        return type
    }
  }

  const isLoading = loadingProfile || loadingExp

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
      {isLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Biography Block */}
          {profile && (
            <section className="space-y-8">
              <div className="space-y-4">
                <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
                  Biography
                </p>
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  About Me
                </h1>
              </div>

              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6 text-zinc-300 leading-relaxed text-base font-normal whitespace-pre-line">
                  {profile.about_description}
                </div>

                {/* Contact and Status Cards */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">
                      Location
                    </h3>
                    
                    <p className="text-sm font-medium text-white mt-1">
                      {profile.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">
                      Contact Email
                    </h3>
                    
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-medium text-blue-400 hover:underline mt-1 block"
                    >
                      {profile.email}
                    </a>
                  </div>

                  {profile.phone && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">
                        Phone
                      </h3>
                      
                      <p className="text-sm font-medium text-white mt-1">
                        {profile.phone}
                      </p>
                    </div>
                  )}

                  {profile.availability_status && (
                    <div className="pt-4 border-t border-zinc-900">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {profile.availability_status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Work Experience Timeline */}
          <section className="space-y-12">
            <div className="space-y-4">
              <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
                History
              </p>
              
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Work Experience
              </h2>
            </div>

            {experiences.length === 0 ? (
              <div className="text-zinc-500">No work experiences found.</div>
            ) : (
              <div className="relative border-l border-zinc-800 ml-4 pl-8 space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    {/* Circle timeline point */}
                    <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-black border-2 border-zinc-700 group-hover:border-blue-500 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-blue-500 transition-colors duration-200" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.role}
                          </h3>
                          
                          <p className="text-zinc-400 font-medium text-sm mt-0.5">
                            {exp.company}
                            <span className="text-zinc-600 mx-2">•</span>
                            <span className="text-xs font-semibold text-zinc-500 bg-zinc-900 px-2.5 py-0.5 rounded-full">
                              {getEmploymentTypeLabel(exp.employment_type)}
                            </span>
                          </p>
                        </div>

                        <span className="text-xs font-semibold text-zinc-400 self-start sm:self-center mt-1 sm:mt-0">
                          {formatDate(exp.start_date)} –{' '}
                          {exp.current ? 'Present' : formatDate(exp.end_date)}
                        </span>
                      </div>

                      <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line max-w-3xl">
                        {exp.description}
                      </p>

                      {exp.tech_used && (
                        <div className="flex flex-wrap gap-2 pt-1.5">
                          {exp.tech_used.split(',').map((tech) => (
                            <span
                              key={tech.trim()}
                              className="text-[11px] font-semibold text-zinc-400 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-md"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default AboutPage
