import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import ManualOrderFormPage from "./pages/ManualOrderFormPage";
import "./App.css";

function Layout({ children, searchTerm, setSearchTerm }) {
  const location = useLocation();
  const hideLayout = ["/", "/signup"].includes(location.pathname);

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      {!hideLayout && <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      <main className="grow">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Support both path variants */}
          <Route path="/manual-order" element={<ManualOrderFormPage />} />
          <Route path="/order" element={<ManualOrderFormPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;