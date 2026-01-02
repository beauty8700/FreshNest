import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShopItem({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); 

    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (user?.userType === "farmer") {
      toast.error("Farmers cannot add items to cart");
      return;
    }

    setLoading(true);
    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
      <img
        src={product.image || "https://via.placeholder.com/200x160?text=No+Image"}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-semibold mt-2 text-green-800">{product.name}</h3>
      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
      <p className="text-green-700 font-bold">₹{product.price} / {product.unit || "kg"}</p>
      <p className="text-xs text-gray-400">Stock: {product.stock || 0} {product.unit || "kg"}</p>
      <button
        onClick={handleAddToCart}
        disabled={loading || product.stock <= 0}
        className="mt-2 w-full bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

