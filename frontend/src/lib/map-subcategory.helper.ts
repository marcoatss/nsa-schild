import { mapImage } from "./map-image.helper";
import { Subcategory } from "./types";

export const mapSubcategory = (subcategory: any): Subcategory => ({
  name: subcategory.name,
  slug: subcategory.slug,
  content: subcategory.content,
  media: subcategory?.media?.data ? mapImage(subcategory.media.data) : null,
});
