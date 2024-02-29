import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLanguage, languages, cookieName } from "../i18n/settings";

export function withLocalization(request: NextRequest): void {
    if (request.nextUrl.pathname.match(/\/api\//)) return;

    let language;
    const cookie = request.cookies.get(cookieName);
    if (cookie != undefined) language = acceptLanguage.get(cookie.value);
    if (!language)
        language = acceptLanguage.get(request.headers.get("Accept-Language"));
    if (!language) language = fallbackLanguage;

    const selectedLanguageMatch = request.nextUrl.pathname.match(/\/(\w\w)\//);
    const selectedLanguage: string | null =
        selectedLanguageMatch == null ? null : selectedLanguageMatch[1];

    if (!languages.some((l) => l == selectedLanguage)) {
        throw NextResponse.redirect(
            new URL(
                selectedLanguage != null
                    ? `${request.nextUrl.pathname.replace(
                          selectedLanguage,
                          language
                      )}`
                    : `${language}${request.nextUrl.pathname}`,
                request.url
            )
        );
    }
}
