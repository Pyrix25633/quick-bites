import Error from "./Error";
import { getTranslations } from "next-intl/server";

export default async function NotFoundError() {
    const t = await getTranslations("components.errors.not-found");
    return <Error code={t("code")} description={t("description")}></Error>;
}
