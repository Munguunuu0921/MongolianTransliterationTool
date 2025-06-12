import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-[#0A2B52] mb-6">Амжилттай нэвтэрлээ</h2>
      <img
        src="/mongolian_translate_logo.png"
        alt="Success Logo"
        className="w-98 h-48 mb-6"
      />
      <button
        onClick={() => navigate("/")}
        className="bg-[#0A2B52] text-white px-6 py-2 rounded hover:bg-[#123a6d]"
      >
        Буцах
      </button>
    </div>
  );
};
export default LoginSuccess;