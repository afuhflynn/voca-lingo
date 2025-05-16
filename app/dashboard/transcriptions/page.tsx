import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TranscriptionsList } from "@/components/transcriptions-list"

export default function TranscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transcriptions</h1>
        <p className="text-muted-foreground">Browse and manage your voice memo transcriptions</p>
      </div>

      <div className="flex items-center">
        <Input placeholder="Search transcriptions..." className="max-w-sm" />
      </div>

      <Card className="relative overflow-hidden border-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10"></div>

        <CardHeader>
          <CardTitle>All Transcriptions</CardTitle>
          <CardDescription>Your voice memos and their transcriptions</CardDescription>
        </CardHeader>

        <CardContent>
          <TranscriptionsList />
        </CardContent>
      </Card>
    </div>
  )
}

