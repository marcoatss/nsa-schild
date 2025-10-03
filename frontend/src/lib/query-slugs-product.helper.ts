import { stringify } from "qs";

import { ProductSlug } from "./types";

export const querySlugsProduct = async (
  locale: string,
  categorySlug: string,
  subcategorySlug: string,
): Promise<ProductSlug[]> => {
  const query = stringify({
    locale,
    filters: {
      subcategory: { slug: subcategorySlug, category: { slug: categorySlug } },
    },
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/products?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map(({ attributes: { name, slug } }: any) => ({ name, slug }));
};
