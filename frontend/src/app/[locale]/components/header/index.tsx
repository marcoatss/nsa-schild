"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback, useMemo, useEffect } from "react";

import { Link } from "@/components/navigation";
import { useBreakpoint } from "@/lib/hooks";
import { HeaderData } from "@/lib/query-header.helper";

import { HeaderLanguageIconComponent } from "./header-language-icon.component";
import { HeaderMenuIconComponent } from "./header-menu-icon.component";
import { HeaderNavigationPopupComponent } from "./header-navigation-popup.component";
import { HeaderXsNavigationPopupComponent } from "./header-navigation-xs-popup.component";
import { HeaderWishlistIconComponent } from "./header-wishlist-icon.component";

export interface HeaderProps {
  data: HeaderData;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
  data,
}: HeaderProps) => {
  const t = useTranslations("header");
  const { isAboveSm } = useBreakpoint("sm");

  /********************************/
  /********** NAVIGATION **********/
  /********************************/

  const [navCategorySlug, setNavCategorySlug] = useState<string | null>(null);

  const navSubcategories = useMemo(() => {
    if (navCategorySlug === null) {
      return null;
    }

    return (
      data.categories.find(({ slug }) => slug === navCategorySlug)
        ?.subcategories ?? null
    );
  }, [data, navCategorySlug]);

  const handleNavCategoryClick = useCallback((slug: string) => {
    setNavCategorySlug((prevSlug) => (slug === prevSlug ? null : slug));
  }, []);

  const handleNavClose = useCallback(() => setNavCategorySlug(null), []);

  /***********************************/
  /********** XS NAVIGATION **********/
  /***********************************/

  const [xsNavPopupOpen, setXsNavPopupOpen] = useState(false);

  const handleXsNavClose = useCallback(() => setXsNavPopupOpen(false), []);

  const handleXsNavToggle = useCallback(
    () => setXsNavPopupOpen((prev) => !prev),
    [],
  );

  /*****************************/
  /********** EFFECTS **********/
  /*****************************/

  useEffect(() => {
    handleNavClose();
    handleXsNavClose();
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isAboveSm,
    handleNavClose,
    handleXsNavClose,
  ]);

  /*************************/
  /********** JSX **********/
  /*************************/

  const sections: { href: string; label: string }[] = [
    {
      href: "/show-cases",
      label: t("show_cases"),
    },
    {
      href: "/catalogues",
      label: t("catalogues"),
    },
    {
      href: "/about",
      label: t("about"),
    },
  ];

  const navigationUpperRow = (
    <>
      {sections.map(({ href, label }) => (
        <Link
          className={`
            flex-1 cursor-pointer select-none border-r-border px-3

            [&:not(:last-child)]:border-r

            hover:bg-foreground hover:text-white
          `}
          onClick={() => handleNavClose()}
          href={href}
          key={href}
        >
          <span
            className={`
              truncate text-xs font-semibold uppercase
              leading-[var(--header-row-height)]
            `}
          >
            {label}
          </span>
        </Link>
      ))}
      {/*<HeaderSearchIconComponent className="basis-[var(--header-row-height)] border-r border-r-border" />*/}
      <HeaderWishlistIconComponent
        className={`
          basis-[calc(var(--header-row-height)+var(--border-width))] border-r
          border-r-border
        `}
      />
      <HeaderLanguageIconComponent className="basis-[var(--header-row-height)]" />
    </>
  );

  const navigationLowerRow = data.categories.map(({ slug, name }) => (
    <div
      key={slug}
      className={`
        flex-1 cursor-pointer select-none border-r-border px-3

        [&:not(:last-child)]:border-r

        hover:bg-foreground hover:text-white

        ${navCategorySlug === slug && `bg-foreground text-white`}
      `}
      onClick={() => handleNavCategoryClick(slug)}
    >
      <span
        className={`
          truncate text-xs font-semibold uppercase
          leading-[var(--header-row-height)]
        `}
      >
        {name}
      </span>
    </div>
  ));

  const navigation = (
    <div
      className={`
        hidden flex-1 border-l border-l-border

        sm:block
      `}
    >
      <div
        className={`
          flex h-[calc(var(--header-row-height)+var(--border-width))] border-b
          border-b-border
        `}
      >
        {navigationUpperRow}
      </div>
      <div className="flex h-[var(--header-row-height)]">
        {navigationLowerRow}
      </div>
    </div>
  );

  const xsNavigation = (
    <div
      className={`
        flex

        sm:hidden
      `}
    >
      {/*<HeaderSearchIconComponent className="h-[var(--header-xs-row-height)] w-[var(--header-xs-row-height)] border-l border-l-border" />*/}
      <HeaderWishlistIconComponent
        className={`
          h-[var(--header-xs-row-height)] w-[var(--header-xs-row-height)]
          border-l border-l-border
        `}
      />
      <HeaderLanguageIconComponent
        className={`
          h-[var(--header-xs-row-height)] w-[var(--header-xs-row-height)]
          border-l border-l-border
        `}
      />
      <HeaderMenuIconComponent
        className={`
          h-[var(--header-xs-row-height)] w-[var(--header-xs-row-height)]
          border-l border-l-border
        `}
        onClick={handleXsNavToggle}
        open={xsNavPopupOpen}
      />
    </div>
  );

  return (
    <>
      <header className="fixed top-0 z-[100] flex w-full flex-col items-center">
        <div
          className={`
            w-full bg-background/50 px-[var(--section-gap-width-xs)]
            backdrop-blur-xl

            sm:px-[var(--section-gap-width)]
          `}
        >
          <div
            className={`
              m-auto h-[var(--section-gap-width-xs)] w-full max-w-screen-2xl
              border-x border-x-border

              sm:h-[var(--section-gap-width)]
            `}
          />
        </div>
        <div
          className={`
            z-[100] w-full border-y border-y-border bg-background/50
            px-[var(--section-gap-width-xs)] backdrop-blur-xl

            sm:px-[var(--section-gap-width)]
          `}
        >
          <div
            className={`
              relative m-auto flex w-full max-w-screen-2xl justify-between
              border-x border-x-border
            `}
          >
            <Link
              href="/"
              onClick={() => handleNavClose()}
              className={`
                basis-1/5 px-3

                lg:basis-1/4
              `}
            >
              <h1
                className={`
                  text-lg font-semibold leading-[var(--header-xs-row-height)]

                  sm:leading-[calc(2*var(--header-row-height)+var(--border-width))]
                `}
              >
                Schild
              </h1>
            </Link>
            {navigation}
            {xsNavigation}
          </div>
        </div>
        {isAboveSm && navCategorySlug && navSubcategories && (
          <HeaderNavigationPopupComponent
            categorySlug={navCategorySlug}
            subcategories={navSubcategories}
            onClose={handleNavClose}
          />
        )}
        {!isAboveSm && xsNavPopupOpen && (
          <HeaderXsNavigationPopupComponent
            header={data}
            sections={sections}
            onClose={handleXsNavClose}
          />
        )}
      </header>
      <div
        className={`
          h-[var(--header-xs-height)]

          sm:h-[var(--header-height)]
        `}
      />
    </>
  );
};
