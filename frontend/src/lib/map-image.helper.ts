import { Image } from "./types";

export const mapImage = (image: any): Image => {
  const original = {
    src: image.attributes.url,
    width: image.attributes.width,
    height: image.attributes.height,
  };

  const thumbnail = image.attributes.formats?.thumbnail?.url
    ? {
        src: image.attributes.formats.thumbnail.url,
        width: image.attributes.formats.thumbnail.width,
        height: image.attributes.formats.thumbnail.height,
      }
    : original;

  const small = image.attributes.formats?.small?.url
    ? {
        src: image.attributes.formats.small.url,
        width: image.attributes.formats.small.width,
        height: image.attributes.formats.small.height,
      }
    : original;

  const medium = image.attributes.formats?.medium?.url
    ? {
        src: image.attributes.formats.medium.url,
        width: image.attributes.formats.medium.width,
        height: image.attributes.formats.medium.height,
      }
    : original;

  const large = image.attributes.formats?.large?.url
    ? {
        src: image.attributes.formats.large.url,
        width: image.attributes.formats.large.width,
        height: image.attributes.formats.large.height,
      }
    : original;

  return {
    id: image.id,
    alt: image.attributes.alternativeText ?? "",
    placeholder: image.attributes.placeholder,
    original,
    thumbnail,
    small,
    medium,
    large,
  };
};
