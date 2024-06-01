import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../asset/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken, toastCont } = useContext(StoreContext);

  const [spin, setSpin] = useState(false);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setData((data) => ({ ...data, [name]: value }));
  };

  const guestUserHandler = (event) => {
    event.preventDefault();
    setData({
      ...data,
      email: "guest@example.com",
      password: "#1234567",
    });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setSpin(true);
    let newUrl = url;

    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setSpin(false);
      setShowLogin(false);
    } else {
      toast.error(response.data.message, toastCont);
      setSpin(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross_icon"
          />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <button className="spinner" type="submit">
          {currentState === "Login"
            ? (spin && <div className="spin"></div>) || "Login"
            : (spin && <div className="spin"></div>) || "Create account"}
        </button>

        {currentState === "Login" ? (
          <button
            type="submit"
            className="guest-user-btn"
            onClick={(event) => guestUserHandler(event)}
          >
            Get guest user credentials
          </button>
        ) : (
          <></>
        )}

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
