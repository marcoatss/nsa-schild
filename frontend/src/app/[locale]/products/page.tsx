import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WithContext, BreadcrumbList as BreadcrumbListLd } from "schema-dts";

import { CategoryBriefComponent } from "@/components/category/category_brief";
import { SectionComponent } from "@/components/section";
import { getProductsPageUrl } from "@/lib/get-url";
import { queryListCategories } from "@/lib/query-list-categories.helper";

import { CategoriesBreadcrumbComponent } from "./components/categories-breadcrumb";

export default async function CategoriesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_categories");
  const categories = await queryListCategories(locale);

  /* SEO structured data for breadcrumb */
  const jsonLdBreadcrumb: WithContext<BreadcrumbListLd> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: getProductsPageUrl({ locale, full: true }),
      },
    ],
  };

  return (
    <>
      <div
        className={`
          sticky top-[var(--header-xs-height)] z-40

          sm:top-[var(--header-height)]
        `}
      >
        <SectionComponent>
          <CategoriesBreadcrumbComponent />
        </SectionComponent>
      </div>
      <SectionComponent>
        <div className="p-14">
          <h1 className="w-full text-center text-6xl font-black">
            {t("title")}
          </h1>
        </div>
      </SectionComponent>
      {categories.map((category) => (
        <SectionComponent key={category.slug}>
          <CategoryBriefComponent category={category} />
        </SectionComponent>
      ))}
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
    </>
  );
}
