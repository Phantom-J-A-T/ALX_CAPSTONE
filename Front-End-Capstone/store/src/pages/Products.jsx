import ProductCard from "../components/ProductCard";
import products from "../data/product.json";

export default function Products() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}
