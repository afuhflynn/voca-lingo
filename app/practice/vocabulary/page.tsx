"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, VolumeIcon as VolumeUp, Check, X } from "lucide-react"
import Link from "next/link"

type VocabItem = {
  id: number
  word: string
  translation: string
  example: string
  pronunciation: string
}

// Mock vocabulary data for different languages
const vocabularyData: Record<string, VocabItem[]> = {
  spanish: [
    {
      id: 1,
      word: "Hola",
      translation: "Hello",
      example: "¡Hola! ¿Cómo estás?",
      pronunciation: "OH-lah",
    },
    {
      id: 2,
      word: "Gracias",
      translation: "Thank you",
      example: "Muchas gracias por tu ayuda.",
      pronunciation: "GRAH-see-ahs",
    },
    {
      id: 3,
      word: "Por favor",
      translation: "Please",
      example: "Por favor, pásame el agua.",
      pronunciation: "pohr fah-VOHR",
    },
    {
      id: 4,
      word: "Amigo",
      translation: "Friend",
      example: "Él es mi mejor amigo.",
      pronunciation: "ah-MEE-goh",
    },
    {
      id: 5,
      word: "Comida",
      translation: "Food",
      example: "La comida está deliciosa.",
      pronunciation: "koh-MEE-dah",
    },
  ],
  french: [
    {
      id: 1,
      word: "Bonjour",
      translation: "Hello",
      example: "Bonjour, comment allez-vous?",
      pronunciation: "bohn-ZHOOR",
    },
    {
      id: 2,
      word: "Merci",
      translation: "Thank you",
      example: "Merci beaucoup pour votre aide.",
      pronunciation: "mehr-SEE",
    },
  ],
  // Add more languages as needed
}

export default function VocabularyPracticePage() {
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<string>("spanish")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState<"learn" | "quiz">("learn")
  const [quizAnswer, setQuizAnswer] = useState<"correct" | "incorrect" | null>(null)

  useEffect(() => {
    const langParam = searchParams.get("lang")
    if (langParam && vocabularyData[langParam]) {
      setLanguage(langParam)
    }
  }, [searchParams])

  const vocabulary = vocabularyData[language] || vocabularyData.spanish
  const currentWord = vocabulary[currentIndex]

  useEffect(() => {
    setProgress(((currentIndex + 1) / vocabulary.length) * 100)
  }, [currentIndex, vocabulary.length])

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowTranslation(false)
      setQuizAnswer(null)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowTranslation(false)
      setQuizAnswer(null)
    }
  }

  const playPronunciation = () => {
    // In a real app, this would play an audio file
    // For now, we'll use the browser's speech synthesis
    const utterance = new SpeechSynthesisUtterance(currentWord.word)
    utterance.lang = language === "spanish" ? "es-ES" : "fr-FR"
    window.speechSynthesis.speak(utterance)
  }

  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizAnswer(isCorrect ? "correct" : "incorrect")
    setTimeout(() => {
      if (currentIndex < vocabulary.length - 1) {
        handleNext()
      } else {
        // End of quiz
        setMode("learn")
        setCurrentIndex(0)
      }
    }, 1500)
  }

  const languageNames: Record<string, string> = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    japanese: "Japanese",
    mandarin: "Mandarin Chinese",
    italian: "Italian",
  }

  const displayLanguage = languageNames[language] || "Spanish"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/dashboard?lang=${language}`}>
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button variant={mode === "learn" ? "default" : "outline"} onClick={() => setMode("learn")}>
              Learn
            </Button>
            <Button
              variant={mode === "quiz" ? "default" : "outline"}
              onClick={() => {
                setMode("quiz")
                setCurrentIndex(0)
                setQuizAnswer(null)
              }}
            >
              Quiz
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">{mode === "learn" ? "Vocabulary Practice" : "Vocabulary Quiz"}</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {mode === "learn"
            ? `Learn essential ${displayLanguage} vocabulary`
            : `Test your ${displayLanguage} vocabulary knowledge`}
        </p>

        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>
              Word {currentIndex + 1} of {vocabulary.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {mode === "learn" ? (
          <Card className="p-8 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentWord.word}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{currentWord.pronunciation}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={playPronunciation} className="text-[var(--color-primary)]">
                <VolumeUp className="h-6 w-6" />
              </Button>
            </div>

            {showTranslation ? (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">Translation</h3>
                  <p className="text-xl">{currentWord.translation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">Example</h3>
                  <p className="text-lg">{currentWord.example}</p>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowTranslation(true)} className="mt-6 w-full">
                Show Translation
              </Button>
            )}
          </Card>
        ) : (
          <Card className="p-8 mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">What does "{currentWord.word}" mean?</h2>

              {quizAnswer === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <Button className="h-16 text-lg" onClick={() => handleQuizAnswer(true)}>
                    {currentWord.translation}
                  </Button>
                  <Button className="h-16 text-lg" variant="outline" onClick={() => handleQuizAnswer(false)}>
                    {vocabulary[(currentIndex + 1) % vocabulary.length].translation}
                  </Button>
                </div>
              ) : (
                <div
                  className={`p-6 rounded-lg ${
                    quizAnswer === "correct"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    {quizAnswer === "correct" ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                    <span className="text-lg font-medium">
                      {quizAnswer === "correct"
                        ? "Correct!"
                        : `Incorrect. The correct answer is "${currentWord.translation}"`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0 || quizAnswer !== null}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentIndex === vocabulary.length - 1 || quizAnswer !== null}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
