// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let authStore = null;
  if (typeof window !== 'undefined'){
    authStore = JSON.parse(localStorage.getItem("syncMasterAuthStore"));
  }

  if (url.pathname === '/' && authStore?.state.userRole === 'ADMIN') {
    url.pathname = '/model';
    return NextResponse.rewrite(url); // 주소창 경로를 유지하면서 내부적으로 리다이렉트
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/', // "/" 경로에만 middleware를 적용합니다.
};
