import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./List.css";
import axios from "axios";
import { backendURL } from "../../API/API";
import { toast, Bounce } from "react-toastify";

const List = () => {
  const toastCont = useMemo(
    () => ({
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    }),
    []
  );

  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    const response = await axios.get(`${backendURL}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error", toastCont);
    }
  }, [toastCont]);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${backendURL}/api/food/remove`, {
      id: foodId,
    });

    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message, toastCont);
    } else {
      toast.error(response.data.message, toastCont);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Sl.No.</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{index + 1}</p>
              <img
                src={`${backendURL}/images/${item.image}`}
                alt="broken_image"
              />
              <p>{item.name}</p>
              <p title="Item Category">{item.category}</p>
              <p>$ {item.price}</p>
              <p
                className="cursor removeBtn"
                onClick={() => removeFood(item._id)}
                title="Remove"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
