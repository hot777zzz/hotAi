import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // 如果用户已登录且在登录页面，重定向到聊天页面
  if (isLoggedIn) {
    console.log("已登录");
    return NextResponse.redirect(new URL("/chat", request.url));
  } else {
    console.log("未登录");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
