import { useTranslations } from "next-intl";

import {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbPageComponent,
} from "@/components/breadcrumb";

export interface CategoriesBreadcrumbProps {}

export const CategoriesBreadcrumbComponent: React.FC = () => {
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
          <BreadcrumbPageComponent>{t("products")}</BreadcrumbPageComponent>
        </BreadcrumbListComponent>
      </BreadcrumbComponent>
    </div>
  );
};
