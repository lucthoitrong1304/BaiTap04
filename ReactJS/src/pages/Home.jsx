import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="relative z-50 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div
            className="cursor-pointer text-xl font-bold text-blue-600"
            onClick={() => navigate("/")}
          >
            MyShop
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              // --- TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP ---
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span>Hi, {user.name}</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white py-1 shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // --- TRƯỜNG HỢP CHƯA ĐĂNG NHẬP ---
              <>
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Đăng ký
                </Link>
                <Link
                  to="/login"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Nội dung chính */}
      <main className="p-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Trang chủ</h1>
        <p className="text-lg text-gray-600">
          {user
            ? `Chào mừng ${user.name} đã quay trở lại!`
            : "Bạn chưa đăng nhập. Hãy đăng nhập để trải nghiệm."}
        </p>
      </main>
    </div>
  );
};

export default Home;
