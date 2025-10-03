import { useTranslations } from "next-intl";

import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbListComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import { Link } from "@/components/navigation";
import { Category, Subcategory } from "@/lib/types";

export interface ProductsBreadcrumbProps {
  category: Category;
  subcategory: Subcategory;
}

export const ProductsBreadcrumbComponent: React.FC<ProductsBreadcrumbProps> = ({
  category: { name: categoryName, slug: categorySlug },
  subcategory: { name: subcategoryName },
}: ProductsBreadcrumbProps) => {
  let t = useTranslations("breadcrumb");

  return (
    <div
      className={`
        flex h-[var(--breadcrumb-height)] select-none items-center
        bg-foreground/10 px-4
      `}
    >
      <BreadcrumbComponent>
        <BreadcrumbListComponent>
          <BreadcrumbItemComponent>
            <BreadcrumbLinkComponent asChild>
              <Link href="/products">{t("products")}</Link>
            </BreadcrumbLinkComponent>
          </BreadcrumbItemComponent>
          <BreadcrumbSeparator />
          <BreadcrumbItemComponent>
            <BreadcrumbLinkComponent asChild>
              <Link href={`/products/${categorySlug}`}>
                {t("category", { categoryName })}
              </Link>
            </BreadcrumbLinkComponent>
          </BreadcrumbItemComponent>
          <BreadcrumbSeparator />
          <BreadcrumbPageComponent>
            {t("subcategory", { subcategoryName })}
          </BreadcrumbPageComponent>
        </BreadcrumbListComponent>
      </BreadcrumbComponent>
    </div>
  );
};
