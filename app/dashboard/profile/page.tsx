"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Edit, Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <main className="flex-1 p-4 px-2 md:p-6 overflow-auto">
      <div className="container mx-auto px-5">
        <div className="mb-8">
          <Card className="gradient-border overflow-hidden pt-0">
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />{" "}
            {/* Background gradient overlay */}
            <CardContent className="p-6 relative">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
                <div className="absolute -top-16 left-1/2 md:left-6 transform -translate-x-1/6 md:translate-x-0">
                  <div className="relative">
                    <Avatar className="h-28 w-28">
                      <AvatarImage
                        src={session?.user?.image as string}
                        alt="@user"
                      />
                      <AvatarFallback>
                        {" "}
                        {session?.user?.name?.split(" ")[0].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 gradient-bg hidden"
                      aria-label="Change profile picture"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>

                <div className="mt-16 md:mt-0 md:ml-36 text-center md:text-left flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        @{user?.username}
                      </p>
                    </div>
                    <Link href={"/dashboard/settings"}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
