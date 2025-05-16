"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Star, Users, Calendar } from "lucide-react"
import Image from "next/image"

type LeaderboardUser = {
  id: number
  name: string
  avatar: string
  xp: number
  streak: number
  language: string
  rank?: number
}

// Mock leaderboard data
const leaderboardData: LeaderboardUser[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 12450,
    streak: 30,
    language: "Spanish",
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 10820,
    streak: 25,
    language: "French",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 9750,
    streak: 18,
    language: "Spanish",
  },
  {
    id: 4,
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 8900,
    streak: 22,
    language: "Mandarin",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 8200,
    streak: 15,
    language: "Italian",
  },
  {
    id: 6,
    name: "James Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 7800,
    streak: 12,
    language: "German",
  },
  {
    id: 7,
    name: "Olivia Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 7500,
    streak: 20,
    language: "Japanese",
  },
  {
    id: 8,
    name: "Lucas Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 6900,
    streak: 10,
    language: "Spanish",
  },
  {
    id: 9,
    name: "Ava Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 6500,
    streak: 8,
    language: "French",
  },
  {
    id: 10,
    name: "Noah Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    xp: 6200,
    streak: 14,
    language: "German",
  },
]

// Mock user data (the current user)
const currentUser: LeaderboardUser = {
  id: 42,
  name: "You",
  avatar: "/placeholder.svg?height=40&width=40",
  xp: 7200,
  streak: 16,
  language: "Spanish",
  rank: 7,
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "alltime">("weekly")
  const [filter, setFilter] = useState<"all" | "friends">("all")
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll just sort the mock data and add ranks
    const sortedData = [...leaderboardData].sort((a, b) => b.xp - a.xp)

    // Add ranks
    const rankedData = sortedData.map((user, index) => ({
      ...user,
      rank: index + 1,
    }))

    setLeaderboard(rankedData)
  }, [timeframe, filter])

  const getTopThree = () => {
    return leaderboard.slice(0, 3)
  }

  const getRestOfLeaderboard = () => {
    return leaderboard.slice(3)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-slate-600 dark:text-slate-300">See how you rank against other language learners</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Tabs
              defaultValue="weekly"
              onValueChange={(value) => setTimeframe(value as any)}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Top 3 Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {getTopThree().map((user, index) => (
            <Card
              key={user.id}
              className={`p-6 text-center ${
                index === 0
                  ? "border-yellow-400 dark:border-yellow-600 ring-2 ring-yellow-200 dark:ring-yellow-900"
                  : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  {index === 0 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Medal className="h-7 w-7 text-slate-400" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Medal className="h-7 w-7 text-amber-700" />
                    </div>
                  )}
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Learning {user.language}</p>
                <div className="flex items-center justify-center space-x-1 text-[var(--color-primary)]">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">{user.xp.toLocaleString()} XP</span>
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.streak} day streak</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>All Users</span>
          </Button>
          <Button
            variant={filter === "friends" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("friends")}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Friends</span>
          </Button>
        </div>

        {/* Rest of Leaderboard */}
        <Card className="overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 grid grid-cols-12 text-sm font-medium">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-2 text-center">XP</div>
            <div className="col-span-2 text-center">Streak</div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {getRestOfLeaderboard().map((user) => (
              <div
                key={user.id}
                className="p-4 grid grid-cols-12 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="col-span-1 text-center font-semibold">{user.rank}</div>
                <div className="col-span-7 flex items-center space-x-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.language}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center font-semibold">{user.xp.toLocaleString()}</div>
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    <span>{user.streak}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Current User */}
            <div className="p-4 grid grid-cols-12 items-center bg-[var(--color-primary)]/5 border-l-4 border-[var(--color-primary)]">
              <div className="col-span-1 text-center font-semibold">{currentUser.rank}</div>
              <div className="col-span-7 flex items-center space-x-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser.language}</p>
                </div>
              </div>
              <div className="col-span-2 text-center font-semibold">{currentUser.xp.toLocaleString()}</div>
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar className="h-4 w-4 text-amber-500" />
                  <span>{currentUser.streak}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
