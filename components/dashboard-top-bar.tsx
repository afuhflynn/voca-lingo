import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import { UserNav } from "./user-nav";
import { ModeToggle } from "./mode-toggle";

export const DashboardTopBar = async () => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  return (
    <header className="border-b bg-card sticky top-0 z-10 w-full">
      <div className="flex h-16 items-center px-1 md:px-6 w-full">
        <div className="items-center gap-4 hidden sm:flex">
          <Link href={"/dashboard"}>
            <h1 className="sm:text-2xl text-xl gradient-text font-bold">
              {session?.user?.name?.split(" ").slice(0, 2) || "Dashboard"}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:justify-end justify-between w-full">
          <Link href={"/chat"}>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-secondary"
            >
              <Mic className="h-4 w-4 ml-1" />
              Start Voice Chat
            </Button>
          </Link>

          <div className="flex items-center gap-4  h-auto">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};
