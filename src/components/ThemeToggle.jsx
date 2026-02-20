import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer font-medium transition-colors"
    >
      {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  )
}
