"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/chat";
      } else {
        setError(data.message || "登录失败");
      }
    } catch (e) {
      console.log(e);
      setError("登录失败");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">登录</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </div>
    </div>
  );
}
