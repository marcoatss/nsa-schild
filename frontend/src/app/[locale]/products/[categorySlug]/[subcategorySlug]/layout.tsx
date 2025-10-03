import { unstable_setRequestLocale } from "next-intl/server";

import { querySlugsSubcategory } from "@/lib/query-slugs-subcategory.helper";

export default function ProductsLayouut({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <>{children}</>;
}

export async function generateStaticParams({
  params: { locale, categorySlug },
}: {
  params: {
    locale: string;
    categorySlug: string;
  };
}) {
  const slugs = await querySlugsSubcategory(locale, categorySlug);

  return slugs.map(({ slug: subcategorySlug }) => ({ subcategorySlug }));
}
