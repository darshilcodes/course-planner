import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: "/", label: "Planner" },
    { to: "/courses", label: "All Courses" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4 md:gap-8">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                PurePlanner
              </span>
            </NavLink>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden absolute top-16 left-0 w-full bg-background border-b border-border overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 md:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-6 text-center text-sm text-foreground/40">
          © {new Date().getFullYear()} PurePlanner. Built for efficiency.
        </div>
      </footer>
    </div>
  )
}
