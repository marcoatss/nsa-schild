import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WithContext, BreadcrumbList as BreadcrumbListLd } from "schema-dts";

import { SectionComponent } from "@/components/section";
import { SubcategoryBriefComponent } from "@/components/subcategory/subcategory_brief";
import { getCategoryPageUrl, getProductsPageUrl } from "@/lib/get-url";
import { queryGetCategory } from "@/lib/query-get-category.helper";
import { queryListSubcategories } from "@/lib/query-list-subcategories.helper";

import { SubcategoriesBreadcrumbComponent } from "./components/subcategories-breadcrumb";

export default async function SubcategoriesPage({
  params: { locale, categorySlug },
}: {
  params: {
    locale: string;
    categorySlug: string;
  };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_subcategories");

  const category = await queryGetCategory(locale, categorySlug);
  const subcategories = await queryListSubcategories(locale, categorySlug);

  if (!category || !subcategories) {
    notFound();
  }

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
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: getCategoryPageUrl({ locale, full: true, categorySlug }),
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
          <SubcategoriesBreadcrumbComponent category={category} />
        </SectionComponent>
      </div>
      <SectionComponent>
        <div className="p-14">
          <h1 className="w-full text-center text-6xl font-black">
            {t("title", { categoryName: category.name })}
          </h1>
        </div>
      </SectionComponent>
      {subcategories.map((subcategory) => (
        <SectionComponent key={subcategory.slug}>
          <SubcategoryBriefComponent
            category={category}
            subcategory={subcategory}
          />
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
