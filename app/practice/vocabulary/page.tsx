"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  VolumeIcon as VolumeUp,
  Check,
  X,
  Mic,
  MicOff,
  Star,
  RefreshCw,
  Save,
  Trophy,
  MessageSquare,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// New type definitions for our enhanced vocabulary system
type VocabItem = {
  id: string; // Changed from number to string
  word: string;
  translation: string;
  example: string;
  pronunciation: string;
  audioUrl?: string;
  imageUrl?: string;
};

// Add type definitions for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type VocabularyProgress = {
  wordsLearned: number;
  totalWords: number;
  currentStreak: number;
  xpEarned: number;
  lastSessionDate?: string;
};

// Types for offline sync
type OfflineAction = {
  type: "learn" | "review" | "reset";
  wordId: string;
  timestamp: number;
  completed: boolean;
};

// Update mock data to use string IDs
const vocabularyData: Record<string, VocabItem[]> = {
  spanish: [
    {
      id: "1",
      word: "Hola",
      translation: "Hello",
      example: "¡Hola! ¿Cómo estás?",
      pronunciation: "OH-lah",
    },
    {
      id: "2",
      word: "Gracias",
      translation: "Thank you",
      example: "Muchas gracias por tu ayuda.",
      pronunciation: "GRAH-see-ahs",
    },
    {
      id: "3",
      word: "Por favor",
      translation: "Please",
      example: "Por favor, pásame el agua.",
      pronunciation: "pohr fah-VOHR",
    },
    {
      id: "4",
      word: "Amigo",
      translation: "Friend",
      example: "Él es mi mejor amigo.",
      pronunciation: "ah-MEE-goh",
    },
    {
      id: "5",
      word: "Comida",
      translation: "Food",
      example: "La comida está deliciosa.",
      pronunciation: "koh-MEE-dah",
    },
  ],
  french: [
    {
      id: "1",
      word: "Bonjour",
      translation: "Hello",
      example: "Bonjour, comment allez-vous?",
      pronunciation: "bohn-ZHOOR",
    },
    {
      id: "2",
      word: "Merci",
      translation: "Thank you",
      example: "Merci beaucoup pour votre aide.",
      pronunciation: "mehr-SEE",
    },
  ],
};

// Declare languageNames
const languageNames: Record<string, string> = {
  spanish: "Spanish",
  french: "French",
  german: "German",
  japanese: "Japanese",
  mandarin: "Mandarin Chinese",
  italian: "Italian",
};

// Function to save data to localStorage
const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Function to load data from localStorage
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }
  return defaultValue;
};

// Server action for updating user progress (will be called when online)
async function updateUserProgress(
  userId: string,
  language: string,
  xpGained: number,
  wordsLearned: string[]
) {
  "use server";

  // This would normally make a database call
  console.log(
    `Updating progress for user ${userId}: +${xpGained} XP, learned ${wordsLearned.length} words`
  );

  // Return dummy response for now
  return { success: true };
}

