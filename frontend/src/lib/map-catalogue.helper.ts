import { mapFile } from "./map-file.helper";
import { mapImage } from "./map-image.helper";
import { Catalogue } from "./types";

export const mapCatalogue = (catalogue: any): Catalogue => ({
  id: catalogue.id,
  content: catalogue.attributes.content,
  file: catalogue.attributes.file.data
    ? mapFile(catalogue.attributes.file.data)
    : null,
  media: catalogue?.attributes?.media?.data
    ? mapImage(catalogue.attributes.media.data)
    : null,
});
