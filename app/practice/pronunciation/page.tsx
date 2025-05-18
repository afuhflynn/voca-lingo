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

import {
  ArrowLeft,
  ArrowRight,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  VolumeIcon as VolumeUp,
  RefreshCcw,
} from "lucide-react";

// Types

type PronunciationItem = {
  id: string;
  phrase: string;
  translation: string;
};

// Mock data

const pronunciationItems: PronunciationItem[] = [
  { id: "1", phrase: "Buenos días", translation: "Good morning" },
  { id: "2", phrase: "¿Cómo estás?", translation: "How are you?" },
  { id: "3", phrase: "Me llamo...", translation: "My name is..." },
  { id: "4", phrase: "Mucho gusto", translation: "Nice to meet you" },
  {
    id: "5",
    phrase: "¿Dónde está el baño?",
    translation: "Where is the bathroom?",
  },
];

export default function PronunciationPracticePage() {
  const searchParams = useSearchParams();

  const [language, setLanguage] = useState<string>("Spanish");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const router = useRouter();

  // Init language from query
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) setLanguage(lang);
  }, [searchParams]);

  const currentItem = pronunciationItems[currentIndex];

  const next = () => {
    if (currentIndex < pronunciationItems.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      reset();
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
      reset();
    }
  };

  const reset = () => {
    setRecordedAudio(null);
    setScore(null);
    setFeedback(null);
  };

  const playOriginal = () => {
    const utter = new SpeechSynthesisUtterance(currentItem.phrase);
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
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(url);
        simulateScore();
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      setFeedback("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playRecorded = () => {
    if (recordedAudio) new Audio(recordedAudio).play();
  };

  const simulateScore = () => {
    const random = Math.floor(Math.random() * 41) + 60;
    setScore(random);
    if (random >= 90) setFeedback("Excellent pronunciation!");
    else if (random >= 80) setFeedback("Very good!");
    else if (random >= 70) setFeedback("Good effort.");
    else setFeedback("Keep practicing.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pt-6 pl-3">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-2">Pronunciation Practice</h1>
      <p className="text-slate-600 mb-6">
        Practice your {language} pronunciation.
      </p>

      <div className="mb-4">
        <Progress
          value={((currentIndex + 1) / pronunciationItems.length) * 100}
          className="h-2"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>
            Item {currentIndex + 1} of {pronunciationItems.length}
          </span>
          <span>
            {Math.round(((currentIndex + 1) / pronunciationItems.length) * 100)}
            %
          </span>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{currentItem.phrase}</h2>
            <p className="text-slate-500">{currentItem.translation}</p>
          </div>
          <Button variant="outline" size="icon" onClick={playOriginal}>
            <VolumeUp />
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {!isRecording && !recordedAudio && (
            <Button onClick={startRecording}>
              <Mic /> Record
            </Button>
          )}
          {isRecording && (
            <Button variant="destructive" onClick={stopRecording}>
              <MicOff /> Stop
            </Button>
          )}
          {recordedAudio && (
            <>
              <Button onClick={playRecorded}>
                <Play /> Play
              </Button>
              <Button onClick={reset}>
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
          <ArrowLeft /> Previous
        </Button>
        <Button
          onClick={next}
          disabled={currentIndex === pronunciationItems.length - 1}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
