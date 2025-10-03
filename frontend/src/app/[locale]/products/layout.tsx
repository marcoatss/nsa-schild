import { unstable_setRequestLocale } from "next-intl/server";

export default function CategoriesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <>{children}</>;
}
