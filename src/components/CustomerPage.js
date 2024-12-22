import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerPage.css";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const customerData = { name, email, phone, address };

    axios
      .post("http://localhost:8000/api/customers/", customerData)
      .then((response) => {
        setMessage("Customer added successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        fetchCustomers();
      })
      .catch((error) => {
        setMessage("Failed to add customer.");
        console.error("Error adding customer:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-page">
      <header>
        <h1>Customer Management</h1>
        <p>View and manage your customers.</p>
        <Link to="/" className="home-button">
          HOME
        </Link>
      </header>
      <div className="add-customer-section">
        <h2>Add a New Customer</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleAddCustomer} className="customer-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Customer
          </button>
        </form>
      </div>
      <div className="customer-list-section">
        <h2>Customer List</h2>
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;
