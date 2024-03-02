import Error from "./Error";
import { getTranslations } from "next-intl/server";

export default async function BadRequestError() {
    const t = await getTranslations("components.errors.bad-request");
    return <Error code={t("code")} description={t("description")}></Error>;
}
