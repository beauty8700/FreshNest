import { useCart } from "../context/CartContext";

export default function ShopItem({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <img src={product.image} className="h-40 w-full object-cover" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-green-700 font-bold">₹{product.price}</p>
      <button
        onClick={() => addToCart(product._id)}
        className="mt-2 bg-green-700 text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
