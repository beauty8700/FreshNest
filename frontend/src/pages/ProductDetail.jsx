import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Product not found");
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto pt-20 text-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto pt-20">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full h-96 object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold text-green-800">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600">{product.rating || 4.0}</span>
            </div>

            <p className="mt-4 text-gray-600">{product.description || "Fresh organic product"}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock || 0} {product.unit || 'kg'}</p>
            </div>

            <p className="mt-4 text-3xl font-semibold text-green-700">
              ₹{product.price} / {product.unit || 'kg'}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-gray-700">Quantity:</label>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
