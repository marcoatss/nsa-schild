import { mapImage } from "./map-image.helper";
import { Category } from "./types";

export const mapCategory = (category: any): Category => ({
  name: category.name,
  slug: category.slug,
  content: category.content,
  media: category?.media?.data ? mapImage(category.media.data) : null,
});
