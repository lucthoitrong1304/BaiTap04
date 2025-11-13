import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/register" className="hover:text-gray-300">Đăng Ký</Link>
          </li>
          <li>
            <Link to="/forgot-password" className="hover:text-gray-300">Quên Mật Khẩu</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;