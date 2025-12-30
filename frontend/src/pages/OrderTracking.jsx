import { useEffect, useState } from "react";
import API from "../services/api";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="page-title">My Orders 🚚</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <p className="font-semibold">
                Order ID: {order._id}
              </p>
              <p>Status: <span className="text-green-700">{order.status}</span></p>
              <p>Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
