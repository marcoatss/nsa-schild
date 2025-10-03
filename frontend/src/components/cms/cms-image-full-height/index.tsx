import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { ImagePlaceholderComponent } from "@/components/images/image-placeholder";
import { mapImage } from "@/lib/map-image.helper";

export interface CMSImageFullHeightProps {
  image: any;
}

export const CMSImageFullHeightComponent: React.FC<CMSImageFullHeightProps> = ({
  image,
}: CMSImageFullHeightProps) => {
  const mappedImage = image ? mapImage(image) : null;

  if (mappedImage === null) {
    return <ImagePlaceholderComponent />;
  }

  return <ImageFullHeightComponent image={mappedImage} size="original" />;
};
