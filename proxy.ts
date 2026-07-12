import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/proxy";

export async function proxy(request: NextRequest) {
  const { supabase, response } = updateSession(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/my-bucket"];

  const authRoutes = ["/login", "/register"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/my-bucket", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/my-bucket/:path*",
    "/login",
    "/register",
  ],
};