import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post("/cart", { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    }
  };

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
