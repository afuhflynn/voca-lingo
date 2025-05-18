import { Card, CardContent } from "@/components/ui/card";
// import { Clock, FlameIcon as Fire, BookOpen, Award } from "lucide-react";

export default function ProgressPage() {
  // const stats = [
  //   {
  //     title: "Current Streak",
  //     value: "7 days",
  //     icon: <Fire className="h-5 w-5 text-orange-500" />,
  //     change: "+2 from last week",
  //     positive: true,
  //   },
  //   {
  //     title: "Total XP",
  //     value: "1,245",
  //     icon: <Award className="h-5 w-5 text-indigo-500" />,
  //     change: "+320 this month",
  //     positive: true,
  //   },
  //   {
  //     title: "Words Learned",
  //     value: "342",
  //     icon: <BookOpen className="h-5 w-5 text-green-500" />,
  //     change: "+45 this week",
  //     positive: true,
  //   },
  //   {
  //     title: "Avg. Daily Time",
  //     value: "24 min",
  //     icon: <Clock className="h-5 w-5 text-blue-500" />,
  //     change: "-3 min from last week",
  //     positive: false,
  //   },
  // ];

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
