import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.zomato_Logo} alt="zomato_Logo" />
      <img className="profile" src={assets.profile_image} alt="profile_image" />
    </div>
  );
};

export default Navbar;
