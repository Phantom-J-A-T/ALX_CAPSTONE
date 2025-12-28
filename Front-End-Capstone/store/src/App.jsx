import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react"; // Added useState
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

function Layout({ children, searchTerm, setSearchTerm }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col"> {/* Royal soft-cream background */}
      {!hideLayout && (
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      
      <main className="grow">
        {/* We pass the searchTerm to the children components */}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { searchTerm });
        })}
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State lives here

  return (
    <Router>
      <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Products now receives the searchTerm prop from Layout */}
          <Route path="/products" element={<Products searchTerm={searchTerm} />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<ManualOrderFormPage />} />
          <Route path="/manual-order" element={<ManualOrderFormPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;