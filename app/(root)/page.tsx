import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Mic,
  Globe,
  Award,
  Zap,
  MessageSquare,
  BarChart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 -z-10"></div>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Learn Languages with{" "}
                <span className="gradient-text">AI Voice Conversations</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Vocalingo uses advanced AI to create natural, voice-first
                language learning experiences. Practice speaking, get instant
                feedback, and learn faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/sign-in">
                  <Button size="lg" className="gradient-bg">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative hidden sm:flex">
              <div className="w-full aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-3xl overflow-hidden gradient-border shadow-xl">
                  <div className="bg-white dark:bg-gray-900 h-full w-full p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">
                              ES
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold">Spanish</h3>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Intermediate
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">245 XP</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 overflow-auto">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                          <p className="text-sm">
                            ¿Cómo estuvo tu fin de semana?
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            How was your weekend?
                          </p>
                        </div>

                        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto">
                          <p className="text-sm">
                            Mi fin de semana fue muy bueno.
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Great pronunciation!
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                          <p className="text-sm">¿Qué hiciste?</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            What did you do?
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="relative">
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                              <Mic className="h-5 w-5 text-white" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Type or tap mic to speak..."
                            className="w-full rounded-full border border-gray-300 dark:border-gray-700 py-3 px-4 pr-14 bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
