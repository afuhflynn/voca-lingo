import { BookOpen, Mic, Award, Zap, CheckCircle } from "lucide-react"

export function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      type: "lesson",
      title: "Completed Lesson: Food & Dining",
      time: "Today, 10:30 AM",
      xp: 60,
      icon: <BookOpen className="h-4 w-4 text-white" />,
      color: "bg-indigo-500",
    },
    {
      id: 2,
      type: "practice",
      title: "Voice Chat Practice: 15 minutes",
      time: "Today, 9:15 AM",
      xp: 45,
      icon: <Mic className="h-4 w-4 text-white" />,
      color: "bg-purple-500",
    },
    {
      id: 3,
      type: "achievement",
      title: "Unlocked Achievement: Consistent Learner",
      time: "Yesterday, 8:45 PM",
      xp: 100,
      icon: <Award className="h-4 w-4 text-white" />,
      color: "bg-yellow-500",
    },
    {
      id: 4,
      type: "lesson",
      title: "Completed Lesson: Basic Greetings",
      time: "Yesterday, 4:20 PM",
      xp: 50,
      icon: <BookOpen className="h-4 w-4 text-white" />,
      color: "bg-indigo-500",
    },
    {
      id: 5,
      type: "quiz",
      title: "Completed Quiz: Verb Conjugation",
      time: "Yesterday, 2:10 PM",
      xp: 35,
      icon: <CheckCircle className="h-4 w-4 text-white" />,
      color: "bg-green-500",
    },
    {
      id: 6,
      type: "practice",
      title: "Voice Chat Practice: 20 minutes",
      time: "May 15, 7:30 PM",
      xp: 60,
      icon: <Mic className="h-4 w-4 text-white" />,
      color: "bg-purple-500",
    },
    {
      id: 7,
      type: "lesson",
      title: "Completed Lesson: Daily Routines",
      time: "May 15, 3:45 PM",
      xp: 70,
      icon: <BookOpen className="h-4 w-4 text-white" />,
      color: "bg-indigo-500",
    },
  ]

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative">
          {index < activities.length - 1 && (
            <div className="absolute top-7 left-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          )}
          <div className="flex gap-4">
            <div
              className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0 z-10`}
            >
              {activity.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <div className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full text-xs">
                  <Zap className="h-3 w-3" />
                  <span>{activity.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
