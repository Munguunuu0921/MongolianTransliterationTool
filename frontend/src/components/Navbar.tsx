import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // mascot руу буцах
  };

  return (
    <div className="p-4 flex justify-end">
      {isAuthenticated && (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Гарах
        </button>
      )}
    </div>
  );
}
