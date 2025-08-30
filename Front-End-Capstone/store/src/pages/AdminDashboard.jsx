import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  fetchProducts,
  createProduct,
  fetchCategories,
  createCategory,
  fetchProductDetails,
  createProductDetail,
} from "../utils/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState([]);
  

  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: null,
  });

  const [newCategory, setNewCategory] = useState({
    category_id: "",
    category_name: "",
  });

  const [newDetail, setNewDetail] = useState({
    product: "",
    category: "",
    stock_quantity: 0,
    sku: "",
  });




  

  // Load data
  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
    fetchCategories().then((res) => setCategories(res.data));
    fetchProductDetails().then((res) => setDetails(res.data));
  }, []);

  // Handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) =>
      formData.append(key, value)
    );

    await createProduct(formData);
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    await createCategory(newCategory);
    const res = await fetchCategories();
    setCategories(res.data);
  };

  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    await createProductDetail(newDetail);
    const res = await fetchProductDetails();
    setDetails(res.data);
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users/profile/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
      },
    })
    .then(response => setUser(response.data))
    .catch(error => console.error("Error fetching user:", error));
  }, []);

 
  return (
    <div className="p-6 space-y-10">
      {!user ? (
        <p>Loading...</p>
      ) : user.is_superuser ? (
        <h2 className="text-2xl font-bold">Welcome Admin {user.username}</h2>
      ) : (
        <h2 className="text-xl text-red-600">You are not an Admin</h2>
      )}
  
      {user && user.is_superuser && (
        <>
          {/* PRODUCTS */}
          <section className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Add Product</h2>
            <form onSubmit={handleProductSubmit} className="space-y-2">
              {/* Product form fields */}
            </form>
  
            <h3 className="mt-4 font-semibold">Existing Products</h3>
            <ul className="list-disc ml-6">
              {products.map((p) => (
                <li key={p.id}>
                  {p.product_name} - ${p.product_price}
                </li>
              ))}
            </ul>
          </section>
  
          {/* CATEGORIES */}
          <section className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Add Category</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-2">
              {/* Category form fields */}
            </form>
  
            <h3 className="mt-4 font-semibold">Existing Categories</h3>
            <ul className="list-disc ml-6">
              {categories.map((c) => (
                <li key={c.id}>{c.category_name}</li>
              ))}
            </ul>
          </section>
  
          {/* PRODUCT DETAILS */}
          <section className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Add Product Details</h2>
            <form onSubmit={handleDetailSubmit} className="space-y-2">
              {/* Details form fields */}
            </form>
  
            <h3 className="mt-4 font-semibold">Existing Details</h3>
            <ul className="list-disc ml-6">
              {details.map((d) => (
                <li key={d.id}>
                  SKU: {d.sku} | Stock: {d.stock_quantity}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
