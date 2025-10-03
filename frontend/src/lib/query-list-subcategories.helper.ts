import { stringify } from "qs";

import { mapSubcategory } from "./map-subcategory.helper";
import { Subcategory } from "./types";

export const queryListSubcategories = async (
  locale: string,
  categorySlug: string,
): Promise<Subcategory[]> => {
  const query = stringify({
    locale,
    populate: "deep",
    filters: {
      slug: categorySlug,
    },
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

  const {
    data: {
      [0]: {
        attributes: {
          subcategories: { data },
        },
      },
    },
  } = await res.json();

  return data.map(({ attributes }: any) => mapSubcategory(attributes));
};
