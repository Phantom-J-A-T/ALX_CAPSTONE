import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // NEW: State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false); 
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

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
        <h2 className="text-3xl font-serif text-[#0B4A8C] mb-6 text-center">
          Prince and Princess Store Login
        </h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <input 
          type="text" name="username" placeholder="Username" required
          className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setForm({...form, username: e.target.value})}
        />

        {/* Password Input Container */}
        <div className="relative mb-6">
          <input 
            type={showPassword ? "text" : "password"} // Dynamic type toggle
            name="password" 
            placeholder="Password" 
            required
            className="w-full p-3 border rounded pr-10" // Extra padding-right for icon
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          {/* Eye Icon Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0B4A8C]"
          >
            {showPassword ? (
              // Eye-Off Icon (Strikethrough)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
            ) : (
              // Eye Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button type="submit" className="w-full py-3 bg-[#0B4A8C] text-white rounded-full font-bold hover:bg-opacity-90">
            Enter Store
          </button>

          <Link
            to="/signup"
            className="bg-royal-gold text-white px-8 py-4 leading-snug rounded-2xl font-bold hover:bg-yellow-600 transition-all shadow-lg text-center opacity-90 hover:opacity-100"
          >
            Don't have an account yet? <strong>Sign Up</strong>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;