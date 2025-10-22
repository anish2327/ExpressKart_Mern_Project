import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,  useSelector } from "react-redux";
import { loginRedux } from "../redux/userslice.js";
import { toast } from "react-hot-toast";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle password visibility
  const handleShowPassword = () => setShowPassword(prev => !prev);

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Full login result:", result);
      console.log("result.data:", result.data);

      toast(result.message);

      if (result.success) {
         // Save user data to Redux 
         dispatch(loginRedux(result.data.user)); 
         localStorage.setItem("accessToken", result.data.accesstoken); 
         localStorage.setItem("refreshToken", result.data.refreshtoken); 
         // Navigate to home after 1 second 
        
          setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded-md shadow-md">
        <div className="w-24 h-24 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} alt="Login animation" className="w-full h-full object-cover" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 
