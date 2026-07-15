import CollectionPage from "../components/CollectionPage";
import { PANTS } from "../data/pants";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

export default function Pants() {
  const products = useCategoryProducts("pants", PANTS);
  return <CollectionPage title="Pants" products={products} />;
}
