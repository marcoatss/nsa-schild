import { useTranslations } from "next-intl";
import { ElementType } from "react";

import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Product, ProductModel } from "@/lib/types";

import { ProductModelConfiguratorComponent } from "./product-model-configurator";
import { ProductModelMaterialsTableComponent } from "./product-model-materials-table";
import { ProductModelTechnicalDetailsTableComponent } from "./product-model-technical-details-table";
import { ProductModelWishlistCounterComponent } from "./product-model-wishlist-counter";

export interface ProductModelProps {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  product: Product;
  productModel: ProductModel;
}

export const ProductModelComponent: React.FC<ProductModelProps> = ({
  categorySlug,
  subcategorySlug,
  productSlug,
  product,
  productModel,
}: ProductModelProps) => {
  const t = useTranslations("product");

  const { name, materials, options } = productModel;

  // Technical details table

  const technicalDetailsTable = [];

  if (productModel.weight) {
    technicalDetailsTable.push([
      t("weight"),
      productModel.weight,
      productModel.weightUnit,
    ]);
  }

  if (productModel.volume) {
    technicalDetailsTable.push([
      t("volume"),
      productModel.volume,
      productModel.volumeUnit,
    ]);
  }

  if (productModel.height) {
    technicalDetailsTable.push([
      t("height"),
      productModel.height,
      productModel.heightUnit,
    ]);
  }

  if (productModel.length) {
    technicalDetailsTable.push([
      t("length"),
      productModel.length,
      productModel.lengthUnit,
    ]);
  }

  if (productModel.depth) {
    technicalDetailsTable.push([
      t("depth"),
      productModel.depth,
      productModel.depthUnit,
    ]);
  }

  if (productModel.diameter) {
    technicalDetailsTable.push([
      t("diameter"),
      productModel.diameter,
      productModel.diameterUnit,
    ]);
  }

  if (productModel.safetyAreaLength) {
    technicalDetailsTable.push([
      t("safety_area_length"),
      productModel.safetyAreaLength,
      productModel.safetyAreaLengthUnit,
    ]);
  }

  if (productModel.safetyAreaDepth) {
    technicalDetailsTable.push([
      t("safety_area_depth"),
      productModel.safetyAreaDepth,
      productModel.safetyAreaDepthUnit,
    ]);
  }

  if (productModel.fallHeight) {
    technicalDetailsTable.push([
      t("fall_height"),
      productModel.fallHeight,
      productModel.fallHeightUnit,
    ]);
  }

  const showSide = technicalDetailsTable.length > 0 || materials.length > 0;

  const media = productModel.media ?? product.media?.[0];

  return (
    <div className="border border-border bg-background">
      <div
        className={`
          flex flex-row items-center border-b border-b-border bg-background
        `}
      >
        {media && (
          <ImageFullHeightComponent
            image={media}
            size="thumbnail"
            className="h-16 w-16 border-r border-r-border-light p-0"
          />
        )}
        <h1 className="px-4 text-xl font-bold">{name}</h1>
      </div>
      <div
        className={`
          flex flex-col

          lg:flex-row
        `}
      >
        {showSide && (
          <div
            className={`
              basis-1/2

              lg:border-r lg:border-r-border
            `}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                {technicalDetailsTable.length > 0 && (
                  <ProductModelTechnicalDetailsTableComponent
                    technicalDetailsTable={technicalDetailsTable}
                  />
                )}
                {materials.length > 0 && (
                  <ProductModelMaterialsTableComponent materials={materials} />
                )}
              </div>
              <div className="p-4">
                <ProductModelWishlistCounterComponent
                  categorySlug={categorySlug}
                  subcategorySlug={subcategorySlug}
                  productSlug={productSlug}
                  productModel={productModel}
                />
              </div>
            </div>
          </div>
        )}
        <div
          className={`
            flex flex-1 flex-col border-t border-t-border

            lg:border-t-0
          `}
        >
          {!showSide && (
            <div className="p-4 pb-0">
              <ProductModelWishlistCounterComponent
                categorySlug={categorySlug}
                subcategorySlug={subcategorySlug}
                productSlug={productSlug}
                productModel={productModel}
              />
            </div>
          )}
          <ProductModelConfiguratorComponent
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
            productSlug={productSlug}
            product={product}
            productModel={productModel}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};
