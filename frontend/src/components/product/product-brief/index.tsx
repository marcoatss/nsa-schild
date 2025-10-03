import { useTranslations } from "next-intl";

import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Product } from "@/lib/types";

export interface ProductBriefProps {
  className?: string;
  product: Product;
}

export const ProductBriefComponent: React.FC<ProductBriefProps> = ({
  className,
  product: { models, media, name, brief },
}: ProductBriefProps) => {
  const t = useTranslations("product");

  const details = [t("models_count", { count: models.length })];

  return (
    <div
      className={`
        group flex flex-col

        ${className}
      `}
    >
      <div className="relative overflow-hidden">
        <ImageFullHeightComponent image={media?.[0]} size="medium" />
        <div className="absolute top-0 flex gap-1 pl-3 pt-3">
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
      </div>
      <div
        className={`
          flex flex-1 flex-col justify-between border-t border-t-border-light
          p-6
        `}
      >
        <div>
          <h1 className="mb-1 text-sm font-bold uppercase">{name}</h1>
          <p className="mb-3 font-medium">{brief}</p>
        </div>
        <div className="flex gap-2 text-right">
          {details.map((detail) => (
            <span
              key={detail}
              className={`
                inline-block border border-border-light bg-foreground/10 px-2
                py-1 text-xs font-semibold
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
