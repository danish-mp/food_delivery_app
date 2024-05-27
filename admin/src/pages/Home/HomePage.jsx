import React from "react";
import "./HomePage.css";
import { assets } from "../../assets/assets";

const HomePage = () => {
  return (
    <div className="robot-container">
      <img src={assets.robot} alt="robot" />
      <h1>
        Welcome <span>Admin</span>
      </h1>
    </div>
  );
};

export default HomePage;
