import { mapImage } from "./map-image.helper";
import { CaseStudy } from "./types";

export const mapCaseStudy = (caseStudy: any): CaseStudy => ({
  name: caseStudy.name,
  slug: caseStudy.slug,
  description: caseStudy.description,
  content: caseStudy.content,
  media: caseStudy?.media?.data ? mapImage(caseStudy.media.data) : null,
});
