import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLanguage, languages, cookieName } from "./i18n/settings";
import { withLocalization } from "./middlewares/withLocalization";

acceptLanguage.languages(languages);
export const config = {
    matcher: ["/((?!_next/static|_next/image|assets|favicon.ico|sw.js).*)"]
};

export function middleware(request: NextRequest): NextResponse {
    try {
        withLocalization(request);
    } catch (e) {
        if (e instanceof NextResponse) return e;
        throw e;
    }
    return NextResponse.next();
}
