import React, { useState } from "react";
import { forgotPassword } from "../services/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email của bạn.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      const data = response.data;

      if (data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error("Lỗi quên mật khẩu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Quên Mật Khẩu
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi cho bạn một link để đặt lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {isLoading ? "Đang gửi..." : "Gửi link reset"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Quay lại?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;