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
import { Product } from "@/lib/types";

export interface ProductBreadcrumbProps {
  product: Product;
}

export const ProductBreadcrumbComponent: React.FC<ProductBreadcrumbProps> = ({
  product: {
    name: productName,
    category: { name: categoryName, slug: categorySlug },
    subcategory: { name: subcategoryName, slug: subcategorySlug },
  },
}: ProductBreadcrumbProps) => {
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
          <BreadcrumbItemComponent>
            <BreadcrumbLinkComponent asChild>
              <Link href={`/products/${categorySlug}/${subcategorySlug}`}>
                {t("subcategory", { subcategoryName })}
              </Link>
            </BreadcrumbLinkComponent>
          </BreadcrumbItemComponent>
          <BreadcrumbSeparator />
          <BreadcrumbPageComponent>
            {t("product", { productName })}
          </BreadcrumbPageComponent>
        </BreadcrumbListComponent>
      </BreadcrumbComponent>
    </div>
  );
};
