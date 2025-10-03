import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { ButtonComponent } from "@/components/button";
import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Layout2x1Component } from "@/components/layouts/layout-2x1";
import { Link } from "@/components/navigation";
import { SectionComponent } from "@/components/section";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import { queryListCaseStudies } from "@/lib/query-list-case-studies.helper";

export default async function ShowCasesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("page_show_cases");

  const caseStudies = await queryListCaseStudies(locale);

  return (
    <>
      <SectionComponent className="p-14">
        <h1 className="w-full text-center text-6xl font-black">
          {t("show_cases")}
        </h1>
      </SectionComponent>
      {caseStudies.map(({ slug, media, name, description }) => (
        <>
          <SectionComponent key={slug}>
            <Layout2x1Component
              nth1={<ImageFullHeightComponent image={media} size="large" />}
              nth2={
                <>
                  <div className="px-16 py-14">
                    <span className="mb-8 block text-sm font-bold uppercase">
                      {name}
                    </span>
                    <TextParagraphBigComponent content={description} />
                    <ButtonComponent
                      variant="default"
                      className="mt-8 w-full"
                      asChild
                    >
                      <Link href={`/show-cases/${slug}`}>DISCOVER MORE</Link>
                    </ButtonComponent>
                  </div>
                </>
              }
            />
          </SectionComponent>
        </>
      ))}
    </>
  );
}
