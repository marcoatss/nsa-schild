import { stringify } from "qs";

import { CategorySlug } from "./types";

export const querySlugsCategory = async (
  locale: string,
): Promise<CategorySlug[]> => {
  const query = stringify({
    locale,
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/categories?${query}`,
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
