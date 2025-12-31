import { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate, Link } from "react-router-dom"; // ✅ MUST be imported
import Loading from "../components/Loading"; 

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true); 
    setError("");

    try {
      // Backend expects these exact keys
      await signup({ 
        username: form.username, 
        email: form.email, 
        password: form.password 
      });
      setSuccess("Account created successfully!");
      // Short delay so user sees the success message
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
      setIsLoading(false); 
    }
  };

  // Prevent "Blank Screen" by ensuring Loading only shows when explicitly triggered
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-royal-blue mb-2">Join the Palace</h1>
          <p className="text-gray-500 italic">Create your royal account today</p>
        </div>

        {error && <p className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">{error}</p>}
        {success && <p className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-6 text-center border border-green-100">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 outline-none transition-all"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 outline-none transition-all"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 outline-none transition-all"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 outline-none transition-all"
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-royal-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg active:scale-95 mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-royal-gold font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;