"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  VolumeIcon as VolumeUp,
  RefreshCw,
  Star,
  Info,
  CheckCircle2,
  XCircle,
  Award,
  Trophy,
  Sparkles,
  MessageSquare,
  Clock,
  BookOpen,
  Download,
  LucideWifi,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { vapi } from "@/lib/vapi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Types for the conversation system
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  audioUrl?: string;
  corrections?: Correction[];
  translatedContent?: string;
};

type Correction = {
  original: string;
  corrected: string;
  explanation: string;
  type: "grammar" | "vocabulary" | "pronunciation";
};

type ConversationTopic = {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  prompts: string[];
  vocabularyFocus: string[];
  grammarFocus?: string;
  offlineSupport: boolean;
  imageUrl?: string;
};

type ConversationProgress = {
  messagesExchanged: number;
  topicsCompleted: string[];
  correctionsReceived: number;
  xpEarned: number;
  streak: number;
  lastSessionDate?: string;
  fluencyScore?: number;
};

// Local storage helper functions
const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

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

// Enhanced topics with more metadata and structure
const topics: ConversationTopic[] = [
  {
    id: "greetings",
    title: "Greetings & Introductions",
    description: "Practice introducing yourself and basic greetings",
    level: "beginner",
    category: "everyday",
    prompts: [
      "Introduce yourself and tell me your name",
      "Ask me how I'm doing today",
      "Tell me about where you're from",
    ],
    vocabularyFocus: [
      "hola",
      "buenos días",
      "¿cómo estás?",
      "me llamo",
      "mucho gusto",
      "hasta luego",
    ],
    grammarFocus: "Present tense verbs and basic sentence structure",
    offlineSupport: true,
    imageUrl: "/images/topics/greetings.png",
  },
  {
    id: "restaurant",
    title: "At the Restaurant",
    description: "Learn how to order food and have conversations while dining",
    level: "beginner",
    category: "food",
    prompts: [
      "Ask for a table at a restaurant",
      "Order your favorite meal",
      "Ask for the check",
    ],
    vocabularyFocus: [
      "mesa",
      "menú",
      "plato",
      "bebida",
      "la cuenta",
      "camarero/a",
      "reserva",
    ],
    grammarFocus: "Polite requests using conditional forms",
    offlineSupport: true,
    imageUrl: "/images/topics/restaurant.png",
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Practice vocabulary for shopping and asking about products",
    level: "intermediate",
    category: "everyday",
    prompts: [
      "Ask about the price of an item",
      "Negotiate a better price",
      "Describe what you're looking for",
    ],
    vocabularyFocus: [
      "precio",
      "descuento",
      "talla",
      "color",
      "pagar",
      "llevar",
      "devolver",
    ],
    grammarFocus: "Comparative forms and question structures",
    offlineSupport: true,
    imageUrl: "/images/topics/shopping.png",
  },
  {
    id: "travel",
    title: "Travel & Directions",
    description: "Learn how to ask for directions and talk about travel plans",
    level: "intermediate",
    category: "travel",
    prompts: [
      "Ask for directions to a famous landmark",
      "Discuss your travel plans",
      "Book a hotel room",
    ],
    vocabularyFocus: [
      "izquierda",
      "derecha",
      "cerca",
      "lejos",
      "hotel",
      "aeropuerto",
      "billete",
    ],
    grammarFocus: "Future tense and prepositions of place",
    offlineSupport: true,
    imageUrl: "/images/topics/travel.png",
  },
  {
    id: "work",
    title: "Work & Professional Life",
    description:
      "Practice conversations about jobs, interviews, and office life",
    level: "intermediate",
    category: "professional",
    prompts: [
      "Describe your job or dream career",
      "Practice a job interview",
      "Schedule a business meeting",
    ],
    vocabularyFocus: [
      "trabajo",
      "empleo",
      "entrevista",
      "oficina",
      "reunión",
      "proyecto",
      "currículum",
    ],
    grammarFocus: "Professional vocabulary and formal speech",
    offlineSupport: true,
    imageUrl: "/images/topics/work.png",
  },
  {
    id: "healthcare",
    title: "Health & Medical Situations",
    description:
      "Learn to describe symptoms and navigate healthcare situations",
    level: "advanced",
    category: "healthcare",
    prompts: [
      "Describe symptoms to a doctor",
      "Schedule a medical appointment",
      "Discuss health insurance",
    ],
    vocabularyFocus: [
      "dolor",
      "médico",
      "farmacia",
      "receta",
      "enfermedad",
      "seguro",
      "cita",
    ],
    grammarFocus: "Describing conditions and giving detailed explanations",
    offlineSupport: true,
    imageUrl: "/images/topics/healthcare.png",
  },
  {
    id: "debate",
    title: "Opinions & Debates",
    description: "Practice expressing opinions and discussing current topics",
    level: "advanced",
    category: "discussion",
    prompts: [
      "Share your opinion on a current event",
      "Debate the pros and cons of social media",
      "Discuss environmental issues",
    ],
    vocabularyFocus: [
      "opinar",
      "estar de acuerdo",
      "en contra",
      "debatir",
      "argumento",
      "punto de vista",
    ],
    grammarFocus: "Complex sentence structures and subjunctive mood",
    offlineSupport: false,
    imageUrl: "/images/topics/debate.png",
  },
];

