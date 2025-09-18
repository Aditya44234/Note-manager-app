import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Email validation regex pattern
  const validateEmail = (email) => {
    // Simple, common pattern for emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password strength check: min 8 chars, at least one uppercase, lowercase, number, special char
  const validatePassword = (password) => {
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < minLength) {
      return "Password must be at least 8 characters.";
    }
    if (!uppercasePattern.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowercasePattern.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!numberPattern.test(password)) {
      return "Password must include at least one number.";
    }
    if (!specialCharPattern.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  // Real-time input validation handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordValidationMsg = validatePassword(e.target.value);
    setPasswordError(passwordValidationMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Final validation before submit
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const passwordValidationMsg = validatePassword(password);
    if (passwordValidationMsg) {
      setPasswordError(passwordValidationMsg);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden font-poppins">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8 shadow-2xl ring-1 ring-purple-400">
        <h2 className="text-4xl font-extrabold text-center text-purple-300 mb-8">
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-purple-200 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-purple-400/50 bg-white/10 text-purple-200 placeholder-purple-400 placeholder-opacity-70 outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-purple-200 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-5 py-3 rounded-xl border ${
                emailError
                  ? "border-red-500 bg-red-100 text-red-700 placeholder-red-400"
                  : "border-purple-400/50 bg-white/10 text-purple-200 placeholder-purple-400 placeholder-opacity-70"
              } outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 transition`}
            />
            {emailError && (
              <p className="mt-1 text-red-500 text-sm font-medium">
                {emailError}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-purple-200 font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a secure password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-5 py-3 rounded-xl border ${
                passwordError
                  ? "border-red-500 bg-red-100 text-red-700 placeholder-red-400"
                  : "border-purple-400/50 bg-white/10 text-purple-200 placeholder-purple-400 placeholder-opacity-70"
              } outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 transition`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-12 text-purple-400 hover:text-purple-300 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
            </button>
            {passwordError && (
              <p className="mt-1 text-red-500 text-sm font-medium">
                {passwordError}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-center animate-pulse">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 font-semibold text-center animate-pulse">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={
              !name.trim() ||
              !email.trim() ||
              !password.trim() ||
              emailError ||
              passwordError
            }
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-purple-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
