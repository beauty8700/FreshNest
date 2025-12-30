import { useEffect, useState } from "react";
import API from "../services/api";
import ShopItem from "../components/ShopItem";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        🌱 FreshNest Organic Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map(p => (
          <ShopItem key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
