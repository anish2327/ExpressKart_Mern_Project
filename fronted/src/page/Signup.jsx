// import React, { useState } from 'react'
// import {useForm} from 'react-hook-form'
// import loginsignupImage from "../assets/login-animation.gif"
// import { BiShow } from "react-icons/bi";
// import { BiHide } from "react-icons/bi";
// import { Link } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';
// import { toast } from "react-hot-toast";
// import { ToastContainer } from 'react-toastify';
// import signupimage from "../assets/signup_page.jpg"


// function Signup() {
//   const navigate = useNavigate()
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [data, setData] = useState({
//     fullName: "",
   
//     email: "",
//     password: "",
//     confirmPassword: "",
//     image : ""
//   });
  

//   const handleShowPassword = () => {
//     setShowPassword((preve) => !preve);
//   };
//   const handleShowConfirmPassword = () => {
//     setShowConfirmPassword((preve) => !preve);
//   };

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };
 
//    const handleSubmit = async (e) => {
//   e.preventDefault();

//   const { fullName, email, password, confirmPassword } = data;

//   if (!fullName || !email || !password || !confirmPassword) {
//     toast.error("All fields are required");
//     return;
//   }

//   if (password !== confirmPassword) {
//     toast.error("Passwords do not match");
//     return;
//   }

//   try {
//     const url = `${import.meta.env.VITE_API_URL}/signup`;

//     const payload = {
//       name: fullName,
//       email,
//       password,
//       confirmPassword,
//     };

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();

//     if (result.success) {
//       toast.success(result.message);
//       toast.success("Signup successfully");
//       setTimeout(() => navigate("/login"), 1000);
//     } else {
//       toast.error(result.message || "Signup failed");
//     }
//   }catch (err) {
//     console.error(err);
//     toast.error("Something went wrong!");
//   }
// }

  

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-orange-100 via-pink-50 to-rose-200 justify-center items-center p-86">
//       {/* Left side image */}
//       <div className="hidden md:flex w-1/2 justify-center ">
      
//         <img 
//           src={signupimage}
//           alt="signup image"
//           className="rounded-2xl shadow-md mt-2 w-[90%] object-cover"
//         />
          
      
//       </div>
//       <div className="w-full md:w-1/2 flex justify-center">
//         <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
         
//           <div className="w-20 h-20  overflow-hidden rounded-full drop-shadow-md shadow-md ">
//             <img src={loginsignupImage}/>
            
            
//           </div>
//           <h2 className="text-3xl font-extrabold text-orange-800 text-center">
//         Register New Account
//       </h2>
//       <p className="text-center text-xl text-gray-600 mb-6">Welcome to ExpressKart 🛍️</p>


//           <form className="w-full py-3 flex flex-col"  onSubmit={handleSubmit}>
//             <label className="text-orange-700 font-bold" htmlFor="fullName">Full Name</label>
//               <input
//               type={"text"}
//               id="fullName"
//               name="fullName"
//               placeholder='Enter your name'
//               className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//               value={data.fullName}
//               onChange={handleOnChange}
//               />

//             <label  className="text-orange-700 font-bold" htmlFor="email">Email</label>
//             <input
//               type={"email"}
//               id="email"
//               name="email"
//               placeholder='Enter your email'
//               className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//               value={data.email}
//               onChange={handleOnChange}
             
//             />
//             {/* <Link to={"verifyemail"} className='text-red-500  whitespace-nowrap inline-block '>Verify Email</Link> */}

//             <label className="text-orange-700 font-bold" htmlFor="password">Password</label>
//           <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-p focus-within:outline focus-within:outline-blue-300">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder='Enter your password'
//                className=" w-full bg-slate-200 border-none outline-none "
//               value={data.password}
//               onChange={handleOnChange}
//             />
//             <span className='flex text-xl cursor-pointer'
//               onClick={handleShowPassword}
//             >
//               {showPassword ? <BiShow /> : <BiHide />}</span>
//             </div>

//             <label className="text-orange-700 font-bold" htmlFor="confirmpassword">Confirm Password</label>
//           <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmpassword"
//               name="confirmPassword"
//               placeholder='Enter your confrim password'
//               className=" w-full bg-slate-200 border-none outline-none "
//               value={data.confirmPassword}
//               onChange={handleOnChange}
//             />

//             <span  className="flex text-xl cursor-pointer"onClick={handleShowConfirmPassword}>
//               {showConfirmPassword ? <BiShow /> : <BiHide />} </span>
//             </div>
//             <button className="w-full max-w-[150px] m-auto  bg-orange-700  hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
//             Sign up
//           </button>
//           </form>
//         <p className="text-center font-semibold text-gray-700 mt-5">
//         Already have an account?{" "}
//         <a href="/login" className="text-orange-700 hover:underline font-medium">
//           Login
//         </a>
//       </p>

//         </div>


//     </div>
//     </div>
//   )
// }

// export default Signup

import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import {
  FiUser,
  FiMail,
  FiLock,
  FiShoppingBag,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import signupImage from "../assets/signup_page.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";

function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


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

    if (result.success) {
      toast.success(result.message || "Google signup successful!");

      // Save user in Redux
      dispatch(loginRedux(result.data.user));

      // Save tokens
      localStorage.setItem(
        "accessToken",
        result.data.accesstoken
      );

      localStorage.setItem(
        "refreshToken",
        result.data.refreshtoken
      );

      // User is already authenticated,
      // so directly go to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(result.message || "Google signup failed");
    }
  } catch (error) {
    console.error("Google Signup Error:", error);
    toast.error("Google signup failed!");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = data;

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/signup`;

      const payload = {
        name: fullName,
        email,
        password,
        confirmPassword,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Signup successful");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#ECEAE4] flex items-center justify-center px-4 sm:px-6 py-8 overflow-hidden">

      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-300/40 rounded-full blur-[100px]" />

      <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-[120px]" />

      {/* Small Decorative Dot */}
      <div className="absolute top-16 right-[10%] w-3 h-3 bg-orange-500 rounded-full" />

      <div className="absolute bottom-20 left-[8%] w-2 h-2 bg-emerald-600 rounded-full" />

      {/* ================= MAIN CARD ================= */}

      <div className="relative z-10 w-full max-w-6xl min-h-[650px] bg-[#F9F7F2] rounded-[32px] shadow-[0_25px_70px_rgba(30,40,35,0.18)] overflow-hidden flex">

        {/* ================= LEFT IMAGE SECTION ================= */}

        <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden">

          <img
            src={signupImage}
            alt="ExpressKart shopping experience"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Soft Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A2E28]/30 via-[#1A2E28]/20 to-[#152C25]/90" />

          {/* Logo */}
          <div className="absolute top-8 left-8 z-10 flex items-center gap-3">

            <div className="w-11 h-11 bg-[#FF6B35] rounded-2xl flex items-center justify-center shadow-lg">
              <FiShoppingBag className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">
                ExpressKart
              </h1>

              <p className="text-white/70 text-[11px]">
                Your everyday marketplace
              </p>
            </div>

          </div>

          {/* Center Floating Badge */}
          <div className="absolute top-[42%] right-5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                <FiCheck className="text-white" />
              </div>

              <div>
                <p className="text-white text-xs font-semibold">
                  Easy Shopping
                </p>

                <p className="text-white/60 text-[10px]">
                  Simple. Fast. Secure.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-10 left-8 right-8 z-10">

            <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              SHOP • SAVE • SMILE
            </div>

            <h2 className="text-white text-4xl font-bold leading-[1.15]">
              Discover something
              <br />
              you'll love.
            </h2>

            <p className="text-white/70 text-sm mt-4 max-w-sm leading-relaxed">
              Join ExpressKart and make every shopping experience
              simpler, faster and more enjoyable.
            </p>

            {/* Small Stats */}
            <div className="flex items-center gap-6 mt-6">

              <div>
                <p className="text-white text-lg font-bold">
                  10K+
                </p>
                <p className="text-white/50 text-[10px]">
                  Products
                </p>
              </div>

              <div className="w-px h-8 bg-white/20" />

              <div>
                <p className="text-white text-lg font-bold">
                  Fast
                </p>
                <p className="text-white/50 text-[10px]">
                  Delivery
                </p>
              </div>

              <div className="w-px h-8 bg-white/20" />

              <div>
                <p className="text-white text-lg font-bold">
                  100%
                </p>
                <p className="text-white/50 text-[10px]">
                  Secure
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT FORM SECTION ================= */}

        <div className="w-full lg:w-[54%] flex items-center justify-center px-6 sm:px-10 md:px-16 py-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">

              <div className="w-11 h-11 bg-[#FF6B35] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                <FiShoppingBag className="text-white text-xl" />
              </div>

              <div>
                <h1 className="text-[#19352D] text-xl font-bold">
                  ExpressKart
                </h1>

                <p className="text-gray-400 text-[10px]">
                  Your everyday marketplace
                </p>
              </div>

            </div>

            {/* Heading */}

            <div className="mb-7">

              <div className="flex items-center gap-2 mb-3">

                <div className="w-7 h-[2px] bg-orange-500" />

                <p className="text-orange-500 text-[11px] font-bold tracking-[2px]">
                  JOIN EXPRESSKART
                </p>

              </div>

              <h1 className="text-[#19352D] text-3xl sm:text-[38px] leading-tight font-bold tracking-tight">
                Create your
                <br />
                shopping account.
              </h1>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                It only takes a minute. Enter your details and start
                exploring your favorite products.
              </p>

            </div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit}>

              {/* Name */}

              <div className="mb-4">

                <label
                  htmlFor="fullName"
                  className="block text-[#344A43] text-xs font-semibold mb-2"
                >
                  FULL NAME
                </label>

                <div className="group flex items-center gap-3 bg-white border border-[#DDDAD2] rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                  <FiUser className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={data.fullName}
                    onChange={handleOnChange}
                    className="w-full bg-transparent outline-none text-[#243A33] text-sm placeholder:text-gray-400"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="mb-4">

                <label
                  htmlFor="email"
                  className="block text-[#344A43] text-xs font-semibold mb-2"
                >
                  EMAIL ADDRESS
                </label>

                <div className="group flex items-center gap-3 bg-white border border-[#DDDAD2] rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                  <FiMail className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full bg-transparent outline-none text-[#243A33] text-sm placeholder:text-gray-400"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-4">

                <label
                  htmlFor="password"
                  className="block text-[#344A43] text-xs font-semibold mb-2"
                >
                  PASSWORD
                </label>

                <div className="group flex items-center gap-3 bg-white border border-[#DDDAD2] rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                  <FiLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full bg-transparent outline-none text-[#243A33] text-sm placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div className="mb-6">

                <label
                  htmlFor="confirmPassword"
                  className="block text-[#344A43] text-xs font-semibold mb-2"
                >
                  CONFIRM PASSWORD
                </label>

                <div className="group flex items-center gap-3 bg-white border border-[#DDDAD2] rounded-xl px-4 py-3 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                  <FiLock className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    className="w-full bg-transparent outline-none text-[#243A33] text-sm placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="text-gray-400 hover:text-orange-500 transition-colors text-lg"
                  >
                    {showConfirmPassword ? (
                      <BiShow />
                    ) : (
                      <BiHide />
                    )}
                  </button>

                </div>

              </div>

              {/* Signup Button */}

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 bg-[#19352D] hover:bg-[#244A3F] text-white font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-[#19352D]/10 transition-all duration-300 active:scale-[0.98]"
              >
                Create Account

                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
            <div className="flex items-center gap-3 my-6">
                <div className="h-px bg-[#DDDAD2] flex-1" />

                <span className="text-gray-400 text-[10px] font-medium">
                  OR SIGN UP WITH
                </span>

                <div className="h-px bg-[#DDDAD2] flex-1" />
              </div>

              {/* Google Signup Button */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    toast.error("Google signup failed");
                  }}
                  text="signup_with"
                  shape="rectangular"
                />
              </div>

            {/* Login */}

            <div className="flex items-center gap-3 my-6">
                <div className="h-px bg-[#DDDAD2] flex-1" />

                <span className="text-gray-400 text-[10px]">
                  ALREADY SHOPPING WITH US?
                </span>

                <div className="h-px bg-[#DDDAD2] flex-1" />
              </div>

              <Link
                to="/login"
                className="w-full flex items-center justify-center border border-[#D7D4CC] hover:border-orange-400 hover:bg-orange-50 text-[#344A43] text-sm font-semibold py-3 rounded-xl transition-all duration-200"
              >
                Login to your account
              </Link>

            {/* Terms */}

            <p className="text-center text-gray-400 text-[10px] mt-5">
              By creating an account, you agree to ExpressKart's
              Terms of Service and Privacy Policy.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Signup;