"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/logo";
import { signOutAction } from "@/lib/actions/sign-out";

export default function LogoutPage() {
  const router = useRouter();
  // const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      // Sign out
      signOutAction();

      // Redirect to home page
      // setUser(null);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center  w-full h-screen p-0">
      <div className=" w-full h-auto flex items-center justify-start pt-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] flex-1">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <Logo hideText />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign Out</h1>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to sign out of your account?
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleLogout}
                disabled={isLoading}
                variant={"destructive"}
              >
                {isLoading ? "Signing out..." : "Yes, Sign Me Out"}
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/dashboard`}>Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
