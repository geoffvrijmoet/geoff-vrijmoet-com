import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPrivateRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware logic for the API routes
  if (req.nextUrl.pathname === "/api/admin/me") {
    return NextResponse.next();
  }

  // Check if the route is public or protected
  if (!isPrivateRoute(req)) {
    // Allow public routes to proceed without authentication
    return NextResponse.next();
  }
  
  // Protect all non-public routes
  const authObject = await auth.protect();
  const { userId } = authObject;
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  
  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, videos, fonts, css, js, etc. (static assets)
     * - /api/webhooks/clerk (Clerk webhooks)
     */
    "/api/((?!webhooks/clerk).*)", // Ensure middleware runs for all API routes except Clerk webhooks
    '/((?!_next/static|_next/image|favicon.ico|images/|videos/|fonts/|css/|js/).*)',
  ],
};