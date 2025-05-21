import { DashboardNav } from "@/components/dashboard-nav";
import { Metadata } from "next";
import { DashboardTopBar } from "@/components/dashboard-top-bar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// dashboard metadat
export async function generateMetadata(): Promise<Metadata> {
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
  } catch (error) {
    console.error(error);
  }

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
        <main className=" h-full overflow-auto w-full">{children}</main>
      </div>
    </div>
  );
}
