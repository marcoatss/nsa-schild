import { unstable_setRequestLocale } from "next-intl/server";

import { querySlugsProduct } from "@/lib/query-slugs-product.helper";

export default function ProductLayouut({
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
  params: { locale, categorySlug, subcategorySlug },
}: {
  params: { locale: string; categorySlug: string; subcategorySlug: string };
}) {
  const slugs = await querySlugsProduct(locale, categorySlug, subcategorySlug);

  return slugs.map(({ slug: productSlug }) => ({ productSlug }));
}
