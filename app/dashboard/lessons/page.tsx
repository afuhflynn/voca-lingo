import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  ChevronRight,
  Star,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function LessonsPage() {
  const lessonCategories = [
    { id: "all", name: "All Lessons" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
    { id: "conversation", name: "Conversation" },
  ];

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Learn essential greetings and introductions",
      category: "beginner",
      duration: "15 min",
      progress: 100,
      completed: true,
      level: "Beginner",
      xp: 50,
    },
    {
      id: 2,
      title: "Food & Dining",
      description: "Vocabulary for restaurants and ordering food",
      category: "beginner",
      duration: "20 min",
      progress: 75,
      completed: false,
      level: "Beginner",
      xp: 60,
    },
    {
      id: 3,
      title: "Daily Routines",
      description: "Describe your daily activities and schedule",
      category: "beginner",
      duration: "25 min",
      progress: 40,
      completed: false,
      level: "Beginner",
      xp: 70,
    },
    {
      id: 4,
      title: "Past Tense Conversations",
      description: "Practice talking about past events and experiences",
      category: "intermediate",
      duration: "30 min",
      progress: 0,
      completed: false,
      level: "Intermediate",
      xp: 90,
      locked: true,
    },
    {
      id: 5,
      title: "Travel Scenarios",
      description: "Navigate common travel situations with confidence",
      category: "intermediate",
      duration: "35 min",
      progress: 0,
      completed: false,
      level: "Intermediate",
      xp: 100,
    },
    {
      id: 6,
      title: "Expressing Opinions",
      description: "Learn to share and discuss different viewpoints",
      category: "intermediate",
      duration: "25 min",
      progress: 0,
      completed: false,
      level: "Intermediate",
      xp: 85,
    },
    {
      id: 7,
      title: "Hypothetical Situations",
      description: "Master the conditional tense for hypothetical scenarios",
      category: "advanced",
      duration: "40 min",
      progress: 0,
      completed: false,
      level: "Advanced",
      xp: 120,
      locked: true,
    },
    {
      id: 8,
      title: "Cultural Discussions",
      description: "Engage in deeper conversations about cultural topics",
      category: "advanced",
      duration: "45 min",
      progress: 0,
      completed: false,
      level: "Advanced",
      xp: 150,
      locked: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="mb-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search lessons..."
                className="pl-10 bg-white dark:bg-gray-800"
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                {lessonCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </TabsContent>

              {["beginner", "intermediate", "advanced", "conversation"].map(
                (category) => (
                  <TabsContent
                    key={category}
                    value={category}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {lessons
                        .filter((lesson) => lesson.category === category)
                        .map((lesson) => (
                          <LessonCard key={lesson.id} lesson={lesson} />
                        ))}
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
    progress: number;
    completed: boolean;
    level: string;
    xp: number;
    locked?: boolean;
  };
}

function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Card
      className={`overflow-hidden gradient-border hover:shadow-md transition-shadow ${
        lesson.locked ? "opacity-75" : ""
      }`}
    >
      <div className="relative">
        {lesson.locked && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        )}

        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
          {lesson.completed && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs rounded-full px-2 py-1 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Completed</span>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 text-xs rounded-full px-2 py-1">
            {lesson.level}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{lesson.title}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs font-medium">{lesson.xp} XP</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
          <div>
            {lesson.progress > 0 && !lesson.completed && (
              <span>{lesson.progress}% complete</span>
            )}
          </div>
        </div>

        {lesson.progress > 0 && !lesson.completed && (
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
            <div
              className="h-full gradient-bg rounded-full"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
        )}

        <Link href={`/lessons/${lesson.id}`}>
          <Button
            className={`w-full ${
              lesson.completed
                ? "bg-green-500 hover:bg-green-600"
                : lesson.progress > 0
                ? ""
                : "gradient-bg"
            }`}
            disabled={lesson.locked}
          >
            {lesson.completed
              ? "Review Lesson"
              : lesson.progress > 0
              ? "Continue"
              : "Start Lesson"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
