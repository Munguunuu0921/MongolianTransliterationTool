import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Mascot from "./components/Mascot";
import React from 'react';
import Login from './components/Login';
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginSuccess from './components/LoginSuccess';
import LoginFailed from './components/LoginFailed';
import Register from './components/Register';
import RegisterSuccess from './components/RegisterSuccess';
import RegisterFailed from './components/RegisterFailed';
import History from './components/History';
import MongolKeyboard from './components/MongolKeyboard';
import Quiz from './components/Quiz';
import Study from './components/Study';
import LearnPage from './components/LearnPage';
import Layout from './components/Layout';
import GenderPage from './components/GenderPage';

const HomeGuard = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Homepage /> : <Mascot />;
};

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/" element={<HomeGuard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/login-failed" element={<LoginFailed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gender" element={<GenderPage />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/register-failed" element={<RegisterFailed />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/keyboard" element={<MongolKeyboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/study" element={<Study />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;