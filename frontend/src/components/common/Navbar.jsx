function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Harsha
          </h1>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <li>
            <a
              href="#"
              className="hover:text-white transition"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#projects"
              className="hover:text-white transition"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="hover:text-white transition"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </li>
        </ul>

        <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium">
          Resume
        </button>
      </nav>
    </header>
  )
}

export default Navbar