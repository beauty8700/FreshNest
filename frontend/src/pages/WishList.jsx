import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const WishList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Note: Wishlist endpoint not implemented in backend yet
        // For now, show empty state gracefully
        // const res = await API.get("/wishlist");
        // setItems(res.data);
        setItems([]);
      } catch (error) {
        console.error("Wishlist not available:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-20">
      <h2 className="text-3xl font-bold text-green-800 mb-6">My Wishlist ❤️</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm">Wishlist feature coming soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-green-800">
                {item.product.name}
              </h3>
              <p className="text-brown-600">₹{item.product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
