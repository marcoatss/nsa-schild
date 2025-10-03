"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { ButtonComponent } from "@/components/button";
import { ProductModelEntryPickerComponent } from "@/components/product/product-model-entry/product-model-entry-picker";
import { ProductModelEntryTextareaComponent } from "@/components/product/product-model-entry/product-model-entry-textarea";
import { useWishlistContext } from "@/contexts/wishlist";
import { wishlistActionAddEntry } from "@/contexts/wishlist/wishlist.reducer";
import { Product, ProductModel, ProductModelOption } from "@/lib/types";

import { ProductModelConfiguratorOptionGroupsComponent } from "./product-model-configurator-option-groups";

export interface ProductModelConfiguratorProps {
  className?: string;
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  product: Product;
  productModel: ProductModel;
  options: ProductModelOption[];
}

export const ProductModelConfiguratorComponent = ({
  className,
  categorySlug,
  subcategorySlug,
  productSlug,
  product,
  productModel,
  options,
}: ProductModelConfiguratorProps) => {
  const t = useTranslations("page_product");

  const { dispatch: wishlistDispatch } = useWishlistContext();

  const router = useRouter();

  /**************************/
  /********** STATE *********/
  /**************************/

  const [selectedOptions, setSelectedOptions] = useState<
    { name: string; value: string | null }[]
  >([]);

  const [warnings, setWarnings] = useState<{ [name: string]: boolean }>({});

  const [count, setCount] = useState<number>(1);

  const [notes, setNotes] = useState<string>("");

  /**************************************************/
  /********** INIT, UPDATE AND RESET STATE **********/
  /**************************************************/

  const resetSelectedOptions = useCallback(
    () =>
      setSelectedOptions(options.map(({ name }) => ({ name, value: null }))),
    [options],
  );

  const resetWarnings = useCallback(
    () =>
      setWarnings(() =>
        options.reduce(
          (acc, { name }) => Object.assign({}, acc, { [name]: false }),
          {},
        ),
      ),
    [options],
  );

  const updateWarnings = useCallback(
    () =>
      setWarnings(() =>
        selectedOptions.reduce(
          (acc, { name, value }) =>
            Object.assign({}, acc, { [name]: value === null }),
          {},
        ),
      ),
    [selectedOptions],
  );

  useEffect(() => {
    resetSelectedOptions();
    resetWarnings();
  }, [resetSelectedOptions, resetWarnings]);

  const handleSelectedOptionsChange = useCallback(
    (name: string, value: string | null) =>
      setSelectedOptions((prev) =>
        prev.map(({ name: currentName, value: currentValue }) =>
          currentName === name
            ? { name, value }
            : { name: currentName, value: currentValue },
        ),
      ),
    [],
  );

  /******************************/
  /********** HANDLERS **********/
  /******************************/

  const handleWishlistButtonClick = useCallback(() => {
    const submittable = selectedOptions.every(({ value }) => value !== null);

    updateWarnings();

    if (!submittable) return;

    const productWishlistEntryId = v4();

    wishlistDispatch(
      wishlistActionAddEntry({
        product,
        productModel,
        productWishlistEntryId,
        options: selectedOptions as { name: string; value: string }[],
        count,
        notes,
      }),
    );

    resetSelectedOptions();
    resetWarnings();
    setCount(1);
    setNotes("");

    toast(t("model_success_title", { productName: product.name }), {
      action: {
        label: t("model_success_action"),
        onClick: () => router.push(`#entry-${productWishlistEntryId}`),
      },
      description: t("model_success_description"),
      closeButton: true,
    });
  }, [
    t,
    selectedOptions,
    wishlistDispatch,
    productModel,
    product,
    updateWarnings,
    resetWarnings,
    resetSelectedOptions,
    count,
    notes,
    router,
  ]);

  const handleMinusButtonClick = useCallback(
    () => setCount((prev) => prev - 1),
    [],
  );

  const handlePlusButtonClick = useCallback(
    () => setCount((prev) => prev + 1),
    [],
  );

  const handlePickerChange = useCallback(
    (count: number) => setCount(count),
    [],
  );

  const handleNotesChange = useCallback((value: string) => setNotes(value), []);

  return (
    <div
      className={`
        flex flex-col justify-between gap-6 p-4

        ${className}
      `}
    >
      <div className="flex flex-col gap-6">
        {options.length > 0 && (
          <ProductModelConfiguratorOptionGroupsComponent
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
            productSlug={productSlug}
            productModel={productModel}
            availableOptions={options}
            selectedOptions={selectedOptions}
            onChange={handleSelectedOptionsChange}
            warnings={warnings}
          />
        )}
        <ProductModelEntryTextareaComponent
          value={notes}
          placeholder={t("model_notes_placeholder")}
          onChange={handleNotesChange}
        />
      </div>
      <div className="flex flex-col gap-6">
        <ProductModelEntryPickerComponent
          count={count}
          onMinusButtonClick={handleMinusButtonClick}
          onPlusButtonClick={handlePlusButtonClick}
          onChange={handlePickerChange}
        />
        <ButtonComponent variant="accent" onClick={handleWishlistButtonClick}>
          {t("model_action_add")}
        </ButtonComponent>
      </div>
    </div>
  );
};
