"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  VolumeIcon as VolumeUp, 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Star,
  InfoIcon,
  Download,
  Save,
  Trophy,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vapi } from "@/lib/vapi"
import { Skeleton } from "@/components/ui/skeleton"

// Types for the pronunciation practice system
type PronunciationItem = {
  id: string;
  phrase: string;
  translation: string;
  audioUrl: string; // URL to an audio file
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  notes?: string;
  phonetics?: string;
}

type PronunciationProgress = {
  practiceCount: number;
  correctCount: number;
  totalScore: number;
  averageScore: number;
  xpEarned: number;
  lastPracticeDate?: string;
  streak: number;
}

type FeedbackDetail = {
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  timeStamp?: number;
}

// Function to save data to localStorage for offline support
const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// Function to load data from localStorage
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved data:', e);
      }
    }
  }
  return defaultValue;
};

// Waveform visualization component
const WaveformVisualizer = ({ audioBlob, isRecording }: { audioBlob?: Blob, isRecording: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  useEffect(() => {
    if (isRecording && canvasRef.current) {
      const drawWaveform = () => {
        if (!canvasRef.current || !analyzerRef.current || !dataArrayRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = canvas.width;
        const height = canvas.height;
        
        analyzerRef.current.getByteTimeDomainData(dataArrayRef.current);
        
        ctx.fillStyle = 'rgb(30, 30, 30)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(130, 30, 255)';
        ctx.beginPath();
        
        const sliceWidth = width / dataArrayRef.current.length;
        let x = 0;
        
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const v = dataArrayRef.current[i] / 128.0;
          const y = v * height / 2;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          x += sliceWidth;
        }
        
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        
        animationRef.current = requestAnimationFrame(drawWaveform);
      };
      
      // Setup analyzer for real-time visualization
      const setupAnalyzer = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyzer = audioContext.createAnalyser();
          analyzer.fftSize = 2048;
          
          source.connect(analyzer);
          analyzerRef.current = analyzer;
          
          const bufferLength = analyzer.frequencyBinCount;
          dataArrayRef.current = new Uint8Array(bufferLength);
          
          animationRef.current = requestAnimationFrame(drawWaveform);
        } catch (error) {
          console.error('Error setting up audio analyzer:', error);
        }
      };
      
      setupAnalyzer();
      
      return () => {
        cancelAnimationFrame(animationRef.current);
        // Clean up analyzer when unmounting
        if (analyzerRef.current) {
          // Disconnect analyzer
        }
      };
    }
  }, [isRecording]);
  
  // If we have a blob but not recording, just draw a static waveform
  useEffect(() => {
    if (audioBlob && !isRecording && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.fillStyle = 'rgb(30, 30, 30)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(130, 30, 255)';
      ctx.beginPath();
      
      // Draw a dummy waveform for completed recording
      ctx.moveTo(0, height / 2);
      
      // Create a more dynamic representation
      for (let i = 0; i < width; i += 5) {
        const normalizedValue = Math.random() * 0.5 + 0.25; // Between 0.25 and 0.75
        const y = normalizedValue * height;
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }
  }, [audioBlob, isRecording]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={100} 
      className="w-full h-24 rounded-lg border border-gray-200 dark:border-gray-700"
    />
  );
};

// Mock pronunciation data for different languages
const pronunciationData: Record<string, PronunciationItem[]> = {
  spanish: [
    {
      id: "1",
      phrase: "Buenos días",
      translation: "Good morning",
      audioUrl: "/audio/spanish/buenos-dias.mp3",
      difficulty: "easy",
      phonetics: "bweh-nohs dee-ahs",
      category: "greetings"
    },
    {
      id: 2,
      phrase: "¿Cómo estás?",
      translation: "How are you?",
      audioUrl: "/audio/como-estas.mp3",
    },
    {
      id: 3,
      phrase: "Me llamo...",
      translation: "My name is...",
      audioUrl: "/audio/me-llamo.mp3",
    },
    {
      id: 4,
      phrase: "Mucho gusto",
      translation: "Nice to meet you",
      audioUrl: "/audio/mucho-gusto.mp3",
    },
    {
      id: 5,
      phrase: "¿Dónde está el baño?",
      translation: "Where is the bathroom?",
      audioUrl: "/audio/donde-esta-el-bano.mp3",
    },
  ],
  french: [
    {
      id: 1,
      phrase: "Bonjour",
      translation: "Hello",
      audioUrl: "/audio/bonjour.mp3",
    },
    {
      id: 2,
      phrase: "Comment allez-vous?",
      translation: "How are you?",
      audioUrl: "/audio/comment-allez-vous.mp3",
    },
  ],
  // Add more languages as needed
}

