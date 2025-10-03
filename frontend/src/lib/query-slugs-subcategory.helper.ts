import { stringify } from "qs";

import { SubcategorySlug } from "./types";

export const querySlugsSubcategory = async (
  locale: string,
  categorySlug: string,
): Promise<SubcategorySlug[]> => {
  const query = stringify({
    locale,
    filters: { category: { slug: categorySlug } },
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/subcategories?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map(({ attributes: { name, slug } }: any) => ({ name, slug }));
};
