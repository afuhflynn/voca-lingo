import { Zap } from "lucide-react"

interface XPProgressProps {
  xp: number
  level: number
}

export function XPProgress({ xp, level }: XPProgressProps) {
  // Calculate progress to next level (just for demo)
  const nextLevelXP = 300
  const progress = Math.min(100, (xp / nextLevelXP) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm gradient-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{xp} XP</span>
            <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full">
              Level {level}
            </span>
          </div>
          <div className="xp-progress mt-1 w-32 sm:w-48">
            <div className="xp-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{xp} XP</span>
            <span>{nextLevelXP} XP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
