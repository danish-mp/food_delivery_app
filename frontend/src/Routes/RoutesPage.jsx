import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import "./RoutesPage.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import Verify from "../pages/Verify/Verify";
import MyOrders from "../pages/MyOrders/MyOrders";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoutesPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? (
        <>
          <ToastContainer />
          <LoginPopup setShowLogin={setShowLogin} />
        </>
      ) : (
        <>
          <ToastContainer />

          <Navbar setShowLogin={setShowLogin} />

          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={<Cart setShowLogin={setShowLogin} />}
              />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default RoutesPage;
