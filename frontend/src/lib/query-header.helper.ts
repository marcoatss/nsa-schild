import { stringify } from "qs";

import { mapProduct } from "./map-product.helper";
import { Product } from "./types";

export interface HeaderData {
  categories: {
    name: string;
    slug: string;
    subcategories: {
      name: string;
      slug: string;
      products: Product[];
    }[];
  }[];
}

const getProducts = async (
  locale: string,
  categorySlug: string,
  subcategorySlug: string,
) => {
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
    },
    sort: ["sortingIndex"],
    pagination: { limit: 2 },
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

export const queryHeader = async (locale: string): Promise<HeaderData> => {
  const query = stringify({
    locale,
    populate: "subcategories",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/categories?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  const categories = await Promise.all(
    data.map(
      async ({
        attributes: {
          slug: categorySlug,
          name: categoryName,
          subcategories: { data },
        },
      }: any) => ({
        name: categoryName,
        slug: categorySlug,
        subcategories: await Promise.all(
          data.map(
            async ({
              attributes: { slug: subcategorySlug, name: subcategoryName },
            }: any) => ({
              name: subcategoryName,
              slug: subcategorySlug,
              products: await getProducts(
                locale,
                categorySlug,
                subcategorySlug,
              ),
            }),
          ),
        ),
      }),
    ),
  );

  return { categories };
};
