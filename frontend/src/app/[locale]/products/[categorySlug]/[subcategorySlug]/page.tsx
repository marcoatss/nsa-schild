import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WithContext, BreadcrumbList as BreadcrumbListLd } from "schema-dts";

import { GridComponent } from "@/components/grids/grid";
import { Link } from "@/components/navigation";
import { ProductBriefComponent } from "@/components/product/product-brief";
import { ProductBriefLargeComponent } from "@/components/product/product-brief-large";
import { SectionComponent } from "@/components/section";
import {
  getCategoryPageUrl,
  getProductsPageUrl,
  getSubcategoryPageUrl,
} from "@/lib/get-url";
import { queryGetCategory } from "@/lib/query-get-category.helper";
import { queryGetSubcategory } from "@/lib/query-get-subcategory.helper";
import { queryListProducts } from "@/lib/query-list-products.helper";

import { ProductsBreadcrumbComponent } from "./components/products-breadcrumb";

export default async function ProductsPage({
  params: { locale, categorySlug, subcategorySlug },
}: {
  params: {
    locale: string;
    categorySlug: string;
    subcategorySlug: string;
  };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_products");

  const category = await queryGetCategory(locale, categorySlug);
  const subcategory = await queryGetSubcategory(locale, subcategorySlug);
  const products = await queryListProducts(
    locale,
    categorySlug,
    subcategorySlug,
  );

  if (!category || !subcategory || !products) {
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
      {
        "@type": "ListItem",
        position: 3,
        name: subcategory.name,
        item: getSubcategoryPageUrl({
          locale,
          full: true,
          categorySlug,
          subcategorySlug,
        }),
      },
    ],
  };

  const gridItems = products.map((product) => (
    <div
      key={product.slug}
      className={`
        ${
          product.large
            ? `
              col-span-1

              sm:col-span-2
            `
            : "col-span-1"
        }
      `}
    >
      <Link
        href={`/products/${category.slug}/${subcategory.slug}/${product.slug}`}
      >
        {product.large ? (
          <ProductBriefLargeComponent product={product} />
        ) : (
          <ProductBriefComponent product={product} />
        )}
      </Link>
    </div>
  ));

  return (
    <>
      <div
        className={`
          sticky top-[var(--header-xs-height)] z-40

          sm:top-[var(--header-height)]
        `}
      >
        <SectionComponent>
          <ProductsBreadcrumbComponent
            category={category}
            subcategory={subcategory}
          />
        </SectionComponent>
      </div>
      <SectionComponent>
        <div className="p-14">
          <h1 className="w-full text-center text-6xl font-black">
            {t("title", { subcategoryName: subcategory.name })}
          </h1>
        </div>
      </SectionComponent>
      <SectionComponent>
        <div
          className={`
            hidden

            lg:block
          `}
        >
          <GridComponent cols={4}>{gridItems}</GridComponent>
        </div>
        <div
          className={`
            hidden

            lg:hidden

            md:block
          `}
        >
          <GridComponent cols={3}>{gridItems}</GridComponent>
        </div>
        <div
          className={`
            hidden

            md:hidden

            sm:block
          `}
        >
          <GridComponent cols={2}>{gridItems}</GridComponent>
        </div>
        <div className="sm:hidden">
          <GridComponent cols={1}>{gridItems}</GridComponent>
        </div>
      </SectionComponent>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
    </>
  );
}
