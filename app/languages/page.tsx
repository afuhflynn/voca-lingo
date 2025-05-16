"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { Check, ChevronRight, GraduationCap, Award, Star } from "lucide-react";

// ——— Helper Types —————————————————————————————
type LanguageData = {
  id: string;
  name: string;
  code: string;
};

type ProgressData = {
  id: string;
  language: string;
  vocabularyLearned: number;
  lessonCompleted: number;
};

type UserData = {
  xpPoints: number;
  learningLevel: string;
  progress: ProgressData[];
};

// ——— Constants ——————————————————————————————
const languageFlags: Record<string, string> = {
  en: "/flags/en.svg",
  es: "/flags/es.svg",
  fr: "/flags/fr.svg",
  de: "/flags/de.svg",
  ja: "/flags/ja.svg",
  zh: "/flags/zh.svg",
  it: "/flags/it.svg",
  pt: "/flags/pt.svg",
  ru: "/flags/ru.svg",
  ko: "/flags/ko.svg",
};

const fallbackLanguages: LanguageData[] = [
  { id: "es", name: "Spanish", code: "es" },
  { id: "fr", name: "French", code: "fr" },
  { id: "de", name: "German", code: "de" },
  { id: "ja", name: "Japanese", code: "ja" },
  { id: "zh", name: "Mandarin Chinese", code: "zh" },
  { id: "it", name: "Italian", code: "it" },
];

// ——— Loading Skeleton —————————————————————————————————————
function LanguageCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-14 rounded" />
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="h-4 w-16 rounded-full mt-4" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-2 w-full" />
      </div>
    </Card>
  );
}

// ——— UI Component: Language List —————————————————————————————————
function LanguageList({
  languages,
  userData,
}: {
  languages: LanguageData[];
  userData: UserData;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleSelect = (id: string) => setSelectedLanguage(id);

  const getDifficulty = (code: string) =>
    ((
      {
        es: "Beginner",
        fr: "Intermediate",
        de: "Intermediate",
        ja: "Advanced",
        zh: "Advanced",
        it: "Beginner",
      } as Record<string, string>
    )[code] || "Beginner");

  const getSpeakers = (code: string) =>
    ((
      {
        es: "460 M",
        fr: "280 M",
        de: "100 M",
        ja: "125 M",
        zh: "1.1 B",
        it: "85 M",
      } as Record<string, string>
    )[code] || "—");

  const getProgress = (code: string) => {
    const p = userData.progress.find((p) => p.language === code);
    return p ? Math.min(Math.floor((p.vocabularyLearned / 100) * 100), 100) : 0;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Choose Your Language
        </h1>
        <p className="text-slate-600 mt-2">
          Select a language to start your journey
        </p>
        {userData.xpPoints > 0 && (
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{userData.xpPoints} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              <span className="capitalize">{userData.learningLevel}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((lang) => {
          const progress = getProgress(lang.code);
          const difficulty = getDifficulty(lang.code);
          const speakers = getSpeakers(lang.code);
          const flagUrl = languageFlags[lang.code] || "/placeholder.svg";

          return (
            <Card
              key={lang.id}
              className={`p-5 cursor-pointer transition-shadow duration-200 hover:shadow-lg ${
                selectedLanguage === lang.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelect(lang.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-14 rounded overflow-hidden">
                    <Image
                      src={flagUrl}
                      alt={`${lang.name} flag`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{lang.name}</h3>
                    <p className="text-sm text-slate-500">
                      {speakers} speakers
                    </p>
                  </div>
                </div>
                {selectedLanguage === lang.id && (
                  <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <span
                className={`mt-4 inline-block text-xs px-2 py-1 rounded-full ${
                  difficulty === "Beginner"
                    ? "bg-green-100 text-green-800"
                    : difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {difficulty}
              </span>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {progress > 0 && (
                <CardFooter className="mt-3 flex justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {
                      userData.progress.find((p) => p.language === lang.code)
                        ?.vocabularyLearned
                    }{" "}
                    words
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {
                      userData.progress.find((p) => p.language === lang.code)
                        ?.lessonCompleted
                    }{" "}
                    lessons
                  </div>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href={selectedLanguage ? `/dashboard?lang=${selectedLanguage}` : "#"}
        >
          <Button size="lg" className="px-8 py-2" disabled={!selectedLanguage}>
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        {!selectedLanguage && (
          <p className="text-xs text-slate-500 mt-2">
            Please select a language to continue
          </p>
        )}
      </div>
    </div>
  );
}

// ——— Main Page —————————————————————————————————————————
export default function LanguagesPage() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <LanguageCardSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LanguageList
      languages={fallbackLanguages}
      userData={{ xpPoints: 0, learningLevel: "Beginner", progress: [] }}
    />
  );
}
