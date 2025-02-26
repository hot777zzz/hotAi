import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const isLoginPage = request.nextUrl.pathname === '/login';

  // 如果用户未登录且不在登录页面，重定向到登录页
  if (!isLoggedIn && !isLoginPage && !request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 如果用户已登录且在登录页面，重定向到聊天页面
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};