"use client";

import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useTranslations } from "next-intl";

import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { useWishlistContext } from "@/contexts/wishlist";
import { Product } from "@/lib/types";

export interface ProductBriefLargeProps {
  product: Product;
}

export const ProductBriefLargeComponent: React.FC<ProductBriefLargeProps> = ({
  product: { models, media, name, brief, category, subcategory, slug },
}: ProductBriefLargeProps) => {
  const t = useTranslations("product");

  const { state: wishlist } = useWishlistContext();

  const details = [t("models_count", { count: models.length })];

  return (
    <div className="group flex h-full">
      <div className="relative basis-2/3 overflow-hidden">
        <ImageFullHeightComponent image={media?.[0]} size="medium" />
        <div className="absolute top-0 flex gap-1 p-2">
          {[].map((tag) => (
            <span
              key={tag}
              className={`
                inline-block bg-foreground px-2 py-1 text-sm font-bold uppercase
                text-white
              `}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-0 flex gap-1 pb-3 pl-3">
          <div
            className={`
              flex items-center gap-1 border border-border-light
              bg-foreground/10 px-2 py-1
            `}
          >
            <HeartIcon className="h-6 w-6" />
            <span className="text-sm font-bold">
              {
                wishlist.products?.[category.slug]?.[subcategory.slug]?.[slug]
                  ?.count
              }
            </span>
          </div>
        </div>
      </div>
      <div
        className={`
          flex basis-1/3 flex-col items-stretch justify-between border-l
          border-l-border-light p-6
        `}
      >
        <div>
          <h1 className="mb-1 text-sm font-bold uppercase">{name}</h1>
          <p className="mb-3 font-medium">{brief}</p>
        </div>
        <div className="flex flex-row-reverse gap-2 text-right">
          {details.map((detail) => (
            <span
              key={detail}
              className={`
                inline-block border border-border-light bg-foreground/10 px-2
                py-1 text-sm font-semibold
              `}
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
