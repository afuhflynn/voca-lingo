"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Copy, Play, Trash2 } from "lucide-react"
import { useRecordingStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function TranscriptionsList() {
  const { transcriptions, removeTranscription } = useRecordingStore()
  const { toast } = useToast()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Transcription text has been copied to your clipboard",
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  return (
    <Card className="relative overflow-hidden border-2 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10"></div>

      <CardHeader>
        <CardTitle>Recent Transcriptions</CardTitle>
        <CardDescription>Your voice memos and their transcriptions</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {transcriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground mb-2">No transcriptions yet</p>
              <p className="text-sm text-muted-foreground">Record your first voice memo to see it here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transcriptions.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "group border rounded-lg p-4 transition-all duration-200",
                    "hover:border-primary/50 hover:bg-muted/50",
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
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

                  <div className={cn("text-sm text-muted-foreground", expandedId === item.id ? "" : "line-clamp-2")}>
                    {item.text}
                  </div>

                  {item.text.length > 120 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-1"
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    >
                      {expandedId === item.id ? "Show less" : "Show more"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

