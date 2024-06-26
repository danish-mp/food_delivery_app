import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { backendURL, toastCont } from "../../API/API";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${backendURL}/api/order/list`);

    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error", toastCont);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${backendURL}/api/order/status`, {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error("Error", toastCont);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel_icon" />

              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>

                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div className="order-item-address">
                  <p>{`${order.address.street}, `}</p>
                  <p>
                    {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                  </p>
                </div>

                <p className="order-item-phone">
                  Phone <b>{order.address.phone}</b>
                </p>
              </div>

              <p>Items: {order.items.length}</p>
              <b>$ {order.amount}</b>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="spinner">
            <div className="loadingio-spinner-magnify-nq4q5u6dq7r">
              <div className="ldio-x2uulkbinbj">
                <div>
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2>Please wait...</h2>
        </>
      )}
    </div>
  );
};

export default Orders;
