import Link from "next/link";
import { useTranslations } from "next-intl";

import { ButtonComponent } from "@/components/button";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import { Catalogue } from "@/lib/types";

export interface CatalogueBriefProps {
  catalogue: Catalogue;
}

export const CatalogueBriefComponent: React.FC<CatalogueBriefProps> = ({
  catalogue: { media, content, file },
}: CatalogueBriefProps) => {
  const t = useTranslations("page_catalogues");

  return (
    <div
      className={`
        flex min-h-[32rem] flex-col

        md:flex-row
      `}
    >
      <div
        className={`
          basis-1/2 border-b border-b-border bg-foreground bg-contain bg-center
          bg-no-repeat bg-origin-content p-2

          md:border-b-0 md:border-r md:border-r-border
        `}
        style={{ backgroundImage: `url('${media?.medium.src}')` }}
      />
      <div className="basis-1/2">
        <div
          className={`
            px-8 py-10

            md:px-16 md:py-14
          `}
        >
          <TextParagraphBigComponent content={content} />
          {file ? (
            <ButtonComponent className="mt-8 w-full" variant="default" asChild>
              <Link href={file.src} target="_blank">
                {t("download")}
              </Link>
            </ButtonComponent>
          ) : (
            <ButtonComponent className="mt-8 w-full" variant="default" disabled>
              File not found
            </ButtonComponent>
          )}
        </div>
      </div>
    </div>
  );
};
