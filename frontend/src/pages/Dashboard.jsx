import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect farmers to farmer dashboard
    if (user?.userType === "farmer") {
      navigate("/farmer-dashboard");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my-orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="pt-20 text-center">Loading...</div>;
  }

  // Don't render if user is a farmer (will redirect)
  if (user.userType === "farmer") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto pt-20">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Dashboard 👤</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800 mb-4">Profile Information</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || "Not provided"}</p>
            <p><span className="font-semibold">Role:</span> {user.userType || "customer"}</p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-left"
            >
              🛒 View Cart
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-left"
            >
              📦 My Orders
            </button>
            <button
              onClick={() => navigate("/wishlist")}
              className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-left"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-green-800 mb-4">Recent Orders</h3>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-700">₹{order.totalAmount}</p>
                    <p className={`text-sm ${
                      order.status === 'delivered' ? 'text-green-600' :
                      order.status === 'processing' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`}>
                      {order.status || order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {orders.length > 5 && (
              <button
                onClick={() => navigate("/orders")}
                className="text-green-700 hover:underline"
              >
                View all orders →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

