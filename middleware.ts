import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: add authentication check for admin routes
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
