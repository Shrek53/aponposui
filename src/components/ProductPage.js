import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  // Handle adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const productData = { name, price, stock };

    axios
      .post("http://localhost:8000/api/products/", productData)
      .then((response) => {
        setMessage("Product added successfully!");
        setName("");
        setPrice("");
        setStock("");
        fetchProducts(); // Refresh the product list
      })
      .catch((error) => {
        setMessage("Failed to add product.");
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="product-page">
        <header>
          <h1>Products</h1>
          <p>Manage your product inventory here.</p>
          <Link to="/" className="home-button">
            HOME
          </Link>
        </header>
        {/* Add Product Form */}
        <div className="add-product-section">
          <h2>Add a New Product</h2>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleAddProduct} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity:</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="product-list-section">
          <h2>Product List</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
