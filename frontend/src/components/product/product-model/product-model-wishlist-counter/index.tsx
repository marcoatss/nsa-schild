"use client";

import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useWishlistContext } from "@/contexts/wishlist";
import { ProductModel } from "@/lib/types";

export interface ProductModelWishlistCounterProps {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  productModel: ProductModel;
}

export const ProductModelWishlistCounterComponent = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  productModel,
}: ProductModelWishlistCounterProps) => {
  const t = useTranslations("page_product");

  const { state: wishlist } = useWishlistContext();

  const count = useMemo(
    () =>
      wishlist.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]
        ?.models?.[productModel.id]?.count ?? 0,
    [wishlist, categorySlug, subcategorySlug, productSlug, productModel],
  );

  return (
    <div
      className={`flex items-center border border-border-light bg-foreground/10`}
    >
      <div
        className={`
          flex flex-col items-center justify-center gap-1 self-stretch border-r
          border-r-border-light p-2
        `}
      >
        <HeartIcon className="h-6 w-6" />
        <span className="font-bold">{count}</span>
      </div>
      <div className="px-4 py-2 font-medium">
        {t("model_wishlist_counter", { count })}
      </div>
    </div>
  );
};
