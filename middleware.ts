import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./src/navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en"
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
