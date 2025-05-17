import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Mic, Globe, Award, Zap, MessageSquare, BarChart, CheckCircle, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-indigo-500" />
            <span className="text-2xl font-bold gradient-text">Vocalingo</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-indigo-500 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-indigo-500 transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-indigo-500 transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="gradient-bg">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 -z-10"></div>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Learn Languages with <span className="gradient-text">AI Voice Conversations</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Vocalingo uses advanced AI to create natural, voice-first language learning experiences. Practice
                speaking, get instant feedback, and learn faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="gradient-bg">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900"
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join 10,000+ language learners</p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-3xl overflow-hidden gradient-border shadow-xl">
                  <div className="bg-white dark:bg-gray-900 h-full w-full p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">ES</span>
                          </div>
                          <div>
                            <h3 className="font-bold">Spanish</h3>
                            <div className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">Intermediate</span>
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
                          <p className="text-sm">¿Cómo estuvo tu fin de semana?</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">How was your weekend?</p>
                        </div>

                        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto">
                          <p className="text-sm">Mi fin de semana fue muy bueno.</p>
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">Great pronunciation!</span>
                          </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                          <p className="text-sm">¿Qué hiciste?</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">What did you do?</p>
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

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Features</span> That Make Learning Fun
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Vocalingo combines cutting-edge AI with proven language learning methods to create an engaging,
                effective experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mic className="h-8 w-8 text-indigo-500" />,
                  title: "Voice-First Learning",
                  description:
                    "Practice real conversations with our AI tutor that listens, responds, and helps improve your pronunciation.",
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
                  title: "Contextual Conversations",
                  description:
                    "Learn vocabulary and grammar in the context of real-life scenarios, not just isolated words and phrases.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-pink-500" />,
                  title: "Gamified Experience",
                  description:
                    "Earn XP, unlock achievements, and compete on leaderboards to stay motivated and track progress.",
                },
                {
                  icon: <Globe className="h-8 w-8 text-indigo-500" />,
                  title: "Multiple Languages",
                  description:
                    "Choose from a variety of languages with more being added regularly based on user feedback.",
                },
                {
                  icon: <BarChart className="h-8 w-8 text-purple-500" />,
                  title: "Progress Tracking",
                  description:
                    "Detailed insights into your learning journey with personalized recommendations for improvement.",
                },
                {
                  icon: <Award className="h-8 w-8 text-pink-500" />,
                  title: "Personalized Learning",
                  description:
                    "AI adapts to your learning style, pace, and interests to create a customized curriculum.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow gradient-border"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How <span className="gradient-text">Vocalingo</span> Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered platform makes language learning intuitive and effective
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose Your Language",
                  description:
                    "Select from multiple languages and set your proficiency level to get a personalized learning path.",
                },
                {
                  step: "02",
                  title: "Practice Daily",
                  description:
                    "Engage in voice conversations, vocabulary exercises, and grammar lessons tailored to your goals.",
                },
                {
                  step: "03",
                  title: "Track Your Progress",
                  description:
                    "Monitor your improvement, earn rewards, and celebrate milestones as you advance toward fluency.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm gradient-border h-full">
                    <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-indigo-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl gradient-border">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Start Your <span className="gradient-text">Language Journey</span>?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Join thousands of learners who are already improving their language skills with Vocalingo's
                    AI-powered platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="gradient-bg">
                      Get Started Free
                    </Button>
                    <Button size="lg" variant="outline">
                      Explore Languages
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full gradient-bg flex items-center justify-center">
                    <Mic className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Globe className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold gradient-text">Vocalingo</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Vocalingo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
