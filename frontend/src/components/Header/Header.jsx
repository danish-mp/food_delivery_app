import React from "react";
import "./Header.css";
import "./Responsive.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>

        <p>
          Choose from a diserve menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <button>View Menu</button>
      </div>
    </header>
  );
};

export default Header;
