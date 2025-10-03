import { CMSImageFullHeightComponent } from "@/components/cms/cms-image-full-height";
import {
  CMSTextParagraphComponent,
  CMSTextParagraphProps,
} from "@/components/cms/cms-text-paragraph";

export interface CMSGridNthProps {
  type: "paragraph" | "image";
  dark: boolean;
  paragraph: CMSTextParagraphProps | null;
  media: any;
}

export const CMSGridNthComponent: React.FC<CMSGridNthProps> = ({
  dark,
  type,
  paragraph,
  media,
}: CMSGridNthProps) => {
  if (type === "paragraph" && paragraph) {
    return (
      <div
        className={`
          ${dark && "group-dark is-dark group bg-foreground"}

          h-full w-full
        `}
      >
        <CMSTextParagraphComponent {...paragraph} />
      </div>
    );
  }

  if (type === "image") {
    return (
      <div
        className={`
          ${dark && "group-dark is-dark group bg-foreground"}

          h-full w-full
        `}
      >
        <CMSImageFullHeightComponent image={media?.data} />
      </div>
    );
  }

  return <></>;
};
