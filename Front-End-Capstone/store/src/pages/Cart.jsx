import CartContent from "../context/CartContent";

export default function Cart() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <CartContent />
    </div>
  );
}
