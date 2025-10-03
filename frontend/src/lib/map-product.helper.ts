import { mapCategory } from "./map-category.helper";
import { mapFile } from "./map-file.helper";
import { mapImage } from "./map-image.helper";
import { mapSubcategory } from "./map-subcategory.helper";
import { Image, Product } from "./types";

export const mapProduct = (product: any): Product => {
  const productMedia: (Image | null)[] =
    product?.media?.map(({ media }: any) =>
      media?.data ? mapImage(media.data) : null,
    ) ?? [];

  const modelsMediaMap: {
    [id: number]: { index: number; media: Image | null };
  } =
    product?.models?.reduce(
      (acc: { [key: string]: Image }, { id, media }: any, index: number) => {
        const result = media?.data ? mapImage(media.data) : null;

        return {
          ...acc,
          [id]: { index: productMedia.length + index, media: result },
        };
      },
      {},
    ) ?? {};

  const modelsMedia: (Image | null)[] = Object.values(modelsMediaMap)
    .map(({ media }: any) => media)
    .filter((media: Image | null) => media != null);

  return {
    name: product.name,
    slug: product.slug,
    description: product.description,
    brief: product.brief,
    sortingIndex: product.sortingIndex,
    large: product.large,
    models: product.models.map((model: any) => ({
      id: model.id,
      name: model.name,
      supplier: model.supplier,
      code: model.code,
      weight: model.weight,
      volume: model.volume,
      height: model.height,
      length: model.length,
      diameter: model.diameter,
      depth: model.depth,
      safetyAreaLength: model.safetyAreaLength,
      safetyAreaDepth: model.safetyAreaDepth,
      fallHeight: model.fallHeight,
      weightUnit: model.weightUnit,
      volumeUnit: model.volumeUnit,
      heightUnit: model.heightUnit,
      lengthUnit: model.lengthUnit,
      diameterUnit: model.diameterUnit,
      depthUnit: model.depthUnit,
      safetyAreaLengthUnit: model.safetyAreaLengthUnit,
      safetyAreaDepthUnit: model.safetyAreaDepthUnit,
      fallHeightUnit: model.fallHeightUnit,
      media: modelsMediaMap?.[model.id]?.media,
      mediaIndex: modelsMediaMap?.[model.id]?.index,
      materials: model.materials
        .filter((material: any) => material?.material?.data)
        .map((material: any) => ({
          percentage: material.percentage,
          name: material.material.data.attributes.name,
        })),
      options: model.optionGroups.map((optionGroup: any) => ({
        name: optionGroup.name,
        values: optionGroup.options.map((option: any) => option.name),
      })),
    })),
    media: productMedia.concat(modelsMedia),
    files:
      product?.files?.data?.map((file: any) => (file ? mapFile(file) : null)) ??
      [],
    subcategory: mapSubcategory(product.subcategory.data.attributes),
    category: mapCategory(
      product.subcategory.data.attributes.category.data.attributes,
    ),
  };
};
