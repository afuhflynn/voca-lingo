import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, FlameIcon as Fire, Calendar, ChevronRight } from "lucide-react"

interface LanguageProficiencyCardProps {
  language: {
    code: string
    name: string
    flag: string
    level: string
    progress: number
    xp: number
    streak: number
    startDate: string
  }
}

export function LanguageProficiencyCard({ language }: LanguageProficiencyCardProps) {
  return (
    <Card className="gradient-border overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{language.flag}</div>
          <div className="text-white">
            <h3 className="font-bold text-lg">{language.name}</h3>
            <p className="text-white/80 text-sm">{language.level}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{language.progress}%</span>
            </div>
            <Progress value={language.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400">
                <Zap className="h-4 w-4" />
                <span className="font-bold">{language.xp}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total XP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400">
                <Fire className="h-4 w-4" />
                <span className="font-bold">{language.streak}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
                <span className="font-bold">
                  {new Date(language.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Started</p>
            </div>
          </div>

          <Button className="w-full flex items-center justify-center">
            Continue Learning
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
