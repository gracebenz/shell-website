import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase-proxy";

const ALLOWED_EMAILS = [
  "gracebenz2@gmail.com",
  "shelltu118@gmail.com",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const { response, user } = await updateSession(request);

  if (!user || !ALLOWED_EMAILS.includes(user.email ?? "")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: "/admin/:path*",
};
