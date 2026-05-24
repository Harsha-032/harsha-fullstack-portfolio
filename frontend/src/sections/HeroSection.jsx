function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center"
    >      <div className="text-center">
        <p className="text-blue-400 mb-4 text-lg">
          Full Stack Developer
        </p>

        <h1 className="text-6xl font-bold mb-6">
          Hi, I'm Harsha
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          I build scalable full-stack applications using
          React, Django, REST APIs, and modern cloud
          technologies.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium">
            View Projects
          </button>

          <button className="border border-zinc-700 px-6 py-3 rounded-xl font-medium">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection