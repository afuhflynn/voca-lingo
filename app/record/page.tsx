import { RecordingPanel } from "@/components/recording-panel"

export default function RecordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voice Recorder</h1>
        <p className="text-muted-foreground">Record your voice memo and get an instant transcription</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <RecordingPanel />
      </div>
    </div>
  )
}

