import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#0B4A8C]">Authenticating...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-[#C5A059] w-full max-w-md">
        <h2 className="text-3xl font-serif text-[#0B4A8C] mb-6 text-center">Royal Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <input 
          type="text" name="username" placeholder="Username" required
          className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setForm({...form, username: e.target.value})}
        />
        <input 
          type="password" name="password" placeholder="Password" required
          className="w-full p-3 mb-6 border rounded"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button className="w-full py-3 bg-[#0B4A8C] text-white rounded-full font-bold hover:bg-opacity-90">
          Enter Store
        </button>
      </form>
    </div>
  );
}

export default Login;