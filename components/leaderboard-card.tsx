import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export function LeaderboardCard() {
  const leaderboardData = [
    { rank: 1, name: "Sarah K.", xp: 1250, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "Miguel R.", xp: 1120, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "Aisha T.", xp: 980, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "You", xp: 845, avatar: "/placeholder.svg?height=40&width=40", isUser: true },
    { rank: 5, name: "David L.", xp: 790, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Leaderboard
          </CardTitle>
          <span className="text-sm text-indigo-500 cursor-pointer">View All</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                user.isUser ? "bg-indigo-50 dark:bg-indigo-900/20" : ""
              }`}
            >
              <div className="w-8 text-center font-bold text-gray-500 dark:text-gray-400">{user.rank}</div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  {user.name} {user.isUser && <span className="text-xs text-indigo-500">(You)</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{user.xp}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">XP</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
