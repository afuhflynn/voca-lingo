"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Square, Loader2, AudioWaveformIcon as Waveform } from "lucide-react"
import { useRecordingStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { TerminalOutput } from "@/components/terminal-output"

export function RecordingPanel() {
  const { isRecording, startRecording, stopRecording, transcribeAudio, isTranscribing } = useRecordingStore()
  const [recordingTime, setRecordingTime] = useState(0)
  const [terminalMessages, setTerminalMessages] = useState<string[]>([])

  // This would be connected to the actual recording logic in a real implementation
  const handleStartRecording = () => {
    startRecording()
    setTerminalMessages([...terminalMessages, "> Recording started..."])
    // Start timer
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Store interval ID to clear it later
    window.recordingInterval = interval
  }

  const handleStopRecording = () => {
    stopRecording()
    setTerminalMessages([...terminalMessages, "> Recording stopped."])
    // Clear timer
    if (window.recordingInterval) {
      clearInterval(window.recordingInterval)
      window.recordingInterval = null
    }

    // Simulate transcription process
    setTerminalMessages((prev) => [...prev, "> Processing audio..."])
    transcribeAudio()
    setTimeout(() => {
      setTerminalMessages((prev) => [...prev, "> Transcription complete!"])
      setRecordingTime(0)
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="relative overflow-hidden border-2 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div
            className={cn("w-3 h-3 rounded-full", isRecording ? "bg-red-500 animate-pulse" : "bg-muted-foreground")}
          />
          Voice Recorder
        </CardTitle>
        <CardDescription>Record your voice memo and get an instant transcription</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="flex justify-center items-center h-32 bg-muted/50 rounded-lg relative overflow-hidden">
          {isRecording ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-sound-wave"
                    style={{
                      height: `${20 + Math.random() * 40}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
                <div className="mx-2 text-xl font-mono">{formatTime(recordingTime)}</div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i + 5}
                    className="w-1 bg-primary rounded-full animate-sound-wave"
                    style={{
                      height: `${20 + Math.random() * 40}px`,
                      animationDelay: `${(i + 5) * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-red-500 animate-pulse">Recording...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Waveform className="h-12 w-12 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ready to record</span>
            </div>
          )}
        </div>

        <TerminalOutput messages={terminalMessages} />
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isRecording ? (
          <Button
            onClick={handleStartRecording}
            className="w-full relative overflow-hidden group"
            disabled={isTranscribing}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        ) : (
          <Button onClick={handleStopRecording} variant="destructive" className="w-full">
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}
      </CardFooter>

      {isTranscribing && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Transcribing your audio...</p>
          </div>
        </div>
      )}
    </Card>
  )
}

