"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightToLine, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      if (data.role === "warden") router.push("/warden");
      else if (data.role === "watchman") router.push("/watchman");
      else if (data.role === "chairman") router.push("/detailsall");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
      <div className="bg-[#fef8f5] rounded-xl shadow-xl p-8 w-[350px] text-center">
        {/* Top Icon */}
        <div className="bg-primary text-white w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full">
          <ArrowRightToLine size={24} />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-[#4a1c14]">Admin Login</h2>
        <p className="text-sm text-[#805c52] mt-1 mb-4">
          Sign in to access your dashboard
        </p>

        {/* Username */}
        <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-2 mb-3">
          <User className="text-primary mr-2" size={18} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full outline-none text-sm text-gray-800 bg-transparent"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-white border border-gray-300 rounded px-3 py-2 mb-4">
          <Lock className="text-primary mr-2" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none text-sm text-gray-800 bg-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="bg-primary text-white font-semibold text-sm py-2 px-4 rounded w-full hover:bg-[#e96f20] flex items-center justify-center gap-2 transition-all duration-200"
        >
          <ArrowRightToLine size={16} />
          Sign In
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
}
