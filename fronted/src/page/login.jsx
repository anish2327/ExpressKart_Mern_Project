

import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { FiMail, FiLock, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

// Shopping related image
import shoppingImage from "../assets/online_shooping_cart.webp";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/google-login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      }
    );

    const result = await response.json();

    console.log("Google Login Response:", result);

    if (!response.ok) {
      toast.error(
        result.message || "Google login failed"
      );
      return;
    }

    if (result.success) {
      // Redux
      dispatch(loginRedux(result.data.user));

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );

      // Save tokens
      localStorage.setItem(
        "accessToken",
        result.data.accesstoken
      );

      localStorage.setItem(
        "refreshToken",
        result.data.refreshtoken
      );

      toast.success(
        "Google Login Successful 🎉"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  } catch (error) {
    console.error(
      "Google Login Error:",
      error
    );

    toast.error(
      "Google login failed!"
    );
  }
};

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      toast(result.message);

      if (result.success) {
        dispatch(loginRedux(result.data.user));

        localStorage.setItem(
          "accessToken",
          result.data.accesstoken
        );

        localStorage.setItem(
          "refreshToken",
          result.data.refreshtoken
        );

        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50 px-4 py-10">

      {/* Decorative background */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-40"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl min-h-[620px] bg-white rounded-[30px] shadow-2xl overflow-hidden flex">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-orange-500 to-orange-600 p-10 flex-col justify-between overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <FiShoppingBag className="text-orange-500 text-2xl" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              ExpressKart
            </h1>
          </div>

          {/* Image */}
          <div className="relative z-10 flex justify-center my-6">
            <div className="w-[90%] bg-white/10 backdrop-blur-md rounded-[30px] p-5">
              <img
                src={shoppingImage}
                alt="Online shopping with ExpressKart"
                className="w-full h-[260px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="relative z-10">
            <h2 className="text-white text-3xl font-bold leading-tight">
              Everything you love,
              <br />
              delivered to your door.
            </h2>

            <p className="text-orange-100 mt-3 text-sm leading-relaxed max-w-sm">
              Sign in to discover amazing products, manage your cart
              and enjoy a smooth shopping experience.
            </p>

            {/* Features */}
            <div className="flex gap-5 mt-6 text-white/90 text-xs">
              <span>✓ Fast Delivery</span>
              <span>✓ Secure Payment</span>
              <span>✓ Easy Shopping</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-14 py-10">

          <div className="w-full max-w-sm">

            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-7">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <FiShoppingBag className="text-white text-xl" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                ExpressKart
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-orange-500 font-semibold text-sm mb-2">
                WELCOME BACK
              </p>

              <h1 className="text-3xl font-bold text-gray-900">
                Login to your account
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                Enter your details to continue shopping.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 focus-within:bg-white">

                  <FiMail className="text-gray-400 text-lg mr-3" />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    value={data.email}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 focus-within:bg-white">

                  <FiLock className="text-gray-400 text-lg mr-3" />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    value={data.password}
                    onChange={handleOnChange}
                  />

                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="text-gray-400 hover:text-orange-500 text-xl transition-colors"
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">
                <Link
                  to="/forgotPassword"
                  className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-200 transition-all duration-200"
              >
                Login
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>

              <span className="text-xs text-gray-400">
                OR CONTINUE WITH
              </span>

              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
                text="continue_with"
                shape="rectangular"
              />
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-600 font-bold"
              >
                Create account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;