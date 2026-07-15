import CollectionPage from "../components/CollectionPage";
import { SHIRTS } from "../data/shirts";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

export default function Shirts() {
  const products = useCategoryProducts("shirts", SHIRTS);
  return <CollectionPage title="Shirts" products={products} />;
}
