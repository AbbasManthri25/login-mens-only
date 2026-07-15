import CollectionPage from "../components/CollectionPage";
import { TRACK_PANTS } from "../data/trackpants";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

export default function TrackPants() {
  const products = useCategoryProducts("trackpants", TRACK_PANTS);
  return <CollectionPage title="Track Pants" products={products} />;
}
