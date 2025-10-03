import Image from "next/image";

import { ImagePlaceholderComponent } from "@/components/images/image-placeholder";
import { Image as ImageType } from "@/lib/types";

export interface ImageScreenHeightProps {
  size: "thumbnail" | "small" | "medium" | "large" | "original";
  image: ImageType | null;
  className?: string;
}

export const ImageScreenHeightComponent: React.FC<ImageScreenHeightProps> = ({
  size,
  image,
  className,
}: ImageScreenHeightProps) => {
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
        h-[calc(100dvh-var(--header-xs-height))] p-2

        sm:h-[calc(100vh-var(--header-height))]]

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