// Waveform visualization component for audio feedback
const WaveformVisualizer = ({ isRecording }: { isRecording: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (isRecording && canvasRef.current) {
      const drawWaveform = () => {
        if (!canvasRef.current || !analyzerRef.current || !dataArrayRef.current)
          return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        analyzerRef.current.getByteTimeDomainData(dataArrayRef.current);

        ctx.fillStyle = "rgb(15, 15, 15)";
        ctx.fillRect(0, 0, width, height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(130, 30, 255)";
        ctx.beginPath();

        const sliceWidth = width / dataArrayRef.current.length;
        let x = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const v = dataArrayRef.current[i] / 128.0;
          const y = (v * height) / 2;

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

      const setupAnalyzer = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
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
          console.error("Error setting up audio analyzer:", error);
        }
      };

      setupAnalyzer();

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [isRecording]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={50}
      className="w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700"
    />
  );
};

export default function ConversationPracticePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Basic state
  const [language, setLanguage] = useState<string>("spanish");
  const [userLevel, setUserLevel] = useState<string>("beginner");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam) {
      setLanguage(langParam);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startConversation = async (topicId: string) => {
    setSelectedTopic(topicId);
    setMessages([]);
    setIsLoading(true);

    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return;

    try {
      // In a real app, this would use the AI SDK to generate a response
      // For demonstration, we'll simulate an AI response
      const selectedLanguage = language === "spanish" ? "Spanish" : "French";

      const initialMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Hello! I'm your ${selectedLanguage} conversation partner. Let's practice ${topic.title.toLowerCase()}. I'll help you improve your speaking skills. How would you like to start?`,
        timestamp: Date.now(),
      };

      setMessages([initialMessage]);
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedTopic) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, this would use the AI SDK to generate a response
      // For demonstration, we'll simulate an AI response
      setTimeout(() => {
        const responses = [
          "¡Muy bien! Could you tell me more about that?",
          "Excellent! Let's practice a different phrase. How would you say 'I would like to order' in Spanish?",
          "Great job! Your pronunciation is improving. Let's try another topic.",
          "That's correct! Now, let's practice asking questions.",
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: randomResponse,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        // In a real app, you would send this audio to a speech-to-text service
        // For now, we'll simulate a transcription
        simulateTranscription();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all tracks on the stream
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const simulateTranscription = () => {
    // In a real app, this would be the result of a speech-to-text service
    const phrases = [
      "Hola, ¿cómo estás?",
      "Me gustaría practicar español",
      "¿Puedes ayudarme con mi pronunciación?",
      "¿Dónde está el restaurante?",
    ];

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setInput(randomPhrase);
  };

  const speakMessage = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "spanish" ? "es-ES" : "fr-FR";
    window.speechSynthesis.speak(utterance);
  };

  const languageNames: Record<string, string> = {
    spanish: "Spanish",
    french: "French",
    german: "German",
    japanese: "Japanese",
    mandarin: "Mandarin Chinese",
    italian: "Italian",
  };

  const displayLanguage = languageNames[language] || "Spanish";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/dashboard?lang=${language}`}>
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Conversation Practice</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Practice your {displayLanguage} conversation skills with our AI tutor
        </p>

        {!selectedTopic ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <Card
                key={topic.id}
                className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => startConversation(topic.id)}
              >
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {topic.description}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[70vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {topics.find((t) => t.id === selectedTopic)?.title}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTopic(null)}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Change Topic</span>
              </Button>
            </div>

            <Card className="flex-grow overflow-hidden flex flex-col mb-4">
              <div className="flex-grow overflow-y-auto p-4">
                {messages.length === 0 && !isLoading ? (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    <p>Select a topic to start the conversation</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-slate-100 dark:bg-slate-800"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <p>{message.content}</p>
                            {message.role === "assistant" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 h-6 w-6"
                                onClick={() => speakMessage(message.content)}
                              >
                                <VolumeUp className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"></div>
                            <div
                              className="h-2 w-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={
                      isRecording
                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                        : ""
                    }
                  >
                    {isRecording ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading || !selectedTopic}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading || !selectedTopic}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
