import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  // 🔁 Хэрвээ өмнө нь token хадгалагдсан бол автоматаар login-success руу чиглүүлэх
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded?.name) {
          setIsAuthenticated(true);
          navigate("/login-success");
        }
      } catch {
        // Invalid token бол login-д үлдээ
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
      }
    }
  }, []);

  // 🖊️ Input талбар өөрчлөгдөх үед
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Submit хийх үед
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/login", formData);

      // ✅ Token болон хэрэглэгчийн мэдээллийг хадгалах
      localStorage.setItem("token", res.data.token);
      const decoded: any = jwtDecode(res.data.token);
      localStorage.setItem("userName", decoded.name);

      // ✅ Төлөв шинэчлэх
      setIsAuthenticated(true);

      navigate("/login-success");
    } catch (err) {
      setIsAuthenticated(false);
      navigate("/login-failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#0A2B52]">Нэвтрэх</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Нэвтрэх имэйл:"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Нууц үг:"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#0A2B52] text-white py-2 rounded hover:opacity-90"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
}
