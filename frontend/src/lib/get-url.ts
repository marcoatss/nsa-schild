export const getRootPageUrl = ({
  locale,
  full,
}: {
  locale: string;
  full: boolean;
}) => {
  if (full) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`;
  }

  return `/${locale}`;
};

export const getProductsPageUrl = ({
  locale,
  full,
}: {
  locale: string;
  full: boolean;
}) => {
  return getRootPageUrl({ locale, full }) + "/products";
};

export const getCategoryPageUrl = ({
  locale,
  full,
  categorySlug,
}: {
  locale: string;
  full: boolean;
  categorySlug: string;
}) => {
  return getProductsPageUrl({ locale, full }) + `/${categorySlug}`;
};

export const getSubcategoryPageUrl = ({
  locale,
  full,
  categorySlug,
  subcategorySlug,
}: {
  locale: string;
  full: boolean;
  categorySlug: string;
  subcategorySlug: string;
}) => {
  return (
    getCategoryPageUrl({ locale, full, categorySlug }) + `/${subcategorySlug}`
  );
};

export const getProductPageUrl = ({
  locale,
  full,
  categorySlug,
  subcategorySlug,
  productSlug,
}: {
  locale: string;
  full: boolean;
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
}) => {
  return (
    getSubcategoryPageUrl({ locale, full, categorySlug, subcategorySlug }) +
    `/${productSlug}`
  );
};
