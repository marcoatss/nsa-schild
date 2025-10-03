import { stringify } from "qs";

import { Slug } from "./types";

export const querySlugsProductBySubcategory = async (
  locale: string,
  subcategorySlug: string,
): Promise<Slug[]> => {
  const query = stringify({
    locale,
    populate: "products",
    filters: {
      slug: subcategorySlug,
    },
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

  const {
    data: {
      [0]: {
        attributes: {
          products: { data },
        },
      },
    },
  } = await res.json();

  return data.map(({ attributes: { name, slug } }: any) => ({
    name,
    slug,
  }));
};
