import { CMSImageFullHeightComponent } from "@/components/cms/cms-image-full-height";
import { CMSImageScreenHeightComponent } from "@/components/cms/cms-image-screen-height";
import {
  CMSTextParagraphBigComponent,
  CMSTextParagraphBigProps,
} from "@/components/cms/cms-text-paragraph-big";

export interface CMSHeroProps {
  type: "right" | "left";
  dark: boolean;
  sticky: boolean;
  fullHeight: boolean;
  media: any;
  paragraph: CMSTextParagraphBigProps;
}

export const CMSHeroComponent: React.FC<CMSHeroProps> = ({
  type,
  dark,
  sticky,
  fullHeight,
  media,
  paragraph,
}: CMSHeroProps) => {
  const imageComponent = fullHeight ? (
    <CMSImageScreenHeightComponent image={media.data} />
  ) : (
    <CMSImageFullHeightComponent image={media.data} />
  );

  const paragraphComponent = <CMSTextParagraphBigComponent {...paragraph} />;

  const nth1 = type === "left" ? imageComponent : paragraphComponent;
  const nth2 = type === "right" ? imageComponent : paragraphComponent;

  const nth1Dark = type === "right" ? dark : false;
  const nth2Dark = type === "left" ? dark : false;

  return sticky ? (
    <div
      className={`
        flex flex-col

        md:min-h-[calc(100vh-var(--header-xs-height))] md:flex-row

        sm:min-h-[calc(100dvh-var(--header-height))]
      `}
    >
      <div
        className={`
          basis-1/2

          md:border-r md:border-r-border

          ${
            type === "right" &&
            `
              border-b border-b-border

              md:border-b-0
            `
          }
        `}
      >
        <div
          className={`
            ${nth1Dark && "group-dark is-dark group bg-foreground"}

            sticky top-[var(--header-xs-height)]

            sm:top-[var(--header-height)]
          `}
        >
          {nth1}
        </div>
      </div>
      <div
        className={`
          basis-1/2

          ${
            type === "left" &&
            `
              order-first border-b border-b-border

              md:order-none md:border-b-0
            `
          }
        `}
      >
        <div
          className={`
            ${nth2Dark && "group-dark is-dark group bg-foreground"}

            sticky top-[var(--header-xs-height)]

            sm:top-[var(--header-height)]
          `}
        >
          {nth2}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`
        flex flex-col

        md:flex-row
      `}
    >
      <div
        className={`
          ${nth1Dark && "group-dark is-dark group bg-foreground"}
          ${
            type === "right" &&
            `
              border-b border-b-border

              md:border-b-0
            `
          }

          basis-1/2 border-b border-b-border

          md:border-b-0 md:border-r md:border-r-border
        `}
      >
        {nth1}
      </div>
      <div
        className={`
          ${nth2Dark && "group-dark is-dark group bg-foreground"}
          ${
            type === "left" &&
            `
              order-first border-b border-b-border

              md:order-none md:border-b-0
            `
          }

          basis-1/2
        `}
      >
        {nth2}
      </div>
    </div>
  );
};
