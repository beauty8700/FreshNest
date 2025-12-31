import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item._id);
      return;
    }
    try {
      setLoading(true);
      // Use productId for update endpoint
      await API.put(`/cart/update/${item.product._id}`, { quantity: newQuantity });
      fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto pt-20">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Shopping Cart 🛒</h2>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-20">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Shopping Cart 🛒</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">{item.product?.name}</h3>
                <p className="text-gray-600">₹{item.product?.price} per {item.product?.unit || 'unit'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                    disabled={loading}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-700">
                  ₹{(item.product?.price || 0) * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 text-sm mt-2 hover:underline"
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold text-green-800 mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-700">₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