export default function PronunciationPracticePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [language, setLanguage] = useState<string>("spanish");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetail[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [xpReward, setXpReward] = useState(0);
  const [mode, setMode] = useState<"learn" | "practice" | "challenge">("learn");
  
  // Progress tracking
  const [pronunciationProgress, setPronunciationProgress] = useState<PronunciationProgress>({
    practiceCount: 0,
    correctCount: 0,
    totalScore: 0,
    averageScore: 0,
    xpEarned: 0,
    streak: 0
  });
  
  // Session stats
  const [sessionStats, setSessionStats] = useState({
    attemptsCount: 0,
    successCount: 0,
    totalScore: 0,
    xpEarned: 0,
    startTime: Date.now(),
  });
  
  // Refs for audio handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Vapi assistant reference
  const vapiAssistantRef = useRef<any>(null);

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam && pronunciationData[langParam]) {
      setLanguage(langParam);
    }
    
    // Load progress from localStorage (offline support)
    const savedProgress = loadFromLocalStorage(`pronunciation-progress-${langParam || 'spanish'}`, {
      practiceCount: 0,
      correctCount: 0,
      totalScore: 0,
      averageScore: 0,
      xpEarned: 0,
      streak: 0
    });
    
    setPronunciationProgress(savedProgress);
    
    // Check network connectivity
    const isOffline = !navigator.onLine;
    setOfflineMode(isOffline);
    
    // Add event listeners for online/offline status
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
      
      // Cleanup audio resources when unmounting
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [searchParams]);
  
  // Handle online/offline status changes
  const handleOnlineStatusChange = () => {
    const isOffline = !navigator.onLine;
    setOfflineMode(isOffline);
    
    toast({
      title: isOffline ?

  const handleNext = () => {
    if (currentIndex < pronunciationItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setRecordedAudio(null)
      setFeedback(null)
      setScore(null)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setRecordedAudio(null)
      setFeedback(null)
      setScore(null)
    }
  }

  const playOriginalAudio = () => {
    // In a real app, this would play an audio file from the server
    // For now, we'll use the browser's speech synthesis
    const utterance = new SpeechSynthesisUtterance(currentItem.phrase)
    utterance.lang = language === "spanish" ? "es-ES" : "fr-FR"
    window.speechSynthesis.speak(utterance)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)

        // In a real app, you would send the audio to a server for analysis
        // For now, we'll simulate feedback
        simulateFeedback()
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      setFeedback("Error accessing microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio)
      audio.play()
    }
  }

  const resetRecording = () => {
    setRecordedAudio(null)
    setFeedback(null)
    setScore(null)
  }

  const simulateFeedback = () => {
    // In a real app, this would be based on actual pronunciation analysis
    const randomScore = Math.floor(Math.random() * 41) + 60 // Random score between 60-100
    setScore(randomScore)

    if (randomScore >= 90) {
      setFeedback("Excellent pronunciation! You sound like a native speaker.")
    } else if (randomScore >= 80) {
      setFeedback("Very good! Your pronunciation is clear and understandable.")
    } else if (randomScore >= 70) {
      setFeedback("Good effort! Try to focus on the accent and intonation.")
    } else {
      setFeedback("Keep practicing! Pay attention to the stress patterns.")
    }
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
        </div>

        <h1 className="text-3xl font-bold mb-2">Pronunciation Practice</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Practice your {displayLanguage} pronunciation with these common phrases
        </p>

        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-slate-500">
            <span>
              Phrase {currentIndex + 1} of {pronunciationItems.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card className="p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{currentItem.phrase}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4">{currentItem.translation}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={playOriginalAudio} className="text-[var(--color-primary)]">
              <VolumeUp className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center">
              <p className="text-center mb-4">Listen to the phrase, then record yourself saying it</p>
              <div className="flex space-x-4">
                {!isRecording && !recordedAudio && (
                  <Button
                    onClick={startRecording}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                  >
                    <Mic className="mr-2 h-5 w-5" /> Start Recording
                  </Button>
                )}
                {isRecording && (
                  <Button onClick={stopRecording} variant="destructive">
                    <MicOff className="mr-2 h-5 w-5" /> Stop Recording
                  </Button>
                )}
                {recordedAudio && (
                  <>
                    <Button onClick={playRecordedAudio} variant="outline">
                      <Play className="mr-2 h-5 w-5" /> Play Recording
                    </Button>
                    <Button onClick={resetRecording} variant="outline">
                      <RotateCcw className="mr-2 h-5 w-5" /> Record Again
                    </Button>
                  </>
                )}
              </div>
            </div>

            {score !== null && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Pronunciation Score</span>
                  <span className="font-bold">{score}/100</span>
                </div>
                <Progress
                  value={score}
                  className="h-3"
                  indicatorClassName={`${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                />
              </div>
            )}

            {feedback && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p>{feedback}</p>
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentIndex === pronunciationItems.length - 1}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
