import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../asset/assets";

function MyOrders() {
  const [data, setData] = useState([]);
  const [noOrder, setNoOrder] = useState(false);

  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setNoOrder(true);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {noOrder ? (
        <></>
      ) : (
        <h3 className="no-order-warning">
          No orders found! Please order any item.
        </h3>
      )}

      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel_icon" />

            <p>
              {order.items.map((item, index) => {
                //   avoid last item comma
                if (index === order.items.length - 1) {
                  return `${item.name} x ${item.quantity}`;
                } else {
                  return `${item.name} x ${item.quantity}, `;
                }
              })}
            </p>

            <p>$ {order.amount}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
