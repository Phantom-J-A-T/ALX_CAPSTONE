import { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await signup({ username: form.username, email: form.email, password: form.password });
      setSuccess("Account created successfully!");
      setError("");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/"), 1000); // Redirect to Login
    } catch (err) {
      setError(err.response?.data ? Object.values(err.response.data).flat().join(" ") : "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-royal-blue relative items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1601314167099-232775b3d6fd?q=80&w=1935" 
          alt="Luxury Grocery" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-white p-12 text-center">
          <h1 className="text-5xl font-serif mb-4">Join Prince and Princess Store</h1>
          <p className="text-royal-gold tracking-widest uppercase text-sm">Fine Foods • Aged Wines • Premium Living</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md w-full">
          <div className="text-center mb-10">
            <img src="/Prince and Princess Logo.png" alt="Logo" className="h-20 mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-royal-blue">Create Your Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-royal-gold outline-none transition-all" />
            
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-royal-gold outline-none transition-all" />

            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-royal-gold outline-none transition-all" />

            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-royal-gold outline-none transition-all" />

            {error && <p className="text-red-500 text-sm italic">{error}</p>}
            {success && <p className="text-green-600 text-sm font-bold">{success}</p>}

            <button type="submit" className="w-full bg-royal-blue text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg">
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Already registered? <Link to="/" className="text-royal-gold font-bold hover:underline">Return to Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;