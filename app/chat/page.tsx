"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Send, VolumeIcon as VolumeUp, ChevronLeft, Settings, MoreVertical, Zap } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! ¿Cómo estás hoy?",
      translation: "Hello! How are you today?",
    },
    {
      role: "user",
      content: "Estoy bien, gracias.",
      feedback: { correct: true, message: "Great pronunciation!" },
    },
    {
      role: "assistant",
      content: "¡Qué bueno! ¿Qué hiciste este fin de semana?",
      translation: "That's good! What did you do this weekend?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          role: "user",
          content: inputValue,
          feedback: { correct: true, message: "Good job!" },
        },
      ])
      setInputValue("")

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "¡Muy bien! Sigamos practicando.",
            translation: "Very good! Let's continue practicing.",
          },
        ])
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">ES</span>
              </div>
              <div>
                <h1 className="font-bold">Spanish Practice</h1>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col">
        <Card className="flex-1 overflow-hidden flex flex-col gradient-border">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-indigo-100 dark:bg-indigo-900/50 rounded-tr-sm"
                        : "bg-white dark:bg-gray-800 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {message.translation && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{message.translation}</p>
                    )}

                    {message.feedback && (
                      <div className="flex items-center gap-1 mt-1">
                        {message.feedback.correct ? (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-xs">{message.feedback.message}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs">{message.feedback.message}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {message.role === "assistant" && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full ml-auto block mt-1">
                        <VolumeUp className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in Spanish or tap the mic to speak..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 py-3 px-4 pr-24 bg-transparent resize-none"
                rows={2}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="icon"
                  className={`rounded-full ${isRecording ? "" : "gradient-bg"}`}
                  onClick={toggleRecording}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {isRecording && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="voice-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>Listening... Speak in Spanish</span>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
