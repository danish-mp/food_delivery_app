import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import "./Responsive.css";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const toastCont = {
  // position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  // theme: "dark",
  transition: Bounce,
};

const Cart = ({ setShowLogin }) => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const nextPageHandler = () => {
    if (!token) {
      setShowLogin(true);
    } else if (!getTotalCartAmount()) {
      toast.error("Add any item to cart", toastCont);
    } else {
      navigate("/order");
    }
  };

  let bag = 0;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-titles">
          <p>Sl.No.</p>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-titles cart-items-item">
                  <p>{(bag += 1)}</p>
                  <img src={url + "/images/" + item.image} alt="itemImage" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p
                    title="Remove"
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    x
                  </p>
                </div>

                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() ? 10 : 0}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {getTotalCartAmount() ? getTotalCartAmount() + 10 : 0}</b>
            </div>
          </div>

          <button onClick={nextPageHandler}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here.</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />

              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
