"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Check, X } from "lucide-react"

export function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const friends = [
    {
      id: 1,
      name: "Sarah Kim",
      username: "@sarahkim",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Spanish", "Korean"],
      xp: 1250,
      online: true,
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      username: "@miguelr",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["English", "Portuguese"],
      xp: 1120,
      online: false,
    },
    {
      id: 3,
      name: "Aisha Tanaka",
      username: "@aishat",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Japanese", "French"],
      xp: 980,
      online: true,
    },
    {
      id: 4,
      name: "David Lee",
      username: "@davidl",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Mandarin", "German"],
      xp: 790,
      online: false,
    },
  ]

  const pendingRequests = [
    {
      id: 5,
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["French", "Italian"],
      xp: 850,
    },
    {
      id: 6,
      name: "Carlos Mendez",
      username: "@carlosm",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Spanish", "Portuguese"],
      xp: 720,
    },
  ]

  const suggestions = [
    {
      id: 7,
      name: "Priya Sharma",
      username: "@priyas",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Hindi", "English"],
      xp: 930,
      mutualFriends: 2,
    },
    {
      id: 8,
      name: "Liam Johnson",
      username: "@liamj",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["German", "Dutch"],
      xp: 680,
      mutualFriends: 1,
    },
    {
      id: 9,
      name: "Sophia Chen",
      username: "@sophiac",
      avatar: "/placeholder.svg?height=40&width=40",
      languages: ["Mandarin", "Japanese"],
      xp: 1050,
      mutualFriends: 3,
    },
  ]

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search friends..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="friends">
        <TabsList className="mb-4">
          <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={friend.avatar || "/placeholder.svg"}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {friend.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{friend.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{friend.username}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{friend.xp} XP</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{friend.languages.join(", ")}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No friends found matching "{searchQuery}"
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={request.avatar || "/placeholder.svg"}
                    alt={request.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{request.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{request.username}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="rounded-full w-8 h-8 p-0 gradient-bg">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={suggestion.avatar || "/placeholder.svg"}
                    alt={suggestion.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{suggestion.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {suggestion.mutualFriends} mutual friend{suggestion.mutualFriends !== 1 && "s"}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                Add Friend
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
