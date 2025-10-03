import { stringify } from "qs";

import { mapCategory } from "./map-category.helper";
import { Category } from "./types";

export const queryGetCategory = async (
  locale: string,
  categorySlug: string,
): Promise<Category> => {
  const query = stringify({
    locale,
    populate: "media",
    filters: {
      slug: { $eq: categorySlug },
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/categories?${query}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch category '${categorySlug}' with locale '${locale}'`,
    );
  }

  const result = await res.json();
  const category = result.data?.[0]?.attributes;

  if (!category) {
    throw new Error(
      `Failed to fetch category '${categorySlug}' with locale '${locale}'`,
    );
  }

  return mapCategory(category);
};
