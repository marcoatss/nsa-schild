import { stringify } from "qs";

import { mapProduct } from "./map-product.helper";
import { Product } from "./types";

export const queryGetProduct = async (
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
  locale: string,
): Promise<Product> => {
  const query = stringify({
    locale,
    populate: "deep",
    filters: {
      subcategory: {
        category: {
          slug: { $eq: categorySlug },
        },
        slug: { $eq: subcategorySlug },
      },
      slug: { $eq: productSlug },
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/products?${query}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch product '${categorySlug}' > '${subcategorySlug}' > '${productSlug}' with locale '${locale}'`,
    );
  }

  const result = await res.json();
  const product = result.data?.[0]?.attributes;

  if (!product) {
    throw new Error(
      `Failed to fetch product '${categorySlug}' > '${subcategorySlug}' > '${productSlug}' with locale '${locale}'`,
    );
  }

  return mapProduct(product);
};
