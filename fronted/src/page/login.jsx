import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,  useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";
import { toast } from "react-hot-toast";
import reviewImage from "../assets/image_shopping_login.png";
import onlineshopping from "../assets/online_shooping_cart.webp";

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
    
    <div  className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-50 to-rose-100">
      
    
    
    <div className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl">

    
      <img
        src={reviewImage} 
        alt="Shopping Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      

   
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/60 to-transparent"></div>

    
      <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
          <img
            src={loginSignupImage}
            alt="Login animation"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-center text-2xl text-orange-700 bold font-bold mt-4 ">Welcome Back </h1>
        <p className="text-center"> Login to your account </p>

        <form className="w-full  px-1 py-3 flex flex-col" onSubmit={handleSubmit}>
          <label className="text-orange-700 font-bold" htmlFor="email"> 👤 Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email or username"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label className="text-orange-700 font-bold" htmlFor="password">Password</label>
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
          <div className="text-end text-1/2xl">
          <Link to="/forgotPassword" className="text-blue-800 underline font-semibold">
          Forgot Password ?
          </Link>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-left  text-xl  mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline font-semibold ">
            Sign Up
          </Link>
        </p>
      
    </div>
    </div>
   

    </div>
      
       
   
       
  );
};

export default Login; 
