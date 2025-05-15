"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Language = {
  id: string
  name: string
  flag: string
  speakers: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

const languages: Language[] = [
  {
    id: "spanish",
    name: "Spanish",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "460 million",
    difficulty: "Beginner",
  },
  {
    id: "french",
    name: "French",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "280 million",
    difficulty: "Intermediate",
  },
  {
    id: "german",
    name: "German",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "100 million",
    difficulty: "Intermediate",
  },
  {
    id: "japanese",
    name: "Japanese",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "125 million",
    difficulty: "Advanced",
  },
  {
    id: "mandarin",
    name: "Mandarin Chinese",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "1.1 billion",
    difficulty: "Advanced",
  },
  {
    id: "italian",
    name: "Italian",
    flag: "/placeholder.svg?height=40&width=60",
    speakers: "85 million",
    difficulty: "Beginner",
  },
]

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleSelectLanguage = (id: string) => {
    setSelectedLanguage(id)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Choose Your Language</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Select a language to start your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <Card
              key={language.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedLanguage === language.id
                  ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
                  : ""
              }`}
              onClick={() => handleSelectLanguage(language.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded">
                    <Image
                      src={language.flag || "/placeholder.svg"}
                      alt={`${language.name} flag`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{language.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{language.speakers} speakers</p>
                  </div>
                </div>
                {selectedLanguage === language.id && (
                  <div className="h-6 w-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    language.difficulty === "Beginner"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : language.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {language.difficulty}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={selectedLanguage ? `/dashboard?lang=${selectedLanguage}` : "#"}>
            <Button className="btn-primary px-8" disabled={!selectedLanguage}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
