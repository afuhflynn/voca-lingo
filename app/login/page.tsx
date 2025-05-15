import { AuthForm } from "@/components/auth-form"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted transition-all duration-300 flex flex-col">
      <header className="container max-w-6xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <h1 className="relative text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vox
              </h1>
            </div>
          </Link>
          <ModeToggle />
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthForm defaultTab="login" />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Vox. All rights reserved.</p>
      </footer>
    </div>
  )
}

