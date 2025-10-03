import { stringify } from "qs";

import { mapCaseStudy } from "./map-case-study.helper";
import { CaseStudy } from "./types";

export const queryListCaseStudies = async (
  locale: string,
): Promise<CaseStudy[]> => {
  const query = stringify({
    locale,
    populate: "deep",
    pagination: {
      pageSize: 1000,
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/show-cases?${query}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const { data } = await res.json();

  return data.map((caseStudy: any) => mapCaseStudy(caseStudy.attributes));
};
