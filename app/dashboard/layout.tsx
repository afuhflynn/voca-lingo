import { DashboardNav } from "@/components/dashboard-nav";
import { Metadata } from "next";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { DashboardTopBar } from "@/components/dashboard-top-bar";

// dashboard metadat
export async function generateMetadata(): Promise<Metadata> {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  return {
    title: session?.user?.name
      ? `${session.user.name} | VocaLingo`
      : "Dashboard | VocaLingo",
    description:
      "Your dashboard for learning and managing your account and settings.",
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-background to-muted transition-all duration-300 flex">
      <DashboardNav />

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        <DashboardTopBar />
        <main className=" h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
}
