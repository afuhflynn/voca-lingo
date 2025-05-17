"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import {
  ArrowLeft,
  ArrowRight,
  VolumeIcon as VolumeUp,
  Mic,
  MicOff,
  Play,
  RotateCcw,
} from "lucide-react";

// Type definitions

type VocabItem = {
  id: string;
  word: string;
  translation: string;
  example?: string;
  pronunciation?: string;
};

// Mock vocabulary data
const vocabItems: VocabItem[] = [
  { id: "1", word: "Hola", translation: "Hello" },
  { id: "2", word: "Gracias", translation: "Thank you" },
  { id: "3", word: "Por favor", translation: "Please" },
  { id: "4", word: "Amigo", translation: "Friend" },
  { id: "5", word: "Comida", translation: "Food" },
];

export default function VocabularyPracticePage() {
  const searchParams = useSearchParams();

  // State
  const [language, setLanguage] = useState("Spanish");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize language from URL
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) setLanguage(lang);
  }, [searchParams]);

  const totalItems = vocabItems.length;
  const progress = ((currentIndex + 1) / totalItems) * 100;
  const currentItem = vocabItems[currentIndex];

  const next = () => {
    if (currentIndex < totalItems - 1)
      resetState(() => setCurrentIndex((i) => i + 1));
  };
  const prev = () => {
    if (currentIndex > 0) resetState(() => setCurrentIndex((i) => i - 1));
  };
  const resetState = (action: () => void) => {
    setRecordedAudio(null);
    setScore(null);
    setFeedback(null);
    action();
  };

  const playOriginal = () => {
    const utter = new SpeechSynthesisUtterance(currentItem.word);
    utter.lang = language === "Spanish" ? "es-ES" : "en-US";
    window.speechSynthesis.speak(utter);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => handleRecordingStop();
      recorder.start();
      setIsRecording(true);
    } catch {
      setFeedback("Mic access denied");
    }
  };

  const handleRecordingStop = () => {
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    setRecordedAudio(url);
    simulateScore();
    setIsRecording(false);
  };

  const playRecorded = () => recordedAudio && new Audio(recordedAudio).play();

  const simulateScore = () => {
    const random = Math.floor(Math.random() * 41) + 60;
    setScore(random);
    setFeedback(
      random >= 90
        ? "Excellent!"
        : random >= 80
        ? "Very good!"
        : random >= 70
        ? "Good."
        : "Keep practicing."
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft /> Back
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-2">Vocabulary Practice</h1>
      <p className="text-slate-600 mb-6">Practice your {language} words.</p>

      <div className="mb-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm mt-1">
          <span>
            Item {currentIndex + 1} of {totalItems}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{currentItem.word}</h2>
            <p className="text-slate-500">{currentItem.translation}</p>
          </div>
          <Button variant="outline" size="icon" onClick={playOriginal}>
            <VolumeUp />
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {!isRecording && !recordedAudio ? (
            <Button onClick={startRecording}>
              <Mic /> Record
            </Button>
          ) : isRecording ? (
            <Button
              variant="destructive"
              onClick={() => mediaRecorderRef.current?.stop()}
            >
              <MicOff /> Stop
            </Button>
          ) : (
            <>
              <Button onClick={playRecorded}>
                <Play /> Play
              </Button>
              <Button onClick={() => resetState(() => {})}>
                <RotateCcw /> Retry
              </Button>
            </>
          )}
        </div>

        {score !== null && (
          <>
            <div className="flex justify-between items-center mb-2">
              <span>Score:</span>
              <span className="font-bold">{score}/100</span>
            </div>
            <Progress value={score} className="h-2" />
          </>
        )}

        {feedback && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>{feedback}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button onClick={prev} disabled={currentIndex === 0}>
          <ArrowLeft /> Prev
        </Button>
        <Button onClick={next} disabled={currentIndex === totalItems - 1}>
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
