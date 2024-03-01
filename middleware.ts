import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n";

export default createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"]
};
