import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../context/AuthContext";

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
  iat: number;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("JWT decode error:", e);
        setUserName(null);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
      setUserName(null);
    }
  }, [location.pathname, setIsAuthenticated]);

  const handleBack = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName(null);
    navigate("/"); // буцахад mascot руу очно
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Header */}
      <header className="h-16 bg-[#0A2B52] text-white px-4 flex justify-between items-center shadow-md relative">
        {/* Зүүн талын logo + нэр */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src="/mongolian_translate_logo.png" alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          {userName && <span className="ml-2 text-sm hidden sm:inline">Сайн уу, <b>{userName}</b> 👋</span>}
        </div>

        {/* Navigation товчлууруудыг center байрлуулах */}
        {isAuthenticated && !isAuthPage && (
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 text-sm">
            <Link to="/" className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition">Нүүр</Link>
            <Link to="/keyboard" className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition">Галиглах</Link>
            <Link to="/history" className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition">Мэдлэг</Link>
          </nav>
        )}

        {/* Баруун action хэсэг */}
        <div className="flex gap-2">
          {isAuthPage ? (
            <button
              onClick={handleBack}
              className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition"
            >
              Буцах
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition"
            >
              Гарах
            </button>
          ) : (
            <>
              <Link to="/login" className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition">Нэвтрэх</Link>
              <Link to="/register" className="border border-white rounded-full px-4 py-1 hover:bg-white hover:text-[#0A2B52] transition">Бүртгүүлэх</Link>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#0A2B52] text-white text-center py-4 text-sm">
        © Бүх эрх хуулиар хамгаалагдсан болно.
      </footer>
    </div>
  );
}
