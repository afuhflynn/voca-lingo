"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRecordingStore } from "@/lib/store"
import { ArrowLeft, Copy, Download, Play, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function TranscriptionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { transcriptions, removeTranscription } = useRecordingStore()
  const { toast } = useToast()

  const transcription = transcriptions.find((t) => t.id === params.id)

  if (!transcription) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Transcription not found</h1>
        <p className="text-muted-foreground mb-6">
          The transcription you're looking for doesn't exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/transcriptions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transcriptions
          </Link>
        </Button>
      </div>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription.text)
    toast({
      title: "Copied to clipboard",
      description: "Transcription text has been copied to your clipboard",
    })
  }

  const handleDelete = () => {
    removeTranscription(transcription.id)
    router.push("/transcriptions")
    toast({
      title: "Transcription deleted",
      description: "Your transcription has been permanently deleted",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/transcriptions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{transcription.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="relative overflow-hidden border-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

          <CardHeader>
            <CardTitle>Transcription</CardTitle>
            <CardDescription>Full text of your voice memo</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap">{transcription.text}</div>
          </CardContent>

          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden border-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

          <CardHeader>
            <CardTitle>Audio</CardTitle>
            <CardDescription>Original voice recording</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center gap-4 py-4">
              <Button size="lg" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Play Recording
              </Button>

              <div className="w-full bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Created:</span>
                  <span className="text-muted-foreground">{formatDate(transcription.date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Duration:</span>
                  <span className="text-muted-foreground">
                    {Math.floor(transcription.duration / 60)}:
                    {(transcription.duration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button variant="destructive" className="w-full" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Transcription
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

