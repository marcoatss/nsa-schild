import LinkIcon from "@heroicons/react/24/outline/LinkIcon";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Link } from "@/components/navigation";
import { useWishlistContext } from "@/contexts/wishlist";
import {
  wishlistActionDeleteEntry,
  wishlistActionUpdateEntry,
} from "@/contexts/wishlist/wishlist.reducer";
import { Product, WishlistEntry } from "@/lib/types";

import { ProductModelEntryOptionsTableComponent } from "./product-model-entry-options-table";
import { ProductModelEntryPickerComponent } from "./product-model-entry-picker";
import { ProductModelEntryRemoveButtonComponent } from "./product-model-entry-remove-button";
import { ProductModelEntryTextareaComponent } from "./product-model-entry-textarea";

export interface ProductModelEntryProps {
  product: Product;
  entry: WishlistEntry;
  showProductImage?: boolean;
}

export const ProductModelEntryComponent: React.FC<ProductModelEntryProps> = ({
  product,
  showProductImage = false,
  entry: { id: productWishlistEntryId, productModel, options },
}: ProductModelEntryProps) => {
  const t = useTranslations("page_product");

  const { dispatch, state: wishlist } = useWishlistContext();

  const wishlistCount = useMemo(
    () =>
      wishlist.products?.[product.category.slug]?.[product.subcategory.slug]?.[
        product.slug
      ]?.models?.[productModel.id]?.entries?.[productWishlistEntryId]?.count ??
      0,
    [product, productModel, productWishlistEntryId, wishlist],
  );

  const notes = useMemo(
    () =>
      wishlist.products?.[product.category.slug]?.[product.subcategory.slug]?.[
        product.slug
      ]?.models?.[productModel.id]?.entries?.[productWishlistEntryId]?.notes,
    [product, productModel, productWishlistEntryId, wishlist],
  );

  const handleMinusButtonClick = useCallback(() => {
    if (wishlistCount < 2) return;

    dispatch(
      wishlistActionUpdateEntry({
        product,
        productModel,
        productWishlistEntryId,
        count: wishlistCount - 1,
      }),
    );
  }, [product, productModel, productWishlistEntryId, dispatch, wishlistCount]);

  const handlePlusButtonClick = useCallback(
    () =>
      dispatch(
        wishlistActionUpdateEntry({
          product,
          productModel,
          productWishlistEntryId,
          count: wishlistCount + 1,
        }),
      ),
    [product, productModel, productWishlistEntryId, dispatch, wishlistCount],
  );

  const handlePickerChange = useCallback(
    (count: number) =>
      dispatch(
        wishlistActionUpdateEntry({
          product,
          productModel,
          productWishlistEntryId,
          count,
        }),
      ),
    [dispatch, product, productModel, productWishlistEntryId],
  );

  const handleDeleteButtonClick = useCallback(
    () =>
      dispatch(
        wishlistActionDeleteEntry({
          categorySlug: product.category.slug,
          subcategorySlug: product.subcategory.slug,
          productSlug: product.slug,
          productModel,
          productWishlistEntryId,
        }),
      ),
    [product, productModel, productWishlistEntryId, dispatch],
  );

  const handleTextareaChange = useCallback(
    (value: string) =>
      dispatch(
        wishlistActionUpdateEntry({
          product,
          productModel,
          productWishlistEntryId,
          notes: value,
        }),
      ),
    [product, productModel, productWishlistEntryId, dispatch],
  );

  const handleOptionChange = useCallback(
    (name: string, value: string) => {
      dispatch(
        wishlistActionUpdateEntry({
          product,
          productModel,
          productWishlistEntryId,
          options: options.map(({ name: currentName, value: currentValue }) =>
            currentName === name
              ? { name, value }
              : { name: currentName, value: currentValue },
          ),
        }),
      );
    },
    [product, productModel, productWishlistEntryId, options, dispatch],
  );

  return (
    <div
      className={`
        flex flex-col items-stretch overflow-hidden bg-background

        sm:flex-row
      `}
    >
      {showProductImage && (
        <div
          className={`
            basis-1/2 border-b border-b-border

            md:basis-1/3

            sm:border-b-0 sm:border-r sm:border-r-border
          `}
        >
          <ImageFullHeightComponent
            image={productModel.media ?? product?.media?.[0]}
            size="medium"
          />
        </div>
      )}
      <div className="flex flex-grow flex-col">
        <div className="flex items-center gap-2 border-b border-b-border p-4">
          <h1 className="text-xl font-bold">{productModel.name}</h1>
          <Link
            className={`
              rounded-full border border-transparent p-2

              active:bg-foreground/40

              hover:border-border-light hover:bg-foreground/20
            `}
            href={`/products/${product.category.slug}/${product.subcategory.slug}/${product.slug}#model-${productModel.id}`}
          >
            <LinkIcon className="h-5 w-5" />
          </Link>
        </div>
        <div
          className={`
            flex flex-grow flex-col

            lg:flex-row
          `}
        >
          <div
            className={`
              mb-[-1px] basis-1/2 border-r-border

              lg:border-b-0 lg:border-r
            `}
          >
            <h1
              className={`
                border-b border-b-border-light p-4 text-sm font-bold uppercase
              `}
            >
              {t("entries_options")}
            </h1>
            <ProductModelEntryOptionsTableComponent
              availableOptions={productModel.options}
              selectedOptions={options}
              onOptionChange={handleOptionChange}
            />
          </div>
          <div className="flex basis-1/2 flex-col justify-between gap-4 p-4">
            <div className="flex flex-col gap-4">
              <ProductModelEntryTextareaComponent
                value={notes}
                placeholder={t("entries_notes_placeholder")}
                onChange={handleTextareaChange}
              />
              <ProductModelEntryPickerComponent
                onPlusButtonClick={handlePlusButtonClick}
                onMinusButtonClick={handleMinusButtonClick}
                onChange={handlePickerChange}
                count={wishlistCount}
              />
            </div>
            <ProductModelEntryRemoveButtonComponent
              onClick={handleDeleteButtonClick}
              text={t("entries_action_remove")}
              confirmationText={t("entries_action_remove_confirmation")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
