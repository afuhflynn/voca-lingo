"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AuthButtons() {
  const pathname = usePathname()

  // Don't show auth buttons on login or register pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Sign Up</Link>
      </Button>
    </div>
  )
}

