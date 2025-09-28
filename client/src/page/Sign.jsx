import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Sign() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/owner");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("❌ ስም እና የይለፍ ቃል መሙላት አለባቸው");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/signin", formData);

      if (res.status === 200) {
        // Store token and user data
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        
        // Redirect to owner page
        navigate("/owner");
      }
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        if (status === 401) setError("❌ ስም ወይም የይለፍ ቃል ትክክል አይደለም");
        else if (status === 404) setError("❌ ተጠቃሚ አልተገኘም");
        else if (status === 500) setError("⚠️ አገልግሎት ስህተት አለ፣ እባክዎ ከድጋሚ ይሞክሩ");
        else setError("⚠️ አንዳንድ ስህተት ተፈጥሯል");
      } else if (err.request) {
        setError("⚠️ ከአገልግሎት መልስ አልተቀበለም፣ ኔትወርክዎን ይፈትሹ");
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
        {/* ራዕይ */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-amber-700 italic mb-6">
          ሜኑ ለማስተካከል ይግቡ
        </h1>

        {/* ፎርም */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* የተጠቃሚ ስም */}
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
              required
            />
          </div>

          {/* የይለፍ ቃል */}
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
              required
            />
          </div>

          {/* ስህተት */}
          {error && <p className="text-sm text-red-800 text-center">{error}</p>}

          {/* ግባ አዝራር */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "በሂደት ላይ..." : "ግባ"}
          </button>
        </form>
      </div>
    </div>
  );
}