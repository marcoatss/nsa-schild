"use client";

import { useTranslations } from "next-intl";

import { ProductModelEntryComponent } from "@/components/product/product-model-entry";
import { useWishlistContext } from "@/contexts/wishlist";

export interface WishlistPageEntrieListProps {}

export const WishlistPageEntrieListComponent: React.FC<
  WishlistPageEntrieListProps
> = ({}: WishlistPageEntrieListProps) => {
  const t = useTranslations("page_wishlist");

  const { entries, loading } = useWishlistContext();

  return (
    <>
      {!loading && (
        <>
          {entries.map(({ product, entryId, entry }) => (
            <div key={entryId} className="border border-border">
              <ProductModelEntryComponent
                product={product}
                entry={entry}
                showProductImage
              />
            </div>
          ))}
          {entries.length === 0 && (
            <div
              className={`
                border border-border bg-background p-4 text-sm font-medium
              `}
            >
              {t("wishlist_empty")}
            </div>
          )}
        </>
      )}
    </>
  );
};
