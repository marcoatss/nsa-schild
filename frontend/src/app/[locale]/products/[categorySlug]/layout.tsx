import { unstable_setRequestLocale } from "next-intl/server";

import { querySlugsCategory } from "@/lib/query-slugs-category.helper";

export default function SubcategoriesLayouut({
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
  params: { locale },
}: {
  params: { locale: string };
}) {
  const slugs = await querySlugsCategory(locale);

  return slugs.map(({ slug: categorySlug }) => ({ categorySlug }));
}
