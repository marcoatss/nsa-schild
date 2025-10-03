import { useTranslations } from "next-intl";

import { ButtonComponent } from "@/components/button";
import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Layout2x1Component } from "@/components/layouts/layout-2x1";
import { Link } from "@/components/navigation";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import { Category, Subcategory } from "@/lib/types";

export interface SubcategoryBriefProps {
  category: Category;
  subcategory: Subcategory;
}

export const SubcategoryBriefComponent: React.FC<SubcategoryBriefProps> = ({
  category: { slug: categorySlug },
  subcategory: { slug: subcategorySlug, name: subcategoryName, media, content },
}: SubcategoryBriefProps) => {
  const t = useTranslations("page_subcategories");

  return (
    <Layout2x1Component
      nth1={<ImageFullHeightComponent image={media} size="medium" />}
      nth2={
        <div
          className={`
            px-8 py-10

            md:px-16 md:py-14
          `}
        >
          <TextParagraphBigComponent content={content} />
          <ButtonComponent className="mt-8 w-full" variant="default" asChild>
            <Link href={`/products/${categorySlug}/${subcategorySlug}`}>
              {t("subcategory_action", { subcategoryName })}
            </Link>
          </ButtonComponent>
        </div>
      }
    />
  );
};
