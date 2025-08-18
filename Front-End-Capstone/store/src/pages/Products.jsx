import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Products;
