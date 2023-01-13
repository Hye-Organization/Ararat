import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtVerify, importJWK} from "jose";
import { errorResponse } from "./lib/responses";


async function verifyToken(token : string) {
  let allowed;
  try {
    // @ts-ignore
    const secret = new TextEncoder().encode(process.env["ENC_KEY"]); 
        // @ts-ignore
       allowed = await jwtVerify(token, secret, {
      algorithms: ["HS256"]
    })
  } catch (error) {
    console.log(error)
    allowed = false;
  }
  return allowed; 
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!request.headers.get("Authorization") && request.cookies.has("authorization")) {
      request.headers.set("Authorization", `Bearer ${request.cookies.get("authorization")?.value}`)
    }
    // @ts-ignore
    let allowed = await verifyToken(request.cookies.has("authorization") ? request.cookies.get("authorization") : request.headers.has("Authorization") ? request.headers.get("Authorization")?.split(" ")[1] : "");
    if (!allowed) return NextResponse.json(errorResponse(400, 400, "You are not allowed to access this resource"), {
      status: 401
    })
  }
  if (!request.headers.get("Authorization") && !request.cookies.has("authorization")) {
    if (!request.cookies.has("authorization")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * 
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/v1/auth|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}