import { stringify } from "qs";

import { mapProduct } from "./map-product.helper";
import { Product } from "./types";

export const queryListProducts = async (
  locale: string,
  categorySlug: string,
  subcategorySlug: string,
): Promise<Product[]> => {
  const query = stringify({
    locale,
    populate: "deep",
    pagination: {
      pageSize: 1000,
    },
    filters: {
      subcategory: {
        category: {
          slug: { $eq: categorySlug },
        },
        slug: { $eq: subcategorySlug },
      },
    },
    sort: ["sortingIndex"],
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/products?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map(({ attributes }: any) => mapProduct(attributes));
};
