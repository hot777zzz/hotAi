"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/chat",
    label: "对话",
    icon: "💬",
  },
  {
    href: "/tuning",
    label: "调优",
    icon: "🎛️",
  },
  {
    href: "/settings",
    label: "设置",
    icon: "⚙️",
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-primary/10 text-primary"
              : "text-foreground/60"
          )}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
