import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/register", formData);
      navigate("/register-success");
    } catch {
      setError("Бүртгэл баталгаажуулахад алдаа гарлаа.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Бүртгүүлэх</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Нэр" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Имэйл" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Утасны дугаар" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Нууц үг" onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="bg-blue-900 text-white w-full py-2 rounded">Бүртгүүлэх</button>
      </form>
    </div>
  );
};

export default Register;