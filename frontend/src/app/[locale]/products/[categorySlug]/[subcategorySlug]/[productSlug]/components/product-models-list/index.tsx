import { useTranslations } from "next-intl";

import { ProductModelComponent } from "@/components/product/product-model";
import { Product, ProductModel } from "@/lib/types";

export interface ProductModelsListProps {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  product: Product;
}

export const ProductModelsListComponent: React.FC<ProductModelsListProps> = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  product,
}: ProductModelsListProps) => {
  const t = useTranslations("page_product");

  return (
    <>
      <div className="border-b border-b-border bg-foreground px-8 py-4">
        <h1 className="text-center text-sm font-bold uppercase text-white">
          {t("models")}
        </h1>
      </div>
      <div
        className={`
          flex flex-col gap-4 border-b border-b-border bg-foreground/20 px-4
          py-5

          lg:gap-8 lg:px-8 lg:py-10
        `}
      >
        {product.models.map((model: ProductModel) => (
          <div
            key={model.id}
            id={`model-${model.id}`}
            className={`
              scroll-mt-[calc(var(--header-height)+var(--breadcrumb-height)+2rem)]
            `}
          >
            <ProductModelComponent
              categorySlug={categorySlug}
              subcategorySlug={subcategorySlug}
              productSlug={productSlug}
              product={product}
              productModel={model}
            />
          </div>
        ))}
      </div>
    </>
  );
};
