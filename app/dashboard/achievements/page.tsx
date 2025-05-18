import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AchievementsPage() {
  // const achievements = [
  //   {
  //     id: 1,
  //     title: "First Steps",
  //     description: "Complete your first lesson",
  //     category: "learning",
  //     icon: <BookOpen className="h-6 w-6 text-white" />,
  //     color: "from-green-500 to-emerald-500",
  //     progress: 100,
  //     completed: true,
  //     completedDate: "May 10, 2025",
  //     xp: 50,
  //   },
  //   {
  //     id: 2,
  //     title: "Consistent Learner",
  //     description: "Complete 7 days streak",
  //     category: "streak",
  //     icon: <Fire className="h-6 w-6 text-white" />,
  //     color: "from-orange-500 to-red-500",
  //     progress: 100,
  //     completed: true,
  //     completedDate: "May 12, 2025",
  //     xp: 100,
  //   },
  //   {
  //     id: 3,
  //     title: "Vocabulary Master",
  //     description: "Learn 100 new words",
  //     category: "learning",
  //     icon: <BookOpen className="h-6 w-6 text-white" />,
  //     color: "from-blue-500 to-indigo-500",
  //     progress: 65,
  //     completed: false,
  //     currentValue: 65,
  //     targetValue: 100,
  //     xp: 200,
  //   },
  //   {
  //     id: 4,
  //     title: "Perfect Pronunciation",
  //     description: "Get 10 'Perfect Pronunciation' ratings",
  //     category: "speaking",
  //     icon: <Mic className="h-6 w-6 text-white" />,
  //     color: "from-purple-500 to-pink-500",
  //     progress: 40,
  //     completed: false,
  //     currentValue: 4,
  //     targetValue: 10,
  //     xp: 150,
  //   },
  //   {
  //     id: 5,
  //     title: "Conversation Master",
  //     description: "Complete 20 voice chat sessions",
  //     category: "speaking",
  //     icon: <Mic className="h-6 w-6 text-white" />,
  //     color: "from-indigo-500 to-purple-500",
  //     progress: 25,
  //     completed: false,
  //     currentValue: 5,
  //     targetValue: 20,
  //     xp: 300,
  //   },
  //   {
  //     id: 6,
  //     title: "Month-long Dedication",
  //     description: "Maintain a 30-day streak",
  //     category: "streak",
  //     icon: <Calendar className="h-6 w-6 text-white" />,
  //     color: "from-red-500 to-pink-500",
  //     progress: 23,
  //     completed: false,
  //     currentValue: 7,
  //     targetValue: 30,
  //     xp: 500,
  //   },
  //   {
  //     id: 7,
  //     title: "Grammar Guru",
  //     description: "Score 100% on 5 grammar quizzes",
  //     category: "learning",
  //     icon: <Target className="h-6 w-6 text-white" />,
  //     color: "from-emerald-500 to-teal-500",
  //     progress: 20,
  //     completed: false,
  //     currentValue: 1,
  //     targetValue: 5,
  //     xp: 250,
  //   },
  //   {
  //     id: 8,
  //     title: "Speed Learner",
  //     description: "Complete 5 lessons in one day",
  //     category: "learning",
  //     icon: <Clock className="h-6 w-6 text-white" />,
  //     color: "from-yellow-500 to-amber-500",
  //     progress: 0,
  //     completed: false,
  //     currentValue: 0,
  //     targetValue: 5,
  //     xp: 200,
  //   },
  //   {
  //     id: 9,
  //     title: "Fluency Champion",
  //     description: "Reach advanced level in any language",
  //     category: "special",
  //     icon: <Trophy className="h-6 w-6 text-white" />,
  //     color: "from-amber-500 to-yellow-500",
  //     progress: 0,
  //     completed: false,
  //     locked: true,
  //     xp: 1000,
  //   },
  // ];

  // const totalEarnedXP = achievements
  //   .filter((a) => a.completed)
  //   .reduce((sum, a) => sum + a.xp, 0);

  // const totalPossibleXP = achievements.reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <Card className="mb-6 gradient-border">
            <CardContent className="p-6">
              <h1>In development... Coming soon</h1>
              {/* <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">
                    Achievement Progress
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You've earned {totalEarnedXP} XP from achievements so far!
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Progress</span>
                      <span className="font-medium">
                        {Math.round((totalEarnedXP / totalPossibleXP) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(totalEarnedXP / totalPossibleXP) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
