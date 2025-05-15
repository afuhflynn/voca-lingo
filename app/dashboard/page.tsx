import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, FileText, MessageSquareText, Clock, BarChart } from "lucide-react"
import Link from "next/link"
import { RecentTranscriptions } from "@/components/recent-transcriptions"
import { StatsCards } from "@/components/stats-cards"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="relative overflow-hidden group">
            <Link href="/record">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Mic className="mr-2 h-4 w-4" />
              New Recording
            </Link>
          </Button>
        </div>
      </div>

      <StatsCards />

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/record">
                      <Mic className="mr-2 h-4 w-4 text-primary" />
                      Record
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/transcriptions">
                      <FileText className="mr-2 h-4 w-4 text-primary" />
                      Transcriptions
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/chat">
                      <MessageSquareText className="mr-2 h-4 w-4 text-primary" />
                      AI Coach
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/chat/history">
                      <Clock className="mr-2 h-4 w-4 text-primary" />
                      Chat History
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 relative overflow-hidden border-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>
              <CardHeader>
                <CardTitle>Recent Transcriptions</CardTitle>
                <CardDescription>Your most recent voice memos and transcriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTranscriptions limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>Your voice recording and transcription activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Detailed statistics will appear here as you use the app</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

