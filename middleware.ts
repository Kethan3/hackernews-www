import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const cookie = getSessionCookie(request);

  if (!cookie) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  return NextResponse.next();
};

export default middleware;
export const config = {
  matcher: ["/user",],
};