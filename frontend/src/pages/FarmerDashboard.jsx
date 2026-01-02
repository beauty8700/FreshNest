import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { toast } from "react-toastify";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // "products" or "orders"
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "vegetable",
    stock: "",
    unit: "kg",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (user?.userType === "farmer") {
      fetchProducts();
      fetchOrders();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/my-products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await API.get("/orders/farmer-orders");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, form);
        toast.success("Product updated successfully!");
      } else {
        await API.post("/products", form);
        toast.success("Product created successfully!");
      }
      setShowForm(false);
      setEditingProduct(null);
      setForm({ name: "", description: "", price: "", category: "vegetable", stock: "", unit: "kg", image: "" });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      stock: product.stock,
      unit: product.unit,
      image: product.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await API.delete(`/products/${productId}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", category: "vegetable", stock: "", unit: "kg", image: "" });
  };

  if (user?.userType !== "farmer") {
    return (
      <div className="max-w-6xl mx-auto pt-20 text-center">
        <p className="text-red-600">Access denied. This page is for farmers only.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-800">Farmer Dashboard 🌾</h2>
        {activeTab === "products" && (
          <button
            onClick={() => {
              handleCancel();
              setShowForm(!showForm);
            }}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "products"
              ? "text-green-700 border-b-2 border-green-700"
              : "text-gray-600 hover:text-green-700"
          }`}
        >
          My Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "orders"
              ? "text-green-700 border-b-2 border-green-700"
              : "text-gray-600 hover:text-green-700"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {activeTab === "products" && (
        <>
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 md:col-span-2"
                />
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                  <option value="grain">Grain</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  required
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit (kg, piece, etc)"
                  value={form.unit}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 md:col-span-2"
                />
                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-green-800 mb-4">My Products</h3>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No products yet. Add your first product!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                >
                  Add Product
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded mb-2 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <h4 className="font-semibold text-green-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description || "No description"}</p>
                    <p className="text-green-700 font-bold mt-2">₹{product.price} / {product.unit}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock} {product.unit}</p>
                    <p className="text-xs text-gray-400 capitalize">Category: {product.category}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800 mb-4">Orders for My Products</h3>
          {ordersLoading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders yet for your products</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg text-green-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Customer: {order.user?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "delivered"
                          ? "text-green-600 bg-green-100"
                          : order.status === "processing"
                          ? "text-blue-600 bg-blue-100"
                          : "text-yellow-600 bg-yellow-100"
                      }`}
                    >
                      {order.status || order.orderStatus || "pending"}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                          <span>
                            {item.product?.name || "Product"} x {item.quantity} {item.product?.unit || ""}
                          </span>
                          <span className="font-semibold">₹{(item.price || 0) * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-green-700">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;

