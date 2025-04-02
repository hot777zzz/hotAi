"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "聊天", href: "/chat" },
  { name: "模型参数", href: "/tuning" },
  { name: "设置", href: "/settings" },
  { name: "捐赠", href: "/donate" },
];

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测设备类型
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSignOut = () => {
    // 清除 token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // 清除 localStorage 中的 token
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // 跳转到登录页
    router.push("/login");
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        {/* 移动端菜单按钮 */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed top-4 right-4 z-50 p-2 bg-background rounded-full shadow-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* 移动端菜单遮罩 */}
        {isMobile && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* 侧边导航 */}
        <div
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-full flex-none md:w-64"
          } bg-background`}
        >
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
              className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
              href="/"
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              <div className="w-32 text-primary-foreground md:w-40">
                <h1 className="text-2xl font-bold">HotAI</h1>
              </div>
            </Link>
            <div className="flex grow flex-col space-y-2">
              {links.map((link) => {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex h-[48px] items-center justify-start gap-2 rounded-md p-3 text-sm font-medium",
                      "hover:bg-accent hover:text-accent-foreground",
                      "md:p-2 md:px-3",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <p>{link.name}</p>
                  </Link>
                );
              })}
              <div className="hidden h-auto w-full grow rounded-md md:block"></div>
              <button
                onClick={() => {
                  handleSignOut();
                  if (isMobile) {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={cn(
                  "flex h-[48px] w-full items-center justify-start gap-2 rounded-md",
                  "p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "md:p-2 md:px-3"
                )}
              >
                <span>退出登录</span>
              </button>
            </div>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-grow md:overflow-y-auto md:p-0">{children}</div>
      </div>
    </ThemeProvider>
  );
}
