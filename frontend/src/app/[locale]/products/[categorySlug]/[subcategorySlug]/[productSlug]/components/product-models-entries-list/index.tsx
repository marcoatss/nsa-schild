"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { ProductModelEntryComponent } from "@/components/product/product-model-entry";
import { useWishlistContext } from "@/contexts/wishlist";

export interface ProductModelsEntriesListProps {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
}

export const ProductModelsEntriesListComponent: React.FC<
  ProductModelsEntriesListProps
> = ({
  categorySlug,
  subcategorySlug,
  productSlug,
}: ProductModelsEntriesListProps) => {
  const t = useTranslations("page_product");

  const { state: wishlist, loading } = useWishlistContext();

  const product = useMemo(
    () =>
      wishlist.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]
        ?.product,
    [categorySlug, subcategorySlug, productSlug, wishlist],
  );

  const entries = useMemo(
    () =>
      Object.values(
        wishlist.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]
          ?.models ?? {},
      )
        .map((model) => Object.values(model.entries))
        .flat(),
    [categorySlug, subcategorySlug, productSlug, wishlist],
  );

  return (
    <>
      <div className="border-b border-b-border bg-foreground px-8 py-4">
        <h1 className="text-center text-sm font-bold uppercase text-white">
          {t("entries")}
        </h1>
      </div>
      <div
        className={`
          mb-[-1px] flex flex-col gap-4 border-b border-b-border
          bg-foreground/20 px-4 py-5

          lg:gap-8 lg:px-8 lg:py-10
        `}
      >
        {!loading && (
          <>
            {entries.map((entry) => (
              <div
                id={`entry-${entry.id}`}
                key={entry.id}
                className={`
                  scroll-mt-[calc(var(--header-height)+var(--breadcrumb-height)+2rem)]
                  border border-border
                `}
              >
                <ProductModelEntryComponent entry={entry} product={product} />
              </div>
            ))}
            {entries.length === 0 && (
              <div
                className={`
                  border border-border bg-background p-4 text-sm font-medium
                `}
              >
                {t("entries_empty")}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
