import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Loading from "../components/Loading"; // ✅ Import your loading component

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Local loading state
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start Loading
    setError("");
    
    try {
      await login(form.username, form.password);
      setSuccess(`Welcome back, ${form.username}! 🎉`);
      setTimeout(() => navigate("/home"), 1200);
    } catch {
      setSuccess("");
      setError("Invalid credentials. Please check your details.");
      setIsLoading(false); // ❌ Stop Loading so they can try again
    }
  };

  // ✅ Render Loading Component if authenticating
  if (isLoading && !error) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* ... Form and Visual Side code remains the same as previous step ... */}
      {/* Ensure the form uses onSubmit={handleSubmit} */}
    </div>
  );
}

export default Login;