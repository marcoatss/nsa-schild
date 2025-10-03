import { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { BreadcrumbList as BreadcrumbListLd, WithContext } from "schema-dts";

import { CarouselComponent } from "@/components/carousel";
import { Layout2x1StickyComponent } from "@/components/layouts/layout-2x1-sticky";
import { SectionComponent } from "@/components/section";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import {
  getCategoryPageUrl,
  getProductPageUrl,
  getProductsPageUrl,
  getSubcategoryPageUrl,
} from "@/lib/get-url";
import { queryGetProduct } from "@/lib/query-get-product.helper";

import { ProductBreadcrumbComponent } from "./components/product-breadcrumb";
import { ProductFilesComponent } from "./components/product-files";
import { ProductModelsEntriesListComponent } from "./components/product-models-entries-list";
import { ProductModelsListComponent } from "./components/product-models-list";

interface Props {
  params: {
    locale: string;
    categorySlug: string;
    subcategorySlug: string;
    productSlug: string;
  };
}

export async function generateMetadata({
  params: { categorySlug, subcategorySlug, productSlug, locale },
}: Props): Promise<Metadata> {
  const product = await queryGetProduct(
    categorySlug,
    subcategorySlug,
    productSlug,
    locale,
  );

  return {
    title: `${product.name}, ${product.subcategory.name}, ${product.category.name} - Schild Einrichtung`,
    description: product.brief,
  };
}

export default async function ProductPage({
  params: { locale, categorySlug, subcategorySlug, productSlug },
}: Props) {
  unstable_setRequestLocale(locale);

  const product = await queryGetProduct(
    categorySlug,
    subcategorySlug,
    productSlug,
    locale,
  );

  if (!product) {
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
        name: product.category.name,
        item: getCategoryPageUrl({ locale, full: true, categorySlug }),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.subcategory.name,
        item: getSubcategoryPageUrl({
          locale,
          full: true,
          categorySlug,
          subcategorySlug,
        }),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: getProductPageUrl({
          locale,
          full: true,
          categorySlug,
          subcategorySlug,
          productSlug,
        }),
      },
    ],
  };

  return (
    <>
      <SectionComponent>
        <div
          className={`
            border-b border-b-border

            md:hidden
          `}
        >
          <ProductBreadcrumbComponent product={product} />
        </div>
        <Layout2x1StickyComponent
          nth1={
            <div
              className={`
                h-[calc(100dvh-var(--header-xs-height)-var(--breadcrumb-height))]

                md:h-[calc(100vh-var(--header-height))]

                sm:h-[calc(100vh-var(--header-height)-var(--breadcrumb-height))]
              `}
            >
              <CarouselComponent
                items={product.media.map((image) => ({
                  type: "image",
                  image,
                }))}
              />
            </div>
          }
          nth2={
            <>
              <div
                className={`
                  hidden border-b border-b-border

                  md:block
                `}
              >
                <ProductBreadcrumbComponent product={product} />
              </div>
              <div
                className={`
                  flex flex-col gap-8 border-b border-b-border px-8 py-10
                `}
              >
                <h1 className="text-6xl font-black">{product.name}</h1>
                <TextParagraphBigComponent content={product.description} />
              </div>
              <ProductModelsListComponent
                categorySlug={categorySlug}
                subcategorySlug={subcategorySlug}
                productSlug={productSlug}
                product={product}
              />
              <ProductModelsEntriesListComponent
                categorySlug={categorySlug}
                subcategorySlug={subcategorySlug}
                productSlug={productSlug}
              />
              {product.files.length > 0 && (
                <ProductFilesComponent files={product.files} />
              )}
            </>
          }
        />
      </SectionComponent>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
    </>
  );
}
