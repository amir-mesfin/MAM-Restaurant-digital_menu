import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Sign() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/signin", formData);

      if (res.status === 200) {
        navigate("/owner"); // redirect on success
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) setError("❌ Wrong username or password");
        else if (status === 404) setError("❌ User not found");
        else if (status === 500) setError("⚠️ Server error, please try again later");
        else setError(data.message || "⚠️ Something went wrong");
      } else if (err.request) {
        setError("⚠️ No response from server. Check your network.");
      } else {
        setError("⚠️ " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(38,70%,84%)] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-amber-700 italic mb-6">
          ሜኑ ለማስተካከል ይግቡ
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              የተጠቃሚ ስም
            </label>
            <input
              type="text"
              id="username"
              placeholder="ስምዎን ያስገቡ"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              የይለፍ ቃል
            </label>
            <input
              type="password"
              id="password"
              placeholder="የይለፍ ቃልዎን ያስገቡ"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-800">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Loading..." : "ግባ"}
          </button>
        </form>
      </div>
    </div>
  );
}
