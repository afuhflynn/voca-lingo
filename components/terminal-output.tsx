"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TerminalOutputProps {
  messages: string[]
  className?: string
}

export function TerminalOutput({ messages, className }: TerminalOutputProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={terminalRef}
      className={cn(
        "font-mono text-xs bg-black/90 dark:bg-black/70 text-green-500 p-3 rounded-md h-32 overflow-y-auto",
        className,
      )}
    >
      <div className="flex items-center gap-1 mb-2 text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs">vox-terminal</span>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground">$ Ready for voice commands...</p>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="leading-relaxed">
            <span className="text-blue-400">{message.startsWith(">") ? "$" : ""}</span> {message}
            {index === messages.length - 1 && (
              <span className="inline-block w-2 h-4 ml-1 bg-green-500 animate-blink"></span>
            )}
          </div>
        ))
      )}
    </div>
  )
}

