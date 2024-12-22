import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import SalesPage from "./components/SalesPage";
import ProductPage from "./components/ProductPage";
import CustomerPage from "./components/CustomerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/customers" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
