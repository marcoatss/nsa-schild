import { stringify } from "qs";

import { mapCategory } from "./map-category.helper";
import { Category } from "./types";

export const queryListCategories = async (
  locale: string,
): Promise<Category[]> => {
  const query = stringify({
    locale,
    populate: "deep",
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

  return data.map(({ attributes }: any) => mapCategory(attributes)) ?? [];
};
