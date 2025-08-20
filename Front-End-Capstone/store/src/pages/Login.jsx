import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert("Logged in!"); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 w-full"/>
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <p>Don't have an account yet?</p>
      <button><Link to='/Signup'>Sign Up</Link></button>
    </form>
  );
}
export default Login;