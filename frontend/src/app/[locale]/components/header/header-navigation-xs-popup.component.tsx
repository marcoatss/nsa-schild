import { useCallback, useState } from "react";

import { Link } from "@/components/navigation";
import { ScrollAreaComponent } from "@/components/scroll-area";
import { HeaderData } from "@/lib/query-header.helper";

export interface HeaderNavigationXsPopupProps {
  onClose: () => void;
  header: HeaderData;
  sections: { href: string; label: string }[];
}

export const HeaderXsNavigationPopupComponent: React.FC<
  HeaderNavigationXsPopupProps
> = ({ onClose, header, sections }) => {
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  const handleCategoryClick = useCallback(
    (slug: string) => setCategorySlug((prev) => (prev !== slug ? slug : null)),
    [],
  );

  return (
    <>
      <div
        className={`
          z-[100]
          h-[calc(100dvh-var(--header-xs-height)-var(--section-gap-width-xs))]
          w-full px-[var(--section-gap-width-xs)]
        `}
      >
        <div className="mx-auto max-w-screen-2xl border-x border-x-border">
          <ScrollAreaComponent
            className={`
              h-[calc(100dvh-var(--header-xs-height)-var(--section-gap-width-xs))]
            `}
          >
            <div className="border-b border-border bg-foreground/20 p-4">
              <div className="border border-border">
                {sections.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => onClose()}
                    className={`
                      order-first flex h-full w-full cursor-pointer select-none
                      items-center justify-center gap-3 bg-background px-4 py-3

                      [&:not(:last-child)]:border-b
                      [&:not(:last-child)]:border-b-border-light

                      hover:bg-background/[.65]

                      lg:order-last lg:col-start-3 lg:flex-col

                      md:col-span-2
                    `}
                  >
                    <span className="text-sm font-bold uppercase">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {header.categories.map((category) => (
                <div key={category.slug} className="border border-border">
                  <div
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`
                      order-first flex h-full w-full cursor-pointer select-none
                      items-center justify-center gap-3 bg-background px-4 py-3

                      [&:not(:last-child)]:border-b
                      [&:not(:last-child)]:border-b-border-light

                      hover:bg-background/[.65]

                      lg:order-last lg:col-start-3 lg:flex-col

                      md:col-span-2

                      ${
                        categorySlug === category.slug &&
                        `
                          bg-foreground text-background

                          active:bg-foreground active:text-background

                          hover:bg-foreground hover:text-background
                        `
                      }
                    `}
                  >
                    <span className="text-sm font-bold uppercase">
                      {category.name}
                    </span>
                  </div>
                  {categorySlug == category.slug &&
                    category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.slug}
                        href={`/products/${category.slug}/${subcategory.slug}`}
                        onClick={() => onClose()}
                        className={`
                          order-first flex h-full w-full cursor-pointer
                          select-none items-center justify-center gap-3
                          bg-background px-4 py-3

                          [&:not(:last-child)]:border-b
                          [&:not(:last-child)]:border-b-border-light

                          hover:bg-background/[.65]

                          lg:order-last lg:col-start-3 lg:flex-col

                          md:col-span-2
                        `}
                      >
                        <span className="text-sm font-bold uppercase">
                          {subcategory.name}
                        </span>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </ScrollAreaComponent>
        </div>
      </div>
      <div
        className={`
          w-full border-t border-t-border px-[var(--section-gap-width-xs)]
        `}
      >
        <div
          className={`
            mx-auto h-[var(--section-gap-width-xs)] max-w-screen-2xl border-x
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