export default function VocabularyPracticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // References for audio/recording elements
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Basic state
  const [language, setLanguage] = useState<string>("spanish");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<"learn" | "quiz" | "speaking" | "writing">(
    "learn"
  );
  const [quizAnswer, setQuizAnswer] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [offlineMode, setOfflineMode] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [xpReward, setXpReward] = useState(0);
  const [pendingOfflineActions, setPendingOfflineActions] = useState<
    OfflineAction[]
  >([]);

  // Progress tracking
  const [vocabularyProgress, setVocabularyProgress] =
    useState<VocabularyProgress>({
      wordsLearned: 0,
      totalWords: 0,
      currentStreak: 0,
      xpEarned: 0,
    });

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    correctAnswers: 0,
    totalAttempts: 0,
    xpEarned: 0,
    startTime: Date.now(),
  });
  // User vocabulary list state
  const [vocabulary, setVocabulary] = useState<VocabItem[]>([]);
  const [activeList, setActiveList] = useState<string | null>(null);
  const [userVocabularyLists, setUserVocabularyLists] = useState<
    { id: string; name: string }[]
  >([]);

  // Initialize and load data
  useEffect(() => {
    const langParam = searchParams.get("lang");
    const listParam = searchParams.get("list");

    if (langParam && vocabularyData[langParam]) {
      setLanguage(langParam);
    }

    if (listParam) {
      setActiveList(listParam);
    }

    // Load progress from localStorage (offline support)
    const savedProgress = loadFromLocalStorage(
      `vocab-progress-${langParam || "spanish"}`,
      {
        wordsLearned: 0,
        totalWords: 0,
        currentStreak: 0,
        xpEarned: 0,
      }
    );

    setVocabularyProgress(savedProgress);

    // Load pending offline actions
    const pendingActions = loadFromLocalStorage("vocab-offline-actions", []);
    setPendingOfflineActions(pendingActions);

    // Check network connectivity
    const isOffline = !navigator.onLine;
    setOfflineMode(isOffline);

    const loadData = async () => {
      try {
        // In a real app, we would fetch from API here
        // For now, use the mock data
        const vocabData =
          vocabularyData[langParam || "spanish"] || vocabularyData.spanish;

        // Convert the mock data to our enhanced format
        const enhancedVocabData = vocabData.map((item) => ({
          ...item,
          id: item.id.toString(),
          timesReviewed: 0,
          lastPracticed: null,
          learned: false,
          difficulty: "medium" as "easy" | "medium" | "hard",
        }));

        setVocabulary(enhancedVocabData);

        // Mock vocabulary lists
        setUserVocabularyLists([
          { id: "everyday", name: "Everyday Phrases" },
          { id: "travel", name: "Travel Vocabulary" },
          { id: "food", name: "Food & Dining" },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading vocabulary data:", error);
        // Fall back to offline data if available
        const offlineVocab = loadFromLocalStorage(
          `vocab-data-${langParam || "spanish"}`,
          []
        );
        if (offlineVocab.length > 0) {
          setVocabulary(offlineVocab);
          toast({
            title: "Using offline data",
            description:
              "You're currently using saved vocabulary data from your last session.",
          });
        }
        setIsLoading(false);
      }
    };

    loadData();

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [searchParams, toast]);

  // Current word and progress calculation
  const currentWord = vocabulary[currentIndex] || {
    id: "0",
    word: "Loading...",
    translation: "Loading...",
    example: "Loading...",
    pronunciation: "",
  };

  useEffect(() => {
    if (vocabulary.length > 0) {
      setProgress(((currentIndex + 1) / vocabulary.length) * 100);
    }
  }, [currentIndex, vocabulary.length]);

  // Handle online/offline status changes
  const handleOnlineStatusChange = () => {
    const isOffline = !navigator.onLine;
    setOfflineMode(isOffline);

    if (!isOffline && pendingOfflineActions.length > 0) {
      // We're back online - sync pending actions
      syncOfflineActions();
    }

    toast({
      title: isOffline ? "You're offline" : "You're back online",
      description: isOffline
        ? "Your progress will be saved locally and synced when you reconnect."
        : "Your progress will now be saved to your account.",
    });
  };

  // Sync offline actions when we're back online
  const syncOfflineActions = async () => {
    try {
      // Group actions by type for efficiency
      const learnedWordIds = pendingOfflineActions
        .filter((action) => action.type === "learn" && !action.completed)
        .map((action) => action.wordId);

      if (learnedWordIds.length > 0) {
        // Calculate total XP from pending actions
        const totalXp = learnedWordIds.length * 10;

        // Update progress on server
        // In a real app, this would use a fetch call to an API
        // await updateUserProgress('current-user-id', language, totalXp, learnedWordIds);

        // Mark all synced actions as completed
        const updatedActions = pendingOfflineActions.map((action) =>
          learnedWordIds.includes(action.wordId)
            ? { ...action, completed: true }
            : action
        );

        setPendingOfflineActions(updatedActions);
        saveToLocalStorage("vocab-offline-actions", updatedActions);

        toast({
          title: "Progress synced",
          description: `Synced ${learnedWordIds.length} words and earned ${totalXp} XP!`,
        });
      }
    } catch (error) {
      console.error("Error syncing offline actions:", error);
      toast({
        title: "Sync failed",
        description: "We couldn't sync your progress. We'll try again later.",
        variant: "destructive",
      });
    }
  };
  // Navigation functions
  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
      setQuizAnswer(null);
    } else {
      // End of practice
      alert("You've completed the practice!");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowTranslation(false);
      setQuizAnswer(null);
    }
  };

  const playPronunciation = () => {
    try {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = language === "spanish" ? "es-ES" : "fr-FR";
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error playing pronunciation:", error);
      alert("Unable to play pronunciation. Please try again.");
    }
  };

  const saveProgressOffline = () => {
    const progressData = {
      language,
      currentIndex,
      mode,
    };
    localStorage.setItem("vocabularyProgress", JSON.stringify(progressData));
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem("vocabularyProgress");
    if (savedProgress) {
      const {
        language: savedLanguage,
        currentIndex: savedIndex,
        mode: savedMode,
      } = JSON.parse(savedProgress);
      setLanguage(savedLanguage);
      setCurrentIndex(savedIndex);
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    saveProgressOffline();
  }, [language, currentIndex, mode]);

  const handleQuizAnswer = (isCorrect: boolean) => {
    // Implementation for handling quiz answers
  };

  const displayLanguage = languageNames[language] || "Spanish";

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = language === "spanish" ? "es-ES" : "fr-FR";
    recognition.onresult = (event: any) => {
      const spokenWord = event.results[0][0].transcript;
      if (spokenWord.toLowerCase() === currentWord.word.toLowerCase()) {
        alert("Correct pronunciation!");
      } else {
        alert(`Incorrect. You said: ${spokenWord}`);
      }
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event);
      alert("Error with voice input. Please try again.");
    };
    recognition.start();
  };

  const awardXP = () => {
    const xpGained = 10; // Example XP value
    alert(`You earned ${xpGained} XP!`);
    // Add animation or visual feedback here
  };

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
            <Button
              variant={mode === "learn" ? "default" : "outline"}
              onClick={() => setMode("learn")}
            >
              Learn
            </Button>
            <Button
              variant={mode === "quiz" ? "default" : "outline"}
              onClick={() => {
                setMode("quiz");
                setCurrentIndex(0);
                setQuizAnswer(null);
              }}
            >
              Quiz
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">
          {mode === "learn" ? "Vocabulary Practice" : "Vocabulary Quiz"}
        </h1>
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
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {currentWord.pronunciation}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={playPronunciation}
                className="text-[var(--color-primary)]"
              >
                <VolumeUp className="h-6 w-6" />
              </Button>
            </div>

            {showTranslation ? (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">
                    Translation
                  </h3>
                  <p className="text-xl">{currentWord.translation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-500 dark:text-slate-400">
                    Example
                  </h3>
                  <p className="text-lg">{currentWord.example}</p>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowTranslation(true)}
                className="mt-6 w-full"
              >
                Show Translation
              </Button>
            )}
          </Card>
        ) : (
          <Card className="p-8 mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">
                What does "{currentWord.word}" mean?
              </h2>

              {quizAnswer === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <Button
                    className="h-16 text-lg"
                    onClick={() => {
                      handleQuizAnswer(true);
                      awardXP();
                    }}
                  >
                    {currentWord.translation}
                  </Button>
                  <Button
                    className="h-16 text-lg"
                    variant="outline"
                    onClick={() => handleQuizAnswer(false)}
                  >
                    {
                      vocabulary[(currentIndex + 1) % vocabulary.length]
                        .translation
                    }
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
                    {quizAnswer === "correct" ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <X className="h-6 w-6" />
                    )}
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
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || quizAnswer !== null}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              currentIndex === vocabulary.length - 1 || quizAnswer !== null
            }
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8">
          <Button
            variant="default"
            className="w-full"
            onClick={handleVoiceInput}
          >
            Practice Pronunciation
          </Button>
        </div>
      </div>
    </div>
  );
}
