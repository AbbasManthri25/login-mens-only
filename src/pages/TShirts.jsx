import CollectionPage from "../components/CollectionPage";
import { TSHIRTS } from "../data/tshirts";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

export default function TShirts() {
  const products = useCategoryProducts("tshirts", TSHIRTS);
  return <CollectionPage title="T-Shirts" products={products} />;
}
