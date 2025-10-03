import { stringify } from "qs";

import { CaseStudySlug } from "./types";

export const querySlugsCaseStudy = async (
  locale: string,
): Promise<CaseStudySlug[]> => {
  const query = stringify({
    locale,
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/show-cases?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map(({ attributes: { name, slug } }: any) => ({
    name,
    slug,
  }));
};
