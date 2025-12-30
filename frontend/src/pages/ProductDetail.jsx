import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-bold text-green-800">
            {product.name}
          </h2>

          <p className="mt-2 text-gray-600">{product.description}</p>

          <p className="mt-4 text-xl font-semibold text-brown-700">
            ₹{product.price}
          </p>

          <button
            onClick={() => addToCart(product._id)}
            className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
