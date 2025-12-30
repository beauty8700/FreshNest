import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 w-full mt-2" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button className="bg-green-700 text-white px-4 py-2 mt-4 w-full">
        Login
      </button>
    </form>
  );
}
