"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import authConfig from "@/lib/auth.config";
import { LogOut } from "lucide-react";
import NextAuth from "next-auth";
import Link from "next/link";

export async function UserNav() {
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image as string} alt="@user" />
            <AvatarFallback>
              {" "}
              {session?.user?.name?.split(" ")[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/dashboard/profile"} className="cursor-pointer">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/settings"} className="cursor-pointer">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={"/sign-out"}
            className="cursor-pointer w-full flex items-center justify-start"
          >
            <Button
              type="submit"
              variant="ghost"
              className="w-full flex items-center justify-start"
            >
              <LogOut />
              Sign out
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
