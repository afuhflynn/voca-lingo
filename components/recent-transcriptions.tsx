"use client"

import { Button } from "@/components/ui/button"
import { useRecordingStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"
import { Copy, Play, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface RecentTranscriptionsProps {
  limit?: number
}

export function RecentTranscriptions({ limit }: RecentTranscriptionsProps) {
  const { transcriptions, removeTranscription } = useRecordingStore()
  const { toast } = useToast()

  const displayTranscriptions = limit ? transcriptions.slice(0, limit) : transcriptions

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Transcription text has been copied to your clipboard",
    })
  }

  if (displayTranscriptions.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground mb-2">No transcriptions yet</p>
        <p className="text-sm text-muted-foreground">Record your first voice memo to see it here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayTranscriptions.map((item) => (
        <div
          key={item.id}
          className="group border rounded-lg p-4 transition-all duration-200 hover:border-primary/50 hover:bg-muted/50"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium truncate">
                <Link href={`/transcriptions/${item.id}`} className="hover:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.date), { addSuffix: true })} • {Math.floor(item.duration / 60)}:
                {(item.duration % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
                <span className="sr-only">Play</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(item.text)}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeTranscription(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground line-clamp-2">{item.text}</div>
        </div>
      ))}

      {limit && transcriptions.length > limit && (
        <div className="text-center">
          <Button variant="link" asChild>
            <Link href="/transcriptions">View all transcriptions</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

