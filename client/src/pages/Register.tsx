import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateName = (name: string) => name.trim().length >= 3;

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password); // at least 8 chars, 1 letter, 1 number

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setError("Invalid email format");
      toast.error("Invalid email format");
      return;
    }

    if (!validatePassword(form.password)) {
      const msg =
        "Password must be at least 8 characters long and include at least one letter and one number";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!validateName(form.name)) {
      const msg = "Name must be at least 3 characters long";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message || "Registration failed");
          }
          return res.json();
        }),
        {
          loading: "Registering...",
          success: "Registered successfully!",
          error: (err) =>
            typeof err === "string"
              ? err
              : err?.message || "Registration failed",
        }
      );

      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
