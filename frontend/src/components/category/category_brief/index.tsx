import { useTranslations } from "next-intl";

import { ButtonComponent } from "@/components/button";
import { ImageFullHeightComponent } from "@/components/images/image-full-height";
import { Layout2x1Component } from "@/components/layouts/layout-2x1";
import { Link } from "@/components/navigation";
import { TextParagraphBigComponent } from "@/components/texts/text-paragraph-big";
import { Category } from "@/lib/types";

export interface CategoryBriefProps {
  category: Category;
}

export const CategoryBriefComponent: React.FC<CategoryBriefProps> = ({
  category: { media, content, slug, name: categoryName },
}: CategoryBriefProps) => {
  const t = useTranslations("page_categories");

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
            <Link href={`/products/${slug}`}>
              {t("category_action", { categoryName })}
            </Link>
          </ButtonComponent>
        </div>
      }
    />
  );
};
