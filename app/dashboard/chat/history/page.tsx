import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquareText, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ChatHistoryPage() {
  // Mock chat history data
  const chatHistory = [
    {
      id: "1",
      title: "Productivity Tips",
      preview: "How can I improve my productivity?",
      date: "2023-04-15T10:30:00",
      messageCount: 8,
    },
    {
      id: "2",
      title: "Time Management",
      preview: "What are some effective time management techniques?",
      date: "2023-04-14T15:20:00",
      messageCount: 12,
    },
    {
      id: "3",
      title: "Work-Life Balance",
      preview: "How do I maintain a healthy work-life balance?",
      date: "2023-04-13T09:15:00",
      messageCount: 6,
    },
  ]

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat History</h1>
        <p className="text-muted-foreground">Browse your previous conversations with the AI coach</p>
      </div>

      <div className="flex items-center">
        <Input placeholder="Search chat history..." className="max-w-sm" />
      </div>

      <Card className="relative overflow-hidden border-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10"></div>

        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>Your chat history with the AI productivity coach</CardDescription>
        </CardHeader>

        <CardContent>
          {chatHistory.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-2">No chat history yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start a conversation with the AI coach to see it here
              </p>
              <Button asChild>
                <Link href="/chat">
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Start Chatting
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="group border rounded-lg p-4 transition-all duration-200 hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        <Link href={`/chat?id=${chat.id}`} className="hover:underline">
                          {chat.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(chat.date)} • {chat.messageCount} messages
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground line-clamp-2">{chat.preview}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

