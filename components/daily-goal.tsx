import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlameIcon as Fire } from "lucide-react"

interface DailyGoalProps {
  completed: number
  total: number
  streak: number
}

export function DailyGoal({ completed, total, streak }: DailyGoalProps) {
  const progress = (completed / total) * 100

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Fire className="h-5 w-5 text-orange-500" />
            <span className="font-bold">{streak} Day Streak</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {completed}/{total} Completed
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${i < completed ? "gradient-bg" : "bg-gray-200 dark:bg-gray-700"}`}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
