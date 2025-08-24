import { useState, useEffect } from "react";
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

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* PRODUCTS */}
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add Product</h2>
        <form onSubmit={handleProductSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Product ID"
            value={newProduct.product_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_id: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_name: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={newProduct.product_description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                product_description: e.target.value,
              })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.product_price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_price: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_image: e.target.files[0] })
            }
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
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
          <input
            type="text"
            placeholder="Category ID"
            value={newCategory.category_id}
            onChange={(e) =>
              setNewCategory({ ...newCategory, category_id: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.category_name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, category_name: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
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
          <select
            value={newDetail.product}
            onChange={(e) =>
              setNewDetail({ ...newDetail, product: e.target.value })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.product_name}
              </option>
            ))}
          </select>
          <select
            value={newDetail.category}
            onChange={(e) =>
              setNewDetail({ ...newDetail, category: e.target.value })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newDetail.stock_quantity}
            onChange={(e) =>
              setNewDetail({ ...newDetail, stock_quantity: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="SKU"
            value={newDetail.sku}
            onChange={(e) =>
              setNewDetail({ ...newDetail, sku: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Add Detail
          </button>
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
    </div>
  );
}

export default AdminDashboard;
