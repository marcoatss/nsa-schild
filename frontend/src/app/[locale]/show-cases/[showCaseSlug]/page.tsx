import { unstable_setRequestLocale } from "next-intl/server";

import { CMSRendererComponent } from "@/components/cms/cms-renderer";
import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Layout2x1Component } from "@/components/layouts/layout-2x1";
import { SectionComponent } from "@/components/section";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import { queryGetCaseStudy } from "@/lib/query-get-case-study.helper";

export default async function ShowCasePage({
  params: { locale, caseStudySlug },
}: {
  params: {
    locale: string;
    caseStudySlug: string;
  };
}) {
  unstable_setRequestLocale(locale);

  const { media, description, name, content } = await queryGetCaseStudy(
    locale,
    caseStudySlug,
  );

  return (
    <>
      <SectionComponent>
        <Layout2x1Component
          nth1={<ImageFullHeightComponent image={media} size="large" />}
          nth2={
            <>
              <div className="px-16 py-14">
                <span className="mb-8 block text-sm font-bold uppercase">
                  {name}
                </span>
                <TextParagraphBigComponent content={description} />
              </div>
            </>
          }
        />
      </SectionComponent>
      <CMSRendererComponent content={content} />
    </>
  );
}
