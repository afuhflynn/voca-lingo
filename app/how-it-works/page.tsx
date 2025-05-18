import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Brain,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  BookOpen,
  Sparkles,
  Lightbulb,
  Clock,
  ArrowLeft,
} from "lucide-react";

const learningJourney = [
  {
    step: "01",
    title: "Choose Your Language & Set Goals",
    description:
      "Select from multiple languages and set your proficiency level. Define your learning goals and schedule to create a personalized learning path.",
    icon: <Globe className="h-6 w-6 text-white" />,
  },
  {
    step: "02",
    title: "Complete Personalized Lessons",
    description:
      "Engage with interactive lessons tailored to your goals and learning style. Each lesson combines vocabulary, grammar, and practical usage.",
    icon: <BookOpen className="h-6 w-6 text-white" />,
    right: true,
  },
  {
    step: "03",
    title: "Practice with AI Voice Conversations",
    description:
      "Have natural conversations with our AI tutor that listens, responds, and provides instant feedback on your pronunciation and grammar.",
    icon: <Mic className="h-6 w-6 text-white" />,
  },
  {
    step: "04",
    title: "Track Progress & Earn Rewards",
    description:
      "Monitor your improvement through detailed analytics. Earn XP, unlock achievements, and maintain streaks to stay motivated.",
    icon: <Award className="h-6 w-6 text-white" />,
    right: true,
  },
  {
    step: "05",
    title: "Review & Reinforce",
    description:
      "Our spaced repetition system ensures you review content at optimal intervals to strengthen memory retention and prevent forgetting.",
    icon: <CheckCircle className="h-6 w-6 text-white" />,
  },
];

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

        {/* Learning Journey Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your <span className="gradient-text">Learning Journey</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Vocalingo guides you through a structured yet flexible learning
                path designed to build real-world language skills.
              </p>
            </div>

            <div className="relative">
              {/* Desktop timeline line */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 transform -translate-x-1/2"></div>

              <div className="space-y-12 md:space-y-0 relative">
                {learningJourney.map((item, index) => (
                  <div
                    key={index}
                    className={`md:flex ${
                      item.right ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <div
                      className={`relative md:w-1/2 ${
                        item.right
                          ? "md:ml-auto md:mr-8 lg:mr-12"
                          : "md:mr-auto md:ml-8 lg:ml-12"
                      }`}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md gradient-border relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-2xl font-bold gradient-text mb-2">
                              {item.step}
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline dot - visible on desktop */}
                      <div className="hidden md:block absolute top-1/2 w-6 h-6 rounded-full gradient-bg z-20 transform -translate-y-1/2 border-4 border-white dark:border-gray-800">
                        {item.right ? (
                          <div className="absolute -left-[1px] top-1/2 h-[2px] w-8 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-y-1/2"></div>
                        ) : (
                          <div className="absolute -right-[1px] top-1/2 h-[2px] w-8 bg-gradient-to-r from-purple-500 to-indigo-500 transform -translate-y-1/2"></div>
                        )}
                      </div>
                      {item.right ? (
                        <div className="hidden md:block absolute right-full top-1/2 transform -translate-y-1/2 -translate-x-4">
                          <ArrowRight className="h-6 w-6 text-indigo-500" />
                        </div>
                      ) : (
                        <div className="hidden md:block absolute left-full top-1/2 transform -translate-y-1/2 translate-x-4">
                          <ArrowRight className="h-6 w-6 text-indigo-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learning Methodology Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="gradient-text">Learning Methodology</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Vocalingo's approach is based on proven language acquisition
                research and cognitive science principles.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  {[
                    {
                      title: "Immersive Learning",
                      description:
                        "Learn language in context through conversations and real-world scenarios rather than isolated vocabulary and grammar drills.",
                      icon: <Sparkles className="h-6 w-6 text-indigo-500" />,
                    },
                    {
                      title: "Active Recall",
                      description:
                        "Strengthen memory through exercises that require you to actively retrieve information rather than passively recognize it.",
                      icon: <Brain className="h-6 w-6 text-purple-500" />,
                    },
                    {
                      title: "Comprehensible Input",
                      description:
                        "Expose you to language slightly above your current level to challenge you while remaining understandable and engaging.",
                      icon: <Lightbulb className="h-6 w-6 text-pink-500" />,
                    },
                    {
                      title: "Distributed Practice",
                      description:
                        "Space out learning sessions over time rather than cramming, which research shows leads to better long-term retention.",
                      icon: <Clock className="h-6 w-6 text-indigo-500" />,
                    },
                  ].map((method, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
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
                              ¿Qué hiciste el fin de semana?
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              What did you do on the weekend?
                            </p>
                          </div>

                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl rounded-tr-sm max-w-[80%] ml-auto">
                            <p className="text-sm">
                              Fui al parque con mis amigos.
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600 dark:text-green-400">
                                Great pronunciation!
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                            <p className="text-sm">
                              ¿Te divertiste? ¿Qué hicieron allí?
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Did you have fun? What did you do there?
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
          </div>
        </section>
      </main>
    </div>
  );
}
