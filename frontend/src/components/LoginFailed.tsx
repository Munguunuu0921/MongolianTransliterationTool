import React from "react";
import { useNavigate } from "react-router-dom";

const LoginFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h2 className="text-xl text-red-600 mb-4">Нэвтрэхэд алдаа гарлаа</h2>
      <p className="mb-4 text-gray-600">Имэйл эсвэл нууц үг буруу байна.</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Буцах
      </button>
    </div>
  );
};

export default LoginFailed;
