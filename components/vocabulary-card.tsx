import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, VolumeIcon as VolumeUp, Check } from "lucide-react"

export function VocabularyCard() {
  const vocabularySets = [
    { id: "recent", name: "Recently Learned" },
    { id: "difficult", name: "Difficult Words" },
    { id: "food", name: "Food & Dining" },
    { id: "travel", name: "Travel Phrases" },
  ]

  const recentWords = [
    { word: "el restaurante", translation: "restaurant", mastered: true },
    { word: "la cuenta", translation: "the bill", mastered: true },
    { word: "el camarero", translation: "waiter", mastered: false },
    { word: "la propina", translation: "tip", mastered: false },
    { word: "el menú", translation: "menu", mastered: true },
  ]

  return (
    <Card className="gradient-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Vocabulary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            {vocabularySets.map((set) => (
              <TabsTrigger key={set.id} value={set.id}>
                {set.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="recent">
            <div className="space-y-3">
              {recentWords.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <VolumeUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <div className="font-medium">{item.word}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.translation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.mastered ? (
                      <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Mastered</span>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs">
                        Practice
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-2">
                View All Words
              </Button>
            </div>
          </TabsContent>

          {["difficult", "food", "travel"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="h-[200px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Vocabulary list will appear here</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
