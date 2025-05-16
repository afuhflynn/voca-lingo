import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/prisma";
import {
  Trophy,
  Flame,
  Star,
  BookOpen,
  Mic,
  MessageSquare,
  Calendar,
  Clock,
  ChevronRight,
  BarChart,
  Award,
  Sparkles,
  BookMarked,
  Download,
  CheckCircle,
  LightbulbIcon,
  Zap,
  Volume,
} from "lucide-react";

// Dashboard stats component
function StatsCard({
  title,
  value,
  icon,
  description,
  color = "text-primary",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  color?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          <div
            className={`p-2 rounded-full ${color.replace("text-", "bg-")}/10`}
          >
            <div className={`${color}`}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Practice mode card component
function PracticeCard({
  title,
  description,
  icon,
  href,
  color = "bg-primary",
  disabled = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={`block ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className={`${color} text-white rounded-t-lg p-4`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            {icon}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="text-xs text-muted-foreground">
            {disabled ? "Coming soon" : "Start practicing"}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// Achievement component
function Achievement({
  title,
  description,
  icon,
  unlocked = true,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div
        className={`p-2.5 rounded-full ${
          unlocked
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
        }`}
      >
        {icon}
      </div>
      <div>
        <h4 className={`font-medium ${unlocked ? "" : "text-gray-400"}`}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Activity log component
function ActivityLog({
  activity,
  timestamp,
  icon,
  xpEarned = null,
}: {
  activity: string;
  timestamp: string;
  icon: React.ReactNode;
  xpEarned?: number | null;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="p-2 rounded-full bg-muted">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">{activity}</p>
          {xpEarned && (
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs font-medium">+{xpEarned} XP</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
}

// Learning roadmap step
function RoadmapStep({
  title,
  description,
  status,
  current = false,
}: {
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  current?: boolean;
}) {
  return (
    <div
      className={`p-4 border-l-2 ${
        status === "completed"
          ? "border-green-500"
          : current
          ? "border-blue-500"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`h-2 w-2 rounded-full ${
            status === "completed"
              ? "bg-green-500"
              : current
              ? "bg-blue-500"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        ></div>
        <h4
          className={`text-sm font-medium ${
            status === "upcoming" ? "text-muted-foreground" : ""
          }`}
        >
          {title}
        </h4>
      </div>
      <p className="text-xs text-muted-foreground ml-4">{description}</p>
    </div>
  );
}

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/sign-in");
  }

  // For this example, we'll use the data directly from session
  // In a real app, we'd fetch more detailed user stats from the database
  const user = session.user;

  // Mock data for the dashboard
  // In a real app, this would come from the database
  const userStats = {
    streak: 7,
    xpTotal: 1245,
    xpToday: 75,
    vocabularyLearned: 124,
    minutesLearned: 312,
    level: "intermediate",
    lastActive: "Today",
    topicsCompleted: 8,
    nextMilestone: { name: "Grammar Expert", xpNeeded: 155 },
    progress: {
      vocabulary: 45,
      grammar: 32,
      pronunciation: 68,
      conversation: 27,
    },
  };

  // Offline learning support
  const offlineEnabled = true;
  const offlineProgress = {
    vocabularyLists: 3,
    practiceExercises: 5,
    totalSizeInMb: 12.4,
  };

  // Mock recent activities
  const recentActivities = [
    {
      activity: "Completed 10 vocabulary words",
      timestamp: "Today, 10:23 AM",
      icon: <BookOpen className="h-4 w-4" />,
      xpEarned: 25,
    },
    {
      activity: "Practiced pronunciation for 5 minutes",
      timestamp: "Yesterday, 2:45 PM",
      icon: <Mic className="h-4 w-4" />,
      xpEarned: 15,
    },
    {
      activity: "Had a conversation about restaurants",
      timestamp: "2 days ago",
      icon: <MessageSquare className="h-4 w-4" />,
      xpEarned: 30,
    },
    {
      activity: "Learned 5 new verbs",
      timestamp: "May 14, 2025",
      icon: <BookMarked className="h-4 w-4" />,
      xpEarned: 20,
    },
  ];

  // Mock achievements
  const achievements = [
    {
      title: "First Conversation",
      description: "Complete your first AI conversation practice",
      icon: <MessageSquare className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Vocabulary Builder",
      description: "Learn 100 new words",
      icon: <BookOpen className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Perfect Pronunciation",
      description: "Score 90+ on 5 pronunciation exercises",
      icon: <Mic className="h-5 w-5" />,
      unlocked: true,
    },
    {
      title: "Grammar Master",
      description: "Complete all intermediate grammar lessons",
      icon: <CheckCircle className="h-5 w-5" />,
      unlocked: false,
    },
  ];

  // Mock recommendations based on user level and history
  const recommendations = [
    {
      title: "Practice Past Tense Verbs",
      description:
        "You're making good progress, but could use more practice with irregular verbs",
      type: "vocabulary",
      priority: "high",
    },
    {
      title: "Conversation: Ordering in Restaurants",
      description: "This topic builds on your recent food vocabulary practice",
      type: "conversation",
      priority: "medium",
    },
    {
      title: "Pronunciation: Difficult Sounds",
      description: "Focus on the sounds you find most challenging",
      type: "pronunciation",
      priority: "medium",
    },
  ];

  // Roadmap based on user's current level
  const learningRoadmap = [
    {
      title: "Basic Vocabulary & Phrases",
      description: "Learn 100 essential words and expressions",
      status: "completed" as const,
    },
    {
      title: "Simple Conversations",
      description: "Practice basic dialogues in common situations",
      status: "completed" as const,
    },
    {
      title: "Intermediate Grammar",
      description: "Past tenses, conditionals, and more complex structures",
      status: "current" as const,
    },
    {
      title: "Advanced Vocabulary",
      description: "Idiomatic expressions and specialized vocabulary",
      status: "upcoming" as const,
    },
    {
      title: "Fluent Conversations",
      description: "Handle complex topics and express nuanced opinions",
      status: "upcoming" as const,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Welcome section with user info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name || "Student"}!
          </h1>
          <p className="text-muted-foreground">
            Your Spanish learning journey continues
          </p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="mr-4 text-right">
            <div className="flex items-center justify-end">
              <Flame className="text-orange-500 mr-1 h-5 w-5" />
              <span className="font-bold">{userStats.streak} day streak</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Level: {userStats.level}
            </div>
          </div>
          <Avatar className="h-12 w-12">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>

      {/* Offline learning alert (show only if enabled) */}
      {offlineEnabled && (
        <Alert className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <AlertDescription className="text-blue-900 dark:text-blue-300">
                <span className="font-medium">Offline learning enabled.</span>{" "}
                {offlineProgress.vocabularyLists} vocabulary lists and{" "}
                {offlineProgress.practiceExercises} practice exercises available
                offline ({offlineProgress.totalSizeInMb} MB).
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* Main dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total XP"
          value={userStats.xpTotal}
          icon={<Star className="h-5 w-5" />}
          color="text-amber-500"
        />
        <StatsCard
          title="Daily Streak"
          value={userStats.streak}
          icon={<Flame className="h-5 w-5" />}
          color="text-orange-500"
        />
        <StatsCard
          title="Words Learned"
          value={userStats.vocabularyLearned}
          icon={<BookOpen className="h-5 w-5" />}
          color="text-green-500"
        />
        <StatsCard
          title="Time Spent"
          value={userStats.minutesLearned}
          description="minutes"
          icon={<Clock className="h-5 w-5" />}
          color="text-blue-500"
        />
      </div>

      {/* Next milestone progress */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Next Milestone: {userStats.nextMilestone.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-1 flex justify-between text-sm">
            <span>XP Progress</span>
            <span className="text-muted-foreground">
              {userStats.xpToday} / {userStats.nextMilestone.xpNeeded} XP
            </span>
          </div>
          <Progress
            className="h-2"
            value={(userStats.xpToday / userStats.nextMilestone.xpNeeded) * 100}
          />

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Vocabulary</p>
              <Progress
                className="h-1.5 bg-muted"
                value={userStats.progress.vocabulary}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Grammar</p>
              <Progress
                className="h-1.5 bg-muted"
                value={userStats.progress.grammar}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Pronunciation
              </p>
              <Progress
                className="h-1.5 bg-muted"
                value={userStats.progress.pronunciation}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Conversation</p>
              <Progress
                className="h-1.5 bg-muted"
                value={userStats.progress.conversation}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Modes Section */}
      <h2 className="text-2xl font-bold mb-4">Practice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PracticeCard
          title="Vocabulary"
          description="Learn and review essential words and phrases"
          icon={<BookOpen className="h-5 w-5" />}
          href="/practice/vocabulary"
          color="bg-green-600"
        />
        <PracticeCard
          title="Pronunciation"
          description="Perfect your accent with speech practice"
          icon={<Mic className="h-5 w-5" />}
          href="/practice/pronunciation"
          color="bg-blue-600"
        />
        <PracticeCard
          title="Conversation"
          description="Practice real-life dialogues with AI tutor"
          icon={<MessageSquare className="h-5 w-5" />}
          href="/practice/conversation"
          color="bg-purple-600"
        />
        <PracticeCard
          title="Grammar"
          description="Master the rules of Spanish language"
          icon={<CheckCircle className="h-5 w-5" />}
          href="/practice/grammar"
          color="bg-amber-600"
          disabled={true}
        />
        <PracticeCard
          title="Listening"
          description="Improve your comprehension skills"
          icon={<Volume className="h-5 w-5" />}
          href="/practice/listening"
          color="bg-pink-600"
          disabled={true}
        />
        <PracticeCard
          title="Reading"
          description="Read and understand Spanish texts"
          icon={<BookOpen className="h-5 w-5" />}
          href="/practice/reading"
          color="bg-cyan-600"
          disabled={true}
        />
      </div>

      {/* Tabs for different dashboard sections */}
      <Tabs defaultValue="activity" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="recommendations">For You</TabsTrigger>
        </TabsList>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Learning Activity</CardTitle>
              <CardDescription>
                Track your recent Spanish practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-1">
                  {recentActivities.map((activity, index) => (
                    <ActivityLog
                      key={index}
                      activity={activity.activity}
                      timestamp={activity.timestamp}
                      icon={activity.icon}
                      xpEarned={activity.xpEarned}
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Learning Roadmap Tab */}
        <TabsContent value="roadmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Learning Roadmap</CardTitle>
              <CardDescription>
                Track your progress through Spanish proficiency levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {learningRoadmap.map((step, index) => (
                  <RoadmapStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    status={step.status}
                    current={step.status === "current"}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Achievements</CardTitle>
              <CardDescription>
                {achievements.filter((a) => a.unlocked).length} of{" "}
                {achievements.length} achievements unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {achievements.map((achievement, index) => (
                  <Achievement
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    unlocked={achievement.unlocked}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Personalized Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Based on your learning style and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="p-4 border-l-4 border-primary">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          rec.priority === "high"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {rec.type === "vocabulary" ? (
                          <BookOpen className="h-4 w-4" />
                        ) : rec.type === "pronunciation" ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm">
                        Start Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress Charts Card */}
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Learning Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-medium mb-4">Progress by Skill</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vocabulary</span>
                    <span>{userStats.progress.vocabulary}%</span>
                  </div>
                  <Progress
                    className="h-2"
                    value={userStats.progress.vocabulary}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Grammar</span>
                    <span>{userStats.progress.grammar}%</span>
                  </div>
                  <Progress
                    className="h-2"
                    value={userStats.progress.grammar}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pronunciation</span>
                    <span>{userStats.progress.pronunciation}%</span>
                  </div>
                  <Progress
                    className="h-2"
                    value={userStats.progress.pronunciation}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conversation</span>
                    <span>{userStats.progress.conversation}%</span>
                  </div>
                  <Progress
                    className="h-2"
                    value={userStats.progress.conversation}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Daily XP Breakdown</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {[15, 30, 20, 0, 45, 75, 25].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex-1 w-full flex items-end mb-1">
                      <div
                        className={`w-full ${
                          value > 0 ? "bg-primary" : "bg-muted"
                        }`}
                        style={{ height: `${Math.max(value * 1.5, 5)}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Weekly goal
                  </span>
                  <span className="font-medium">300 XP</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Current
                  </span>
                  <span className="font-medium">210 XP</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Streak
                  </span>
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="font-medium">{userStats.streak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Detailed Statistics
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
