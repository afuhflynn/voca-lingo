"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Globe className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="font-bold text-xl">Vocalingo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={`${isActive("/dashboard") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"} hover:text-[var(--color-primary)] hover:no-underline`}
            >
              Dashboard
            </Link>
            <Link
              href="/languages"
              className={`${isActive("/languages") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"} hover:text-[var(--color-primary)] hover:no-underline`}
            >
              Languages
            </Link>
            <Link
              href="/practice"
              className={`${isActive("/practice") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"} hover:text-[var(--color-primary)] hover:no-underline`}
            >
              Practice
            </Link>
            <Link
              href="/leaderboard"
              className={`${isActive("/leaderboard") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"} hover:text-[var(--color-primary)] hover:no-underline`}
            >
              Leaderboard
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="btn-primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/dashboard"
              className={`block py-2 ${isActive("/dashboard") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/languages"
              className={`block py-2 ${isActive("/languages") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"}`}
              onClick={closeMenu}
            >
              Languages
            </Link>
            <Link
              href="/practice"
              className={`block py-2 ${isActive("/practice") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"}`}
              onClick={closeMenu}
            >
              Practice
            </Link>
            <Link
              href="/leaderboard"
              className={`block py-2 ${isActive("/leaderboard") ? "text-[var(--color-primary)]" : "text-slate-700 dark:text-slate-200"}`}
              onClick={closeMenu}
            >
              Leaderboard
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Link href="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={closeMenu}>
                <Button className="btn-primary w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
