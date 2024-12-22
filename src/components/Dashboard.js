import React from "react";
import "./Dashboard.css";
import { Link } from "react-router";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h1>POS Dashboard</h1>
        <div className="dashboard-grid">
          <div className="card">
            <Link to="/sales" className="button">
              <h2>Sales</h2>
              <p>$10,000</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/products" className="button">
              <h2>Products</h2>
              <p>150</p>
            </Link>
          </div>
          <div className="card">
            <Link to="/customers" className="button">
              <h2>Customers</h2>
              <p>120</p>
            </Link>
          </div>
          <div className="card">
            <h2>Recent Transactions</h2>
            <ul>
              <li>Invoice #1001 - $200</li>
              <li>Invoice #1002 - $150</li>
              <li>Invoice #1003 - $300</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
