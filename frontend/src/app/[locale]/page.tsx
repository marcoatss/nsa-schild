import { unstable_setRequestLocale } from "next-intl/server";
import { stringify } from "qs";

import { CMSRendererComponent } from "@/components/cms/cms-renderer";

export default async function RootPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const content = await getData(locale);

  return <CMSRendererComponent content={content} />;
}

const getData = async (locale: string) => {
  const query = stringify({ locale, populate: "deep" });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/homepage?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const {
    data: {
      attributes: { content },
    },
  } = await res.json();

  return content;
};
