"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthButtons() {
  const pathname = usePathname();

  // Don't show auth buttons on login or register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="lg" className="relative overflow-hidden group">
        <Link href="/sign-in">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
