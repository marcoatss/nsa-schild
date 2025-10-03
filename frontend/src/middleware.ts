import createMiddleware from "next-intl/middleware";

import { locales, localePrefix } from "./i18n";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|de)/:path*"],
};
