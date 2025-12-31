import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("customer"); // "customer" or "farmer"

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password });
      toast.success("Login successful!");
      
      // Redirect based on user type
      // Get user from the login response or from context
      const userData = result?.user || JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.userType === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7f2] pt-20">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Login 🌱
        </h2>

        {/* User Type Selection */}
        <div className="mb-6 flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setUserType("customer")}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              userType === "customer"
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            👤 Customer
          </button>
          <button
            type="button"
            onClick={() => setUserType("farmer")}
            className={`flex-1 py-2 px-4 rounded-md transition ${
              userType === "farmer"
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            🌾 Farmer
          </button>
        </div>

        <form onSubmit={submit}>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : `Login as ${userType === "farmer" ? "Farmer" : "Customer"}`}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-700 font-medium">
            Sign Up
          </Link>
        </p>
        <p className="text-center text-xs mt-2 text-gray-500">
          {userType === "farmer"
            ? "Login to manage your products and view orders"
            : "Login to shop and track your orders"}
        </p>
      </div>
    </div>
  );
}
