"use client";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending, error } = useSession();

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-4 px-0 md:p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back,{" "}
                {session?.user?.name
                  ? `${session?.user?.name.split(" ")[0]} ${
                      session?.user?.name.split(" ")[1]
                    }`
                  : "Learner"}
                !
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Continue your language journey
              </p>
            </div>
          </div>

          <Card className="gradient-border hover:shadow-md transition-shadow w-full">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    Learn something new today!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 mt-2">
                    Click or press the Start Voice Chat button above to start
                    learning
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
