import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 从 cookie 获取 token
  const token = request.cookies.get("token")?.value;

  // 需要认证的路由
  const authRoutes = ["/chat", "/settings", "/tuning"];

  // 当前路径
  const { pathname } = request.nextUrl;

  // 如果访问需要认证的路由但没有 token,重定向到登录页
  if (authRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 如果已登录还访问登录页,重定向到首页
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: ["/chat/:path*", "/settings/:path*", "/tuning/:path*", "/login"],
};
