import { stringify } from "qs";

import { mapCatalogue } from "./map-catalogue.helper";
import { Catalogue } from "./types";

export const queryListCatalogues = async (
  locale: string,
): Promise<Catalogue[]> => {
  const query = stringify({
    locale,
    populate: "deep",
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/catalogues?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map((catalogue: any) => mapCatalogue(catalogue));
};
