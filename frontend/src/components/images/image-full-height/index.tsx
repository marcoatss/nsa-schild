import Image from "next/image";

import { ImagePlaceholderComponent } from "@/components/images/image-placeholder";
import { Image as ImageType } from "@/lib/types";

export interface ImageFullHeightProps {
  size: "thumbnail" | "small" | "medium" | "large" | "original";
  image: ImageType | null;
  className?: string;
}

export const ImageFullHeightComponent: React.FC<ImageFullHeightProps> = ({
  size,
  image,
  className,
}: ImageFullHeightProps) => {
  if (image === null) {
    return <ImagePlaceholderComponent />;
  }

  const {
    alt,
    placeholder,
    [size]: { width, height, src },
  } = image;

  return (
    <div
      className={`
        h-full p-2

        ${className}
      `}
    >
      <Image
        style={{ objectFit: "cover" }}
        className="h-full w-full"
        alt={alt}
        width={width}
        height={height}
        src={src}
        {...(placeholder
          ? { placeholder: "blur", blurDataURL: placeholder }
          : {})}
      />
    </div>
  );
};
