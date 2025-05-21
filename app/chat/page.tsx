"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, ChevronLeft, Globe, BotIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { loadVapiEnvs, vapi } from "@/lib/vapi";
import { config } from "dotenv";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// load envs
config();

export default function ChatPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending, error } = useSession();

  // Vapi api and assistant keys set up
  const vapiKeys = loadVapiEnvs();

  const handleStartSession = async () => {
    setIsRecording((prev) => !prev);
    setIsLoading(true);
    await vapi.start(vapiKeys.assistantKey);
    setCurrentQuestion("");
  };

  const handleStopSession = async () => {
    setIsRecording((prev) => !prev);
    setCurrentQuestion("");

    vapi.stop();
  };

  // Handle ai call backs
  useEffect(() => {
    const handleCallStartState = async () => {
      setIsLoading(false);
      toast({
        title: "Call started",
        description: "You can start speaking now.",
        duration: 3000,
      });
      setCurrentQuestion("AI is waiting for your response...");
    };

    const handleCallEndState = async () => {
      toast({
        title: "Call ended",
        description: "You can end the call.",
        duration: 3000,
      });
    };

    const handleCallMessageState = async (msg: {
      transcript: string;
      type: string;
      transcriptType: string;
    }) => {
      if (msg.type !== "transcript") return;
      if (msg.transcriptType === "partial") {
        setCurrentQuestion(msg["transcript"]);
      }
    };

    const handleAiSpeechStart = async () => {
      setIsAiSpeaking(true);
    };
    const handleAiSpeechEnd = async () => {
      setIsAiSpeaking(false);
    };
    const handleCallError = async (error: { message: string }) => {
      setIsRecording(false);
      setIsAiSpeaking(false);
      setIsLoading(false);
      toast({
        title: "Error",
        description: `${error.message}. Please check your internet connection and try again later.`,
        duration: 3000,
        variant: "destructive",
      });
    };

    // vapi.on("")
    // Handle call ui state
    vapi.on("error", (error) => handleCallError(error));
    vapi.on("speech-start", handleAiSpeechStart);
    vapi.on("speech-end", handleAiSpeechEnd);
    vapi.on("message", (msg) => {
      console.log(msg);
      handleCallMessageState(msg);
    });
    vapi.on("call-end", handleCallEndState);
    vapi.on("call-start", handleCallStartState);

    // The app sdk calls
    return () => {
      vapi.on("error", (error) => handleCallError(error));
      vapi.off("speech-start", handleAiSpeechStart);
      vapi.off("speech-end", handleAiSpeechEnd);
      vapi.off("message", (msg) => {
        handleCallMessageState(msg);
      });
      vapi.off("call-end", handleCallEndState);
      vapi.off("call-start", handleCallStartState);
    };
  }, [isRecording, vapi]);

  if (error) {
    toast({
      description:
        error.message ||
        "Error connecting to our auth server to get your session. Check your internet connection.",
      variant: "destructive",
    });
  }

  if (isPending) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {/* Interview Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white">
            <Globe className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold text-white">
            Language Lessons Practice
          </h1>
        </div>

        {/* Participants Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Tutor Card */}
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-indigo-900/30 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-800/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-700/70 flex items-center justify-center">
                      <BotIcon className="h-8 w-8 text-indigo-200" />
                    </div>
                  </div>
                </div>
                {isAiSpeaking && (
                  <div className="absolute -right-2 bottom-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center animate-pulse">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">
                AI Tutor
              </h2>
              <p className="text-gray-400 text-sm">Conversation Partner</p>
            </div>
          </div>

          {/* User Card */}
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm hidden sm:block">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
                  <Avatar className="h-full w-full">
                    <AvatarImage
                      className="w-full h-full object-cover"
                      src={session?.user?.image as string}
                      alt="@user"
                    />
                    <AvatarFallback className="font-extrabold text-5xl">
                      {" "}
                      {session?.user?.name?.split(" ")[0].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {!isAiSpeaking && !isLoading && isRecording && (
                  <div className="absolute -right-2 bottom-0 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">
                {session?.user.name}
              </h2>
              <p className="text-gray-400 text-sm">Language Learner</p>
            </div>
          </div>
        </div>

        {/* Current Question/Prompt */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-4 mb-8">
          <div className="text-center py-2">
            <p className="text-lg text-white">{currentQuestion}</p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {isLoading ? (
            <Button
              size="lg"
              variant={"outline"}
              className={`rounded-full px-8 flex items-center`}
            >
              <span className="gradient-text text-lg animate-in">Loading</span>
              <span className="animate-pulse delay-500 font-bold gradient-text text-[10px]">
                ⚫
              </span>
              <span className="animate-pulse delay-1000 font-bold gradient-text text-[10px]">
                ⚫
              </span>
              <span className="animate-pulse delay-&lsqb;1500&rsqb; font-bold gradient-text text-[10px]">
                ⚫
              </span>
            </Button>
          ) : !isRecording && !isLoading ? (
            <Button
              onClick={handleStartSession}
              size="lg"
              className={`rounded-full px-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white
            }`}
            >
              Start Lesson
              <Mic className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              onClick={handleStopSession}
              size="lg"
              className={`rounded-full px-8 bg-red-500 hover:bg-red-600 text-white
               `}
            >
              Stop
              <Mic className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
