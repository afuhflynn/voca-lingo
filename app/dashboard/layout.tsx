import type React from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import Logo from "@/components/ui/logo";
import { Metadata } from "next";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

// dashboard metadat
export async function generateMetadata(): Promise<Metadata> {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  return {
    title: session?.user?.name
      ? `${session.user.name} | VocaLingo`
      : "Dashboard | VocaLingo",
    description: "Your dashboard for managing your account and settings.",
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full overflow-auto bg-gradient-to-b from-background to-muted transition-all duration-300 flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-card sticky top-0">
        <div className="p-4 border-b">
          <Logo className="!text-xl" size={36} />
        </div>
        <DashboardNav />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card sticky top-0 z-10">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="ml-auto flex items-center gap-4 pr-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
