"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/hooks/use-theme";

const themePresets = [
  {
    name: "默认红",
    primary: "346.8 77.2% 49.8%",
  },
  {
    name: "天空蓝",
    primary: "199 89% 48%",
  },
  {
    name: "翡翠绿",
    primary: "142.1 76.2% 36.3%",
  },
  {
    name: "深紫色",
    primary: "262.1 83.3% 57.8%",
  },
  {
    name: "橙色",
    primary: "24.6 95% 53.1%",
  },
];

export default function SettingsPage() {
  const { theme, updateTheme } = useTheme();
  const [language, setLanguage] = useState("zh");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (primary: string) => {
    updateTheme({ primary });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // TODO: 实现语言切换逻辑
  };

  const handleNotificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotifications(e.target.checked);
    // TODO: 实现通知设置逻辑
  };

  const handleModeChange = (mode: "light" | "dark" | "system") => {
    updateTheme({ mode });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">设置</h1>

      <div className="grid gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">主题设置</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">主题色</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {themePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleThemeChange(preset.primary)}
                    className={`
                      p-4 rounded-lg border transition-all
                      ${
                        preset.primary === theme.primary
                          ? "ring-2 ring-primary"
                          : "hover:bg-accent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{
                          backgroundColor: `hsl(${preset.primary})`,
                        }}
                      />
                      <span className="text-sm">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">外观模式</label>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleModeChange("light")}
                  variant="outline"
                  className="flex-1"
                >
                  浅色
                </Button>
                <Button
                  onClick={() => handleModeChange("dark")}
                  variant="outline"
                  className="flex-1"
                >
                  深色
                </Button>
                <Button
                  onClick={() => handleModeChange("system")}
                  variant="outline"
                  className="flex-1"
                >
                  跟随系统
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
