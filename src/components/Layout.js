import React from "react";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>POS System</h1>
      </header>
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
