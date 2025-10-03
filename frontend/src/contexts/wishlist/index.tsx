"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useState,
} from "react";

import { WishlistEntries } from "@/lib/types";

import {
  wishlistActionInit,
  WishlistReducer,
  WishlistState,
  initialState,
} from "./wishlist.reducer";

export const WishlistContext = createContext<{
  state: WishlistState;
  entries: WishlistEntries;
  dispatch: React.Dispatch<any>;
  loading: boolean;
}>({ state: initialState, entries: [], dispatch: () => {}, loading: true });

export const WishlistProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const [state, dispatch] = useReducer(WishlistReducer, initialState);

  const entries = useMemo(
    () =>
      Object.values(state.products)
        .flat()
        .map((category) => Object.values(category))
        .flat()
        .map((subcategory) => Object.values(subcategory))
        .flat()
        .map(({ product, models }) =>
          Object.values(models).map((model) => ({
            product,
            model,
          })),
        )
        .flat()
        .map(({ product, model }) =>
          Object.entries(model.entries).map(([entryId, entry]) => ({
            product,
            entryId,
            entry,
          })),
        )
        .flat(),
    [state],
  );

  const wishlistContextValue = useMemo(
    () => ({ state, entries, dispatch, loading: !isHydrated }),
    [state, entries, dispatch, isHydrated],
  );

  // Initializes wishlist state to local storage

  useEffect(() => {
    try {
      const wishlistState = JSON.parse(
        localStorage.getItem("wishlistState") ?? "",
      );

      if (wishlistState) {
        dispatch(wishlistActionInit(wishlistState));
      }
    } catch {}

    setIsHydrated(true);
  }, []);

  // Persists wishlist state to local storage

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("wishlistState", JSON.stringify(state));
    }
  }, [state, isHydrated]);

  return (
    <WishlistContext.Provider value={wishlistContextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
