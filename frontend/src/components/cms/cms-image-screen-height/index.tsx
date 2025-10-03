import { ImagePlaceholderComponent } from "@/components/images/image-placeholder";
import { ImageScreenHeightComponent } from "@/components/images/image-screen-height";
import { mapImage } from "@/lib/map-image.helper";

export interface CMSImageScreenHeightProps {
  image: any;
}

export const CMSImageScreenHeightComponent: React.FC<
  CMSImageScreenHeightProps
> = ({ image }: CMSImageScreenHeightProps) => {
  const mappedImage = image ? mapImage(image) : null;

  if (mappedImage === null) {
    return <ImagePlaceholderComponent />;
  }

  return <ImageScreenHeightComponent image={mappedImage} size="original" />;
};
