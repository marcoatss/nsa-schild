import { stringify } from "qs";

import { mapSubcategory } from "./map-subcategory.helper";
import { Subcategory } from "./types";

export const queryGetSubcategory = async (
  locale: string,
  subcategorySlug: string,
): Promise<Subcategory> => {
  const query = stringify({
    locale,
    populate: "media",
    filters: {
      slug: { $eq: subcategorySlug },
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/subcategories?${query}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch subcategory '${subcategorySlug}' with locale '${locale}'`,
    );
  }

  const result = await res.json();
  const subcategory = result.data?.[0]?.attributes;

  if (!subcategory) {
    throw new Error(
      `Failed to fetch subcategory '${subcategorySlug}' with locale '${locale}'`,
    );
  }

  return mapSubcategory(subcategory);
};
