import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ShopItem from "../components/ShopItem";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4">
      {/* <img
          src={screen}
          alt="Fresh organic produce"
          className="h-full w-full object-cover"
        /> */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🌱 FreshNest Organic Store
        </h1>
        <p className="text-gray-600 text-lg">
          Fresh, organic produce directly from local farmers
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="cursor-pointer"
              >
                <ShopItem product={p} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/shop")}
              className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition text-lg"
            >
              View All Products →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
