import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./ui/logo";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 z-10 gradient-bg-subtle">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works">
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button size="lg" className="gradient-bg">
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
