"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  VolumeIcon as VolumeUp,
  RefreshCw,
} from "lucide-react";

// Types

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

type ConversationTopic = {
  id: string;
  title: string;
  description: string;
};

// Mock topics

const topics: ConversationTopic[] = [
  {
    id: "greetings",
    title: "Greetings & Introductions",
    description: "Practice introducing yourself and basic greetings.",
  },
  {
    id: "restaurant",
    title: "At the Restaurant",
    description: "Learn how to order food and have conversations while dining.",
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Practice vocabulary for shopping and asking about products.",
  },
  {
    id: "travel",
    title: "Travel & Directions",
    description: "Learn how to ask for directions and talk about travel plans.",
  },
  {
    id: "work",
    title: "Work & Professional Life",
    description:
      "Practice conversations about jobs, interviews, and office life.",
  },
  {
    id: "debate",
    title: "Opinions & Debates",
    description: "Practice expressing opinions and discussing current topics.",
  },
];

export default function ConversationPracticePage() {
  const searchParams = useSearchParams();

  // State
  const [language, setLanguage] = useState<string>("Spanish");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize language from query
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) setLanguage(lang);
  }, [searchParams]);

  const startConversation = (topicId: string) => {
    setSelectedTopic(topicId);
    setMessages([
      {
        id: "init",
        role: "assistant",
        content: `Let's practice ${topicId}! How would you like to start?`,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || !selectedTopic) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      const reply: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Great! Tell me more.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 800);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        // Simulate transcription by adding a dummy message
        setInput("[Transcribed speech...]");
      };
      recorder.start();
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === "Spanish" ? "es-ES" : "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pt-6 pl-3">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-2">Conversation Practice</h1>
      <p className="text-muted-foreground mb-6">
        Practice your {language} skills.
      </p>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((t) => (
            <Card
              key={t.id}
              className="p-4 cursor-pointer hover:shadow"
              onClick={() => startConversation(t.id)}
            >
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col h-[70vh]">
          <CardHeader className="flex justify-between items-center">
            <h2>{topics.find((t) => t.id === selectedTopic)?.title}</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedTopic(null)}
            >
              <RefreshCw /> Change
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-black"
                  } p-3 rounded-lg`}
                  onClick={() => m.role === "assistant" && speak(m.content)}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="text-sm text-muted-foreground">AI is typing...</p>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-4 border-t flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <MicOff /> : <Mic />}
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
              <Send />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
