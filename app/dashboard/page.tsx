import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Mic, Settings, User, BookOpen, MessageSquare, FlameIcon as Fire, ChevronRight } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { LanguageSelector } from "@/components/language-selector"
import { XPProgress } from "@/components/xp-progress"
import { DailyGoal } from "@/components/daily-goal"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { VocabularyCard } from "@/components/vocabulary-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold gradient-text">Vocalingo</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
                <p className="text-gray-600 dark:text-gray-300">Continue your language journey</p>
              </div>
              <XPProgress xp={245} level={5} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DailyGoal completed={3} total={5} streak={7} />

              <Card className="col-span-1 md:col-span-2 gradient-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Basic Conversation",
                        description: "Practice everyday phrases",
                        progress: 60,
                        icon: <MessageSquare className="h-5 w-5 text-indigo-500" />,
                      },
                      {
                        title: "Food Vocabulary",
                        description: "Learn words for ordering at restaurants",
                        progress: 30,
                        icon: <BookOpen className="h-5 w-5 text-purple-500" />,
                      },
                    ].map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                          {lesson.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{lesson.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.description}</p>
                            </div>
                            <div className="text-xs font-medium">{lesson.progress}%</div>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full gradient-bg" style={{ width: `${lesson.progress}%` }}></div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full mt-2">
                      View All Lessons
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="practice">
              <TabsList className="mb-6">
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Voice Chat",
                      description: "Practice speaking with our AI tutor",
                      icon: <Mic className="h-6 w-6 text-white" />,
                      color: "from-indigo-500 to-purple-500",
                    },
                    {
                      title: "Daily Challenge",
                      description: "Complete today's challenge for bonus XP",
                      icon: <Fire className="h-6 w-6 text-white" />,
                      color: "from-orange-500 to-pink-500",
                    },
                    {
                      title: "Grammar Practice",
                      description: "Improve your sentence structure",
                      icon: <BookOpen className="h-6 w-6 text-white" />,
                      color: "from-green-500 to-teal-500",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="gradient-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}
                          >
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                            <Button className="w-full">Start</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <LeaderboardCard />
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-6">
                <VocabularyCard />
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card className="gradient-border">
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">Progress charts will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
