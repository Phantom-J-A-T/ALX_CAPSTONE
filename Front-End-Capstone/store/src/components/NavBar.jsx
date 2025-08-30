import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function NavBar() {
  const { cart } = useCartStore();

  // calculate total items in cart
  const totalItems =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="flex justify-between bg-blue-700 text-white p-4 border rounded-md">
      <h1 className="font-bold text-xl">Prince and Princess Store</h1>

      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/" className="hover:font-bold">Home</Link>
        </li>
        <li>
          <Link to="/Products" className="hover:font-bold">Products</Link>
        </li>

        {/* Cart link with badge */}
        <li className="relative">
          <Link to="/Cart" className="hover:font-bold">
            🛒 Cart
          </Link>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {totalItems}
            </span>
          )}
        </li>

        <li>
          <Link to="/Login" className="hover:font-bold">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
