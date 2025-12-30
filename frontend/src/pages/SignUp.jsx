import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7f2]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Create Account 🌱
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="input"
        />

        <select
          name="userType"
          onChange={handleChange}
          className="input"
        >
          <option value="user">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>

        <button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
