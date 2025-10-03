import { CMSRendererContent } from "@/components/cms/cms-renderer";

export type File = {
  id: string;
  name: string;
  src: string;
  ext: string;
};

export type Image = {
  id: number;
  alt: string;
  placeholder: string | null;
  thumbnail: {
    src: string;
    width: number;
    height: number;
  };
  small: {
    src: string;
    width: number;
    height: number;
  };
  medium: {
    src: string;
    width: number;
    height: number;
  };
  large: {
    src: string;
    width: number;
    height: number;
  };
  original: {
    src: string;
    width: number;
    height: number;
  };
};

export type Subcategory = {
  name: string;
  slug: string;
  content: string;
  media: Image | null;
};

export type Category = {
  name: string;
  slug: string;
  content: string;
  media: Image | null;
};

export type Product = {
  name: string;
  slug: string;
  description: string;
  brief: string;
  sortingIndex: number;
  large: boolean;
  files: (File | null)[];
  media: (Image | null)[];
  category: {
    name: string;
    slug: string;
  };
  subcategory: {
    name: string;
    slug: string;
  };
  models: ProductModel[];
};

export type ProductModel = {
  id: string;
  name: string;
  supplier: string;
  code: string;
  weight: number;
  volume: number;
  height: number;
  length: number;
  diameter: number;
  depth: number;
  safetyAreaLength: number;
  safetyAreaDepth: number;
  fallHeight: number;
  weightUnit: string;
  volumeUnit: string;
  heightUnit: string;
  lengthUnit: string;
  diameterUnit: string;
  depthUnit: string;
  safetyAreaLengthUnit: string;
  safetyAreaDepthUnit: string;
  fallHeightUnit: string;
  materials: ProductModelMaterial[];
  options: ProductModelOption[];
  mediaIndex: number;
  media: Image | null;
};

export type ProductModelMaterial = {
  percentage: number;
  name: string;
};

export type ProductModelOption = {
  name: string;
  values: string[];
};

export type Slug = {
  name: string;
  slug: string;
};

export type CategorySlug = Slug;

export type CaseStudySlug = Slug;

export type SubcategorySlug = {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    slug: string;
  }[];
};

export type ProductSlug = {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    slug: string;
    products: {
      name: string;
      slug: string;
    }[];
  }[];
};

export type Wishlist = {
  count: number;
  products: {
    [categorySlug: string]: {
      [subcategorySlug: string]: {
        [productSlug: string]: {
          product: Product;
          count: number;
          models: {
            [productModelId: string]: {
              count: number;
              entries: {
                [wishlistEntryId: string]: WishlistEntry;
              };
            };
          };
        };
      };
    };
  };
};

export type WishlistEntries = {
  product: Product;
  entryId: string;
  entry: WishlistEntry;
}[];

export type WishlistEntry = {
  id: string;
  productModel: ProductModel;
  options: { name: string; value: string }[];
  count: number;
  notes: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  description: string;
  content: CMSRendererContent;
  media: Image | null;
};

export type Catalogue = {
  id: number;
  content: string;
  file: File | null;
  media: Image | null;
};

export type QuoteInput = {
  language: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  postalCode: string;
  notes: string | null;
  entries: {
    category: string;
    subcategory: string;
    product: string;
    model: string;
    count: number;
    notes: string;
    options: { name: string; value: string }[];
  }[];
};
