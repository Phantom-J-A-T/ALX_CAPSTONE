import { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading"; // ✅ Import

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Local loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true); // ✅ Start Loading
    setError("");

    try {
      await signup({ username: form.username, email: form.email, password: form.password });
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Signup failed. Try again.");
      setIsLoading(false); // ❌ Stop Loading on error
    }
  };

  if (isLoading && !error) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* ... Form and Visual Side code remains the same ... */}
    </div>
  );
}


export default Signup;