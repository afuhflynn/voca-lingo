import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-full w-full bg-background py-12 md:py-20 overflow-hidden flex flex-col justify-center items-center text-center">
      <div className="relative mb-14">
        <h1 className="relative text-4xl md:text-6xl font-bold leading-tight">
          Learn Languages with{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Voice Tutoring
          </span>
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12">
        Practice speaking, improve pronunciation, and build vocabulary with your
        personal AI language tutor.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Button asChild size="lg" className="relative overflow-hidden group">
          <Link href="/sign-in">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
