"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mic,
  FileText,
  MessageSquareText,
  History,
  User,
  Settings,
  HelpCircle,
  Info,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Record",
    href: "/dashboard/record",
    icon: Mic,
  },
  {
    title: "Transcriptions",
    href: "/dashboard/transcriptions",
    icon: FileText,
  },
  {
    title: "AI Coach",
    href: "/dashboard/chat",
    icon: MessageSquareText,
  },
  {
    title: "Chat History",
    href: "/dashboard/chat/dashboard/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
  {
    title: "About",
    href: "/dashboard/about",
    icon: Info,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-auto p-2">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/dashboard/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
