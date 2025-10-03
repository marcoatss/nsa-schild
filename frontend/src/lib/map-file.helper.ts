import { File } from "./types";

export const mapFile = (file: any): File => ({
  id: file.id,
  name: file.attributes.name,
  src: file.attributes.url,
  ext: file.attributes.ext,
});
