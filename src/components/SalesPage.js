import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SalesPage.css";
import Layout from "./Layout";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchSales();
  }, []);

  const fetchSales = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/sales/")
      .then((response) => {
        setSales(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
        setLoading(false);
      });
  };

  const fetchCustomers = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/customers/")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  };

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

  const addSaleItem = () => {
    setSaleItems([...saleItems, { product: "", quantity: 1, discount: 0 }]);
  };

  const handleSaleItemChange = (index, field, value) => {
    const updatedItems = [...saleItems];
    updatedItems[index][field] = value;
    setSaleItems(updatedItems);
  };

  const handleRemoveSaleItem = (index) => {
    const updatedItems = saleItems.filter((_, i) => i !== index);
    setSaleItems(updatedItems);
  };

  const handleCreateSale = (e) => {
    e.preventDefault();

    const saleData = {
      customer,
      saleitems: saleItems,
      overall_discount: overallDiscount,
    };

    axios
      .post("http://localhost:8000/api/sales/", saleData)
      .then(() => {
        setMessage("Sale created successfully!");
        setCustomer("");
        setSaleItems([]);
        setOverallDiscount(0);
        fetchSales();
      })
      .catch((error) => {
        setMessage("Failed to create sale.");
        console.error("Error creating sale:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="sale-page">
        <header>
          <h1>Sales</h1>
          <p>Manage your sales here.</p>
          <Link to="/" className="home-button">
            HOME
          </Link>
        </header>

        <div className="create-sale-section">
          <h2>Create a New Sale</h2>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleCreateSale} className="sale-form">
            <div className="form-group">
              <label htmlFor="customer">Customer:</label>
              <select
                id="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sale-items">
              <h3>Sale Items</h3>
              {saleItems.map((item, index) => (
                <div key={index} className="sale-item">
                  <select
                    value={item.product}
                    onChange={(e) =>
                      handleSaleItemChange(index, "product", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleSaleItemChange(index, "quantity", e.target.value)
                    }
                    min="1"
                    required
                  />
                  <label htmlFor={`discount-${index}`}>Discount:</label>
                  <input
                    type="number"
                    id={`discount-${index}`}
                    value={item.discount}
                    onChange={(e) =>
                      handleSaleItemChange(index, "discount", e.target.value)
                    }
                    defaultValue="0"
                    min="0"
                    step="1"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSaleItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSaleItem}>
                Add Item
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="overall_discount">Overall Discount:</label>
              <input
                type="number"
                id="overall_discount"
                value={overallDiscount}
                onChange={(e) => setOverallDiscount(e.target.value)}
                defaultValue="0"
                min="0"
                step="1"
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={saleItems.length === 0}
            >
              Create Sale
            </button>
          </form>
        </div>

        <div className="sale-list-section">
          <h2>Sale List</h2>
          <table className="sale-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Overall Discount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.id}</td>
                    <td>{sale.customer_name}</td>
                    <td>{sale.total_amount}</td>
                    <td>{sale.overall_discount}</td>
                    <td>
                      {sale.saleitems.map((item, idx) => (
                        <div key={idx}>
                          {item.quantity} x {item.product.name} @{" "}
                          {item.price_per_unit - item.discount}
                          {item.discount > 0
                            ? " ( - " + item.discount + " )"
                            : ""}
                          {/* Product: {item.product.name} Quantity: {item.quantity}
                          , Discount: {item.discount}, Price:{" "} */}
                          {/* {item.price_per_unit} */}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No sales data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SalesPage;
