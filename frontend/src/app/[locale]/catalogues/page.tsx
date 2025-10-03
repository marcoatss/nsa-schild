import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { CatalogueBriefComponent } from "@/components/catalogue/catalogue_brief";
import { SectionComponent } from "@/components/section";
import { queryListCatalogues } from "@/lib/query-list-catalogues.helper";

export default async function CataloguesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_catalogues");

  const { catalogues } = await getData(locale);

  return (
    <>
      <SectionComponent className="p-14">
        <h1 className="w-full text-center text-6xl font-black">
          {t("catalogues")}
        </h1>
      </SectionComponent>
      {catalogues.map((catalogue) => (
        <SectionComponent key={catalogue.id}>
          <CatalogueBriefComponent catalogue={catalogue} />
        </SectionComponent>
      ))}
    </>
  );
}

async function getData(locale: string) {
  const catalogues = await queryListCatalogues(locale);

  return { catalogues };
}
