"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const links = [
  { name: "聊天", href: "/chat" },
  { name: "微调广场", href: "/tuning" },
  { name: "设置", href: "/settings" },
];

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
              className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
              href="/"
            >
              <div className="w-32 text-primary-foreground md:w-40">
                <h1 className="text-2xl font-bold">HotAI</h1>
              </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
              {links.map((link) => {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium",
                      "hover:bg-accent hover:text-accent-foreground",
                      "md:flex-none md:justify-start md:p-2 md:px-3",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <p className="hidden md:block">{link.name}</p>
                  </Link>
                );
              })}
              <div className="hidden h-auto w-full grow rounded-md md:block"></div>
              <button
                onClick={handleSignOut}
                className={cn(
                  "flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md",
                  "p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "md:flex-none md:justify-start md:p-2 md:px-3"
                )}
              >
                <span className="hidden md:block">退出登录</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow md:overflow-y-auto md:p-0">{children}</div>
      </div>
    </ThemeProvider>
  );
}
