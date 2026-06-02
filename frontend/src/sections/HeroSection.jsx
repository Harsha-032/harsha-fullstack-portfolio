import { Link } from 'react-router-dom'

function HeroSection({ profile }) {
  const headline = profile?.headline || ''
  const name = profile?.full_name || ''
  const bio = profile?.short_intro || ''

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16"
    >
      {/* Premium ambient light background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_55%)]" />

      <div className="text-center px-6 max-w-4xl">
        <p className="text-blue-400 font-semibold mb-4 text-sm tracking-widest uppercase">
          {headline}
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Hi, I'm {name}
        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 font-normal">
          {bio}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/projects"
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-center px-8 py-3.5 rounded-xl font-medium transition duration-200 shadow-lg shadow-white/5"
          >
            View Projects
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 text-center px-8 py-3.5 rounded-xl font-medium transition duration-200"
          >
            About & Contact
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection