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
import { Category } from "@/lib/types";

export interface BreadcrumbSubcategoriesProps {
  category: Category;
}

export const SubcategoriesBreadcrumbComponent: React.FC<
  BreadcrumbSubcategoriesProps
> = ({ category: { name: categoryName } }: BreadcrumbSubcategoriesProps) => {
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
          <BreadcrumbPageComponent>
            {t("category", { categoryName })}
          </BreadcrumbPageComponent>
        </BreadcrumbListComponent>
      </BreadcrumbComponent>
    </div>
  );
};
