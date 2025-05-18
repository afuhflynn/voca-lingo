import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-auto inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 z-10 pt-6 pl-6">
        <Link href={"/"}>
          <Button variant={"ghost"} size={"lg"}>
            <ArrowLeft /> Back Home
          </Button>
        </Link>
      </div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 -z-10"></div>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              How <span className="gradient-text">Vocalingo</span> Transforms
              Language Learning
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Our AI-powered platform combines voice technology, personalized
              learning paths, and gamification to make language learning
              effective, engaging, and fun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-in">
                <Button size="lg" className="gradient-bg">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
