import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { useContext } from "react";

import { SectionComponent } from "@/components/section";
import { WishlistContext } from "@/contexts/wishlist";

import { WishlistPageEntrieListComponent } from "./components/entries_list.component";
import { WishlistPageFormContactComponent } from "./components/form_contact.component";

export default function WishlistPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("page_wishlist");

  return (
    <>
      <SectionComponent className="p-14">
        <h1 className="w-full text-center text-6xl font-black">
          {t("wishlist")}
        </h1>
      </SectionComponent>
      <SectionComponent
        className={`
          flex flex-col

          lg:flex-row
        `}
      >
        <div
          className={`
            basis-1/2 border-b border-b-border p-8

            lg:border-b-0 lg:border-r lg:border-r-border
          `}
        >
          <span className="mb-4 block text-sm font-bold uppercase">
            {t("wishlist_request_quote")}
          </span>
          <p>{t("wishlist_request_quote_description")}</p>
        </div>
        <div className="basis-1/2 p-8">
          <WishlistPageFormContactComponent />
        </div>
      </SectionComponent>
      <SectionComponent>
        <div className="border-b border-b-border bg-foreground px-8 py-4">
          <h1 className="text-center text-sm font-bold uppercase text-white">
            {t("wishlist_summary")}
          </h1>
        </div>
        <div
          className={`
            flex flex-col gap-4 bg-foreground/20 p-4

            md:gap-8 md:p-8
          `}
        >
          <WishlistPageEntrieListComponent />
        </div>
      </SectionComponent>
    </>
  );
}
