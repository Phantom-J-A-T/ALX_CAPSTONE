import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between bg-gray-900 text-white p-4">
      <h1 className="font-bold text-xl">E-Store</h1>
      <ul className="flex gap-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
