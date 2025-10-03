import ArrowsPointingOutIcon from "@heroicons/react/24/outline/ArrowsPointingOutIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Link } from "@/components/navigation";
import { ProductBriefComponent } from "@/components/product/product-brief";
import { ScrollAreaComponent } from "@/components/scroll-area";
import { Product } from "@/lib/types";

export interface HeaderNavigationPopupProps {
  subcategories: {
    name: string;
    slug: string;
    products: Product[];
  }[];
  categorySlug: string;
  onClose: () => void;
}

export const HeaderNavigationPopupComponent: React.FC<
  HeaderNavigationPopupProps
> = ({ subcategories, categorySlug, onClose }: HeaderNavigationPopupProps) => {
  const t = useTranslations("header");

  /***************************/
  /********** STATE **********/
  /***************************/

  const [subcategorySlug, setSubcategorySlug] = useState<string | null>(
    subcategories?.[0]?.slug,
  );

  const products = useMemo(() => {
    if (subcategories === null || subcategories.length === 0) {
      return null;
    }

    if (subcategorySlug === null) {
      return subcategories[0]?.products;
    }

    return (
      subcategories.find(({ slug }) => slug === subcategorySlug)?.products ??
      subcategories[0]?.products
    );
  }, [subcategories, subcategorySlug]);

  /****************************/
  /********** EFFECTS *********/
  /****************************/

  useEffect(
    () => setSubcategorySlug(subcategories?.[0]?.slug),
    [subcategories],
  );

  /******************************/
  /********** CALLBACKS *********/
  /******************************/

  const handleSubcategoryClick = useCallback((slug: string) => {
    setSubcategorySlug(slug);
  }, []);

  /*************************/
  /********** JSX **********/
  /*************************/

  const subcategoriesButtons = [
    ...subcategories.map(({ slug, name }) => (
      <div
        key={slug}
        className={`
          group relative mb-2 cursor-pointer select-none overflow-hidden border
          border-border-light px-4 py-3

          [&:not(:last-child)]:mb-4

          active:after:top-0 active:after:h-full

          after:absolute after:left-0 after:top-full after:z-10 after:h-[1px]
          after:w-full after:bg-foreground after:transition-[height,top]

          hover:after:top-[calc(100%-5px)] hover:after:h-[5px]

          ${slug === subcategorySlug && `after:!top-0 after:!h-full`}
        `}
      >
        <span
          className={`
            relative z-50 block w-full truncate text-xl font-semibold
            transition-colors

            group-active:text-white

            ${slug === subcategorySlug && `!text-white`}
          `}
          onClick={() => handleSubcategoryClick(slug)}
        >
          {name}
        </span>
      </div>
    )),
    <Link
      key={`${categorySlug}-all`}
      href={`/products/${categorySlug}`}
      onClick={() => onClose()}
      className="relative"
    >
      <div
        className={`
          flex cursor-pointer select-none justify-center gap-3 border
          border-border-light px-4 py-3

          hover:bg-background/[.65]
        `}
      >
        <ArrowsPointingOutIcon className="h-6 w-6" />
        <span className="relative top-[3px] text-sm font-bold uppercase">
          {t("expand_subcategories")}
        </span>
      </div>
    </Link>,
  ];

  return (
    <>
      <motion.div
        layout
        className={`
          z-[100] h-[calc(100dvh-var(--header-height)-var(--section-gap-width))]
          w-full bg-background/50 px-[var(--section-gap-width)] backdrop-blur

          md:h-fit md:border-b md:border-b-border
        `}
      >
        <div
          className={`
            mx-auto flex max-w-screen-2xl items-stretch border-x border-x-border
          `}
        >
          <motion.div
            layout
            className={`
              inline-block
              h-[calc(100dvh-var(--header-height)-var(--section-gap-width))]
              w-1/2 p-4 align-top

              lg:h-full lg:w-1/4

              md:h-fit md:w-1/3
            `}
          >
            <motion.div layout transition={{ duration: 0 }}>
              {subcategoriesButtons.map((button, index) => (
                <motion.div
                  key={button.key}
                  initial={{ opacity: 0, left: -5 }}
                  animate={{ opacity: 1, left: 0 }}
                  exit={{ opacity: 0, left: 5 }}
                  transition={{ duration: 0.1, delay: 0.05 * index }}
                >
                  {button}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            layout
            className={`
              inline-block w-1/2 border-l border-l-border align-top

              lg:w-3/4

              md:w-2/3
            `}
          >
            <motion.div layout transition={{ duration: 0 }}>
              <ScrollAreaComponent
                className={`
                  h-[calc(100dvh-var(--header-height)-var(--section-gap-width))]

                  md:h-fit
                `}
              >
                <div
                  className={`
                    grid h-fit grid-cols-1 gap-4 p-4

                    lg:h-fit lg:grid-cols-3

                    md:grid-cols-2
                  `}
                >
                  {products?.map((product, index) => (
                    <motion.div
                      className={`
                        relative select-none border border-border-light
                        bg-background
                      `}
                      initial={{ opacity: 0, top: -5 }}
                      animate={{ opacity: 1, top: 0 }}
                      exit={{ opacity: 0, top: 5 }}
                      transition={{ duration: 0.1, delay: 0.05 * index }}
                      key={product.slug}
                    >
                      <Link
                        href={`/products/${product.category.slug}/${product.subcategory.slug}/${product.slug}`}
                        onClick={() => onClose()}
                      >
                        <ProductBriefComponent
                          className="h-full"
                          product={product}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  <Link
                    href={`/products/${categorySlug}/${subcategorySlug}`}
                    onClick={() => onClose()}
                    className={`
                      order-first flex h-full w-full cursor-pointer select-none
                      items-center justify-center gap-3 border
                      border-border-light px-4 py-3

                      hover:bg-background/[.65]

                      lg:order-last lg:col-start-3 lg:flex-col

                      md:col-span-2
                    `}
                  >
                    <PlusIcon className="h-6 w-6" />
                    <span className="text-sm font-bold uppercase">
                      {t("expand_products")}
                    </span>
                  </Link>
                </div>
              </ScrollAreaComponent>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <div
        className={`
          w-full border-t border-t-border px-[var(--section-gap-width)]

          md:hidden
        `}
      >
        <div
          className={`
            mx-auto h-[var(--section-gap-width)] max-w-screen-2xl border-x
            border-x-border
          `}
        />
      </div>
      <div
        className="fixed left-0 top-0 z-[90] h-screen w-full"
        onClick={() => onClose()}
      />
    </>
  );
};
