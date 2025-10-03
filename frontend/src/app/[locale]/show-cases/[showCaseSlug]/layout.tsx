import { unstable_setRequestLocale } from "next-intl/server";

import { querySlugsCaseStudy } from "@/lib/query-slugs-case-study.helper";

export default function ShowCaseLayouut({
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
  const slugs = await querySlugsCaseStudy(locale);

  return slugs.map(({ slug: showCaseSlug }) => ({ showCaseSlug }));
}
