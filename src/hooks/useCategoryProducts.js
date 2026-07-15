import { useCallback, useEffect, useState } from "react";
import { getUploads, subscribeToUploads } from "../utils/adminStore";

export function useCategoryProducts(categoryKey, baseProducts) {
  const [uploads, setUploads] = useState(() => getUploads(categoryKey));

  const refresh = useCallback(() => setUploads(getUploads(categoryKey)), [categoryKey]);

  useEffect(() => {
    refresh();
    return subscribeToUploads(refresh);
  }, [refresh]);

  const uploadedProducts = uploads.map((u) => {
    const images = u.images && u.images.length ? u.images : u.img ? [u.img] : [];
    return {
      id: u.id,
      name: u.name,
      price: 0,
      compareAt: 0,
      img: images[0] || "",
      images,
      sizes: [],
      inStock: true,
    };
  });

  return [...uploadedProducts, ...baseProducts];
}
