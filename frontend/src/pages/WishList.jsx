import { useEffect, useState } from "react";
import API from "../services/api";

const WishList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/wishlist").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="page-title">My Wishlist ❤️</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
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
