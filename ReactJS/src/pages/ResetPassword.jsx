import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword as apiResetPassword } from "../services/api";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Tự động lấy token từ URL khi trang được tải
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Đường dẫn không hợp lệ. Không tìm thấy token.");
      // Có thể chuyển hướng về trang login/forgot-password
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Vui lòng nhập mật khẩu mới và xác nhận.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!token) {
      toast.error("Token không hợp lệ. Vui lòng thử lại từ link email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiResetPassword(token, password);
      const data = response.data;

      if (data.EC === 0) {
        toast.success(data.EM); // "Cập nhật mật khẩu thành công."
        // Chờ 2 giây rồi chuyển về trang login
        setTimeout(() => {
          navigate("/login"); // Thay đổi link này nếu cần
        }, 2000);
      } else {
        toast.error(data.EM); // "Token không hợp lệ hoặc đã hết hạn."
      }
    } catch (error) {
      console.error("Lỗi reset mật khẩu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu không có token, hiển thị thông báo lỗi
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-red-600">Lỗi: Token không hợp lệ</h2>
          <p className="mt-4 text-gray-700">
            Token reset mật khẩu không được tìm thấy hoặc đã hết hạn.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-block font-semibold text-blue-600 hover:text-blue-500"
          >
            Yêu cầu lại link mới
          </Link>
        </div>
      </div>
    );
  }

  // Nếu có token, hiển thị form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Tạo Mật Khẩu Mới
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;