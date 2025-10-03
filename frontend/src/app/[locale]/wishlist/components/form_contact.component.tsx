"use client";

import { FormContactComponent } from "@/components/forms/form_contact";
import { useWishlistContext } from "@/contexts/wishlist";

export const WishlistPageFormContactComponent: React.FC = () => {
  const { entries, loading } = useWishlistContext();

  return <FormContactComponent entries={entries} disabled={loading} />;
};
