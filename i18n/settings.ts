export const fallbackLanguage = "en";
export const languages = [fallbackLanguage, "it"];
export const defaultNamespace = "translation";
export const cookieName = "i18next";

export function getOptions(
    language = fallbackLanguage,
    namespace = defaultNamespace
) {
    return {
        supportedLngs: languages,
        fallbackLng: fallbackLanguage,
        lng: language,
        fallbackNS: defaultNamespace,
        defaultNS: defaultNamespace,
        ns: namespace
    };
}
