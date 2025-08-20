import { useCartStore } from "../store/cart";

function CartContent() {
  const { cart, removeFromCart } = useCartStore();

  return (
    <div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="flex justify-between border p-2">
            <span>{item.name} (${item.price})</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default CartContent;