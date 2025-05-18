import Navbar from "@/components/navbar";
import Logo from "@/components/ui/logo";
import { Github, GithubIcon, Mail } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <main className="h-auto w-full">{children}</main>
    </div>
  );
}
