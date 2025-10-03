import { merge } from "lodash";

import { Product, ProductModel, Wishlist } from "@/lib/types";

export type WishlistState = Wishlist;

/*****************************/
/********** ACTIONS **********/
/*****************************/

/* INIT HANDLER */

const WishlistHandlerInit = (
  _: WishlistState,
  { payload }: { payload: WishlistState },
): WishlistState => payload;

/* ADD HANDLER */

const WishlistHandlerAddEntry = (
  state: WishlistState,
  {
    payload: {
      product,
      productModel,
      productWishlistEntryId,
      options,
      count = 1,
      notes,
    },
  }: {
    payload: {
      product: Product;
      productModel: ProductModel;
      productWishlistEntryId: string;
      options: { name: string; value: string }[];
      count: number;
      notes: string;
    };
  },
): WishlistState =>
  merge({}, state, {
    count: (state.count ?? 0) + count,
    products: {
      [product.category.slug]: {
        [product.subcategory.slug]: {
          [product.slug]: {
            product,
            count:
              (state.products?.[product.category.slug]?.[
                product.subcategory.slug
              ]?.[product.slug]?.count ?? 0) + count,
            models: {
              [productModel.id]: {
                count:
                  (state.products?.[product.category.slug]?.[
                    product.subcategory.slug
                  ]?.[product.slug]?.models?.[productModel.id]?.count ?? 0) +
                  count,
                entries: {
                  [productWishlistEntryId]: {
                    id: productWishlistEntryId,
                    productModel,
                    options,
                    count,
                    notes,
                  },
                },
              },
            },
          },
        },
      },
    },
  } as WishlistState);

/* DELETE HANDLER */

const WishlistHandlerDeleteEntry = (
  state: WishlistState,
  {
    payload: {
      categorySlug,
      subcategorySlug,
      productSlug,
      productModel,
      productWishlistEntryId,
    },
  }: {
    payload: {
      categorySlug: string;
      subcategorySlug: string;
      productSlug: string;
      productModel: ProductModel;
      productWishlistEntryId: string;
    };
  },
): WishlistState => {
  const delta =
    -state.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]?.models?.[
      productModel.id
    ]?.entries?.[productWishlistEntryId].count ?? 0;

  const result = merge({}, state, {
    count: (state.count ?? 0) + delta,
    products: {
      [categorySlug]: {
        [subcategorySlug]: {
          [productSlug]: {
            count:
              (state.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]
                ?.count ?? 0) + delta,
            models: {
              [productModel.id]: {
                count:
                  (state.products?.[categorySlug]?.[subcategorySlug]?.[
                    productSlug
                  ]?.models?.[productModel.id]?.count ?? 0) + delta,
              },
            },
          },
        },
      },
    },
  } as WishlistState);

  delete result.products?.[categorySlug]?.[subcategorySlug]?.[productSlug]
    ?.models?.[productModel.id]?.entries?.[productWishlistEntryId];

  return result;
};

/* UPDATE ENTRY HANDLER */

const WishlistHandlerUpdateEntry = (
  state: WishlistState,
  {
    payload: {
      product,
      productModel,
      productWishlistEntryId,
      count = 0,
      notes,
      options,
    },
  }: {
    payload: {
      product: Product;
      productModel: ProductModel;
      productWishlistEntryId: string;
      count?: number;
      notes?: string;
      options?: { name: string; value: string }[];
    };
  },
): WishlistState => {
  const delta =
    count == 0
      ? 0
      : count -
        state.products?.[product.category.slug]?.[product.subcategory.slug]?.[
          product.slug
        ]?.models?.[productModel.id]?.entries?.[productWishlistEntryId].count;

  return merge({}, state, {
    count: (state.count ?? 0) + delta,
    products: {
      [product.category.slug]: {
        [product.subcategory.slug]: {
          [product.slug]: {
            count:
              (state.products?.[product.category.slug]?.[
                product.subcategory.slug
              ]?.[product.slug]?.count ?? 0) + delta,
            models: {
              [productModel.id]: {
                count:
                  (state.products?.[product.category.slug]?.[
                    product.subcategory.slug
                  ]?.[product.slug]?.models?.[productModel.id]?.count ?? 0) +
                  delta,
                entries: {
                  [productWishlistEntryId]: {
                    ...(count && { count }),
                    ...(options && { options }),
                    notes,
                  },
                },
              },
            },
          },
        },
      },
    },
  } as WishlistState);
};

/*****************************/
/********** REDUCER **********/
/*****************************/

export const WishlistReducer = (
  state: WishlistState,
  action: { type: string; payload: any },
): WishlistState => {
  switch (action.type) {
    case "init":
      return WishlistHandlerInit(state, action);
    case "add_entry":
      return WishlistHandlerAddEntry(state, action);
    case "delete_entry":
      return WishlistHandlerDeleteEntry(state, action);
    case "update_entry":
      return WishlistHandlerUpdateEntry(state, action);
    default:
      return state;
  }
};

/*****************************/
/********** ACTIONS **********/
/*****************************/

export const wishlistActionInit = (payload: WishlistState) => ({
  type: "init",
  payload,
});

export const wishlistActionAddEntry = (payload: {
  product: Product;
  productModel: ProductModel;
  productWishlistEntryId: string;
  options: { name: string; value: string }[];
  count: number;
  notes: string;
}) => ({
  type: "add_entry",
  payload,
});

export const wishlistActionDeleteEntry = (payload: {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
  productModel: ProductModel;
  productWishlistEntryId: string;
}) => ({
  type: "delete_entry",
  payload,
});

export const wishlistActionUpdateEntry = (payload: {
  product: Product;
  productModel: ProductModel;
  productWishlistEntryId: string;
  count?: number;
  notes?: string;
  options?: { name: string; value: string }[];
}) => ({ type: "update_entry", payload });

/***********************************/
/********** INITIAL STATE **********/
/***********************************/

export const initialState: WishlistState = {
  products: {},
  count: 0,
};
