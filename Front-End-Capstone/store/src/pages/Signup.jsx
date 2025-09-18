import { useState } from "react";
import { signup } from "../utils/api"; // ✅ signup API only
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await signup({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setSuccess("Account created successfully!");
      setError("");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });

      // ✅ redirect to login page after signup
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      if (err.response?.data) {
        const messages = Object.values(err.response.data).flat().join(" ");
        setError(messages);
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-md mx-auto border border-blue-500 rounded-md mt-10"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
