import { stringify } from "qs";

import { mapCaseStudy } from "./map-case-study.helper";
import { CaseStudy } from "./types";

export const queryGetCaseStudy = async (
  locale: string,
  caseStudySlug: string,
): Promise<CaseStudy> => {
  const query = stringify({
    locale,
    populate: "deep",
    filters: {
      slug: { $eq: caseStudySlug },
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/show-cases?${query}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch case-study '${caseStudySlug}' with locale '${locale}'`,
    );
  }

  const result = await res.json();
  const caseStudy = result.data?.[0]?.attributes;

  if (!caseStudy) {
    throw new Error(
      `Failed to fetch case-study '${caseStudySlug}' with locale '${locale}'`,
    );
  }

  return mapCaseStudy(caseStudy);
};
