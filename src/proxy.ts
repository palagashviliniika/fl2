// Next.js 16+ file convention (replaces middleware.ts). Required for next-intl
// localePrefix: "always" — redirects `/` to a locale and validates locale segments.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
