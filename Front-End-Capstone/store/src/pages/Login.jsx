import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      setError("");
      setSuccess(`Welcome back, ${form.username}! 🎉`);

      // Delay redirect so user sees success message
      setTimeout(() => {
        navigate("/home"); // ✅ redirect to Home page
      }, 1200);
    } catch {
      setSuccess("");
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 max-w-md w-full bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/Signup"
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
