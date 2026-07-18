// import React, { useState } from "react";
// import loginSignupImage from "../assets/login-animation.gif";
// import { BiShow, BiHide } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch,  useSelector } from "react-redux";
// import { loginRedux } from "../redux/userSlice.js";
// import { toast } from "react-hot-toast";
// import reviewImage from "../assets/image_shopping_login.png";
// import onlineshopping from "../assets/online_shooping_cart.webp";
//  import { GoogleLogin } from '@react-oauth/google';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({ email: "", password: "" });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Toggle password visibility
//   const handleShowPassword = () => setShowPassword(prev => !prev);

//   // Handle input changes
//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;

//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }


//   const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/google-login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include", // cookies ke liye zaroori
//             body: JSON.stringify({ token: credentialResponse.credential }),
//           });

//           const result = await response.json();
//           toast(result.message);

//           if (result.success) {
//             dispatch(loginRedux(result.data.user));
//             localStorage.setItem("accessToken", result.data.accesstoken);
//             localStorage.setItem("refreshToken", result.data.refreshtoken);
//             setTimeout(() => navigate("/"), 1000);
//           }
//         } catch (err) {
//           console.error(err);
//           toast.error("Google login failed!");
//         }
//       };


//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();
//       console.log("Full login result:", result);
//       console.log("result.data:", result.data);

//       toast(result.message);

//       if (result.success) {
//          // Save user data to Redux 
//          dispatch(loginRedux(result.data.user)); 
//          localStorage.setItem("accessToken", result.data.accesstoken); 
//          localStorage.setItem("refreshToken", result.data.refreshtoken); 
//          // Navigate to home after 1 second 
        
//           setTimeout(() => navigate("/"), 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
    
//     <div  className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-50 to-rose-100">
      
    
    
//     <div className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl">

    
//       <img
//         src={reviewImage} 
//         alt="Shopping Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
      

   
//       <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/60 to-transparent"></div>

    
//       <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm p-8">
//         <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
//           <img
//             src={loginSignupImage}
//             alt="Login animation"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <h1 className="text-center text-2xl text-orange-700 bold font-bold mt-4 ">Welcome Back </h1>
//         <p className="text-center"> Login to your account </p>

//         <form className="w-full  px-1 py-3 flex flex-col" onSubmit={handleSubmit}>
//           <label className="text-orange-700 font-bold" htmlFor="email"> 👤 Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email or username"
//             className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//             value={data.email}
//             onChange={handleOnChange}
//           />

//           <label className="text-orange-700 font-bold" htmlFor="password">Password</label>
//           <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               className="w-full bg-slate-200 border-none outline-none"
//               value={data.password}
//               onChange={handleOnChange}
//             />
//             <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
//               {showPassword ? <BiShow /> : <BiHide />}
//             </span>
//           </div>
//           <div className="text-end text-1/2xl">
//           <Link to="/forgotPassword" className="text-blue-800 underline font-semibold">
//           Forgot Password ?
//           </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-left  text-xl  mt-2">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-red-500 underline font-semibold ">
//             Sign Up
//           </Link>
//         </p>
      
//     </div>
//     </div>
   

//     </div>
      
       
   
       
//   );
// };

// export default Login; 
// import React, { useState } from "react";
// import loginSignupImage from "../assets/login-animation.gif";
// import { BiShow, BiHide } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginRedux } from "../redux/userSlice.js";
// import { toast } from "react-hot-toast";
// import reviewImage from "../assets/image_shopping_login.png";
// import onlineshopping from "../assets/online_shooping_cart.webp";
// import { GoogleLogin } from '@react-oauth/google';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({ email: "", password: "" });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleShowPassword = () => setShowPassword(prev => !prev);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   // ✅ Ab ye alag, top-level function hai — handleSubmit ke andar NAHI
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/google-login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ token: credentialResponse.credential }),
//       });

//       const result = await response.json();
//       toast(result.message);

//       if (result.success) {
//         dispatch(loginRedux(result.data.user));
//         localStorage.setItem("accessToken", result.data.accesstoken);
//         localStorage.setItem("refreshToken", result.data.refreshtoken);
//         setTimeout(() => navigate("/"), 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Google login failed!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;

//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();
//       toast(result.message);

//       if (result.success) {
//         dispatch(loginRedux(result.data.user));
//         localStorage.setItem("accessToken", result.data.accesstoken);
//         localStorage.setItem("refreshToken", result.data.refreshtoken);
//         setTimeout(() => navigate("/"), 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 via-pink-50 to-rose-100">
//       <div className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
//         <img
//           src={reviewImage}
//           alt="Shopping Background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/60 to-transparent"></div>

//         <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm p-8">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
//             <img
//               src={loginSignupImage}
//               alt="Login animation"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <h1 className="text-center text-2xl text-orange-700 bold font-bold mt-4">Welcome Back</h1>
//           <p className="text-center"> Login to your account </p>

//           <form className="w-full px-1 py-3 flex flex-col" onSubmit={handleSubmit}>
//             <label className="text-orange-700 font-bold" htmlFor="email"> 👤 Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email or username"
//               className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
//               value={data.email}
//               onChange={handleOnChange}
//             />

//             <label className="text-orange-700 font-bold" htmlFor="password">Password</label>
//             <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="w-full bg-slate-200 border-none outline-none"
//                 value={data.password}
//                 onChange={handleOnChange}
//               />
//               <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
//                 {showPassword ? <BiShow /> : <BiHide />}
//               </span>
//             </div>
//             <div className="text-end text-1/2xl">
//               <Link to="/forgotPassword" className="text-blue-800 underline font-semibold">
//                 Forgot Password ?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
//             >
//               Login
//             </button>
//           </form>

//           {/* ✅ Yahan Google login button add hua hai */}
//           <div className="flex items-center my-3">
//             <div className="flex-grow h-px bg-gray-300"></div>
//             <span className="px-2 text-gray-500 text-sm">OR</span>
//             <div className="flex-grow h-px bg-gray-300"></div>
//           </div>

//           <div className="flex justify-center mb-2">
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={() => toast.error("Google login failed")}
//             />
//           </div>

//           <p className="text-left text-xl mt-2">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-red-500 underline font-semibold">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { BiShow, BiHide } from "react-icons/bi";
// import { FiMail, FiLock, FiShoppingCart } from "react-icons/fi";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginRedux } from "../redux/userSlice.js";
// import { toast } from "react-hot-toast";
// import { GoogleLogin } from "@react-oauth/google";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({ email: "", password: "" });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleShowPassword = () => setShowPassword((prev) => !prev);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/google-login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ token: credentialResponse.credential }),
//       });
//       const result = await response.json();
//       toast(result.message);
//       if (result.success) {
//         dispatch(loginRedux(result.data.user));
//         localStorage.setItem("accessToken", result.data.accesstoken);
//         localStorage.setItem("refreshToken", result.data.refreshtoken);
//         setTimeout(() => navigate("/"), 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Google login failed!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;
//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const result = await response.json();
//       toast(result.message);
//       if (result.success) {
//         dispatch(loginRedux(result.data.user));
//         localStorage.setItem("accessToken", result.data.accesstoken);
//         localStorage.setItem("refreshToken", result.data.refreshtoken);
//         setTimeout(() => navigate("/"), 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0F241F] px-4 py-10">
//       {/* subtle dot-grid backdrop */}
//       <div
//         className="absolute inset-0 opacity-[0.15] pointer-events-none"
//         style={{
//           backgroundImage: "radial-gradient(#4C8C6D 1px, transparent 1px)",
//           backgroundSize: "22px 22px",
//         }}
//       />

//       <div className="relative w-full max-w-sm">
//         {/* ticket card */}
//         <div className="bg-[#FFF9F0] rounded-[22px] shadow-2xl overflow-hidden">
//           {/* header stub */}
//           <div className="bg-[#173832] px-6 pt-7 pb-6 text-center">
//             <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-[#FF6B35] flex items-center justify-center">
//               <FiShoppingCart className="text-white text-xl" />
//             </div>
//             <h1
//               className="text-[#FFF9F0] text-xl tracking-wide"
//               style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
//             >
//               expresskart
//             </h1>
//             <p className="text-[#9CC7B4] text-xs mt-1">fresh groceries, faster logins</p>
//           </div>

//           {/* perforated cut line */}
//           <div className="relative">
//             <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#0F241F]" />
//             <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#0F241F]" />
//             <div
//               className="h-px mx-4"
//               style={{
//                 backgroundImage:
//                   "repeating-linear-gradient(90deg, #D8CFBE 0 6px, transparent 6px 12px)",
//               }}
//             />
//           </div>

//           {/* form */}
//           <form className="px-6 pt-6 pb-4 flex flex-col" onSubmit={handleSubmit}>
//             <label className="text-[#173832] text-sm font-semibold mb-1" htmlFor="email">
//               Email
//             </label>
//             <div className="flex items-center gap-2 bg-white border border-[#E4DCC9] rounded-lg px-3 py-2 mb-4 focus-within:border-[#FF6B35]">
//               <FiMail className="text-[#9C9284]" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className="w-full bg-transparent outline-none text-sm text-[#173832]"
//                 value={data.email}
//                 onChange={handleOnChange}
//               />
//             </div>

//             <label className="text-[#173832] text-sm font-semibold mb-1" htmlFor="password">
//               Password
//             </label>
//             <div className="flex items-center gap-2 bg-white border border-[#E4DCC9] rounded-lg px-3 py-2 mb-2 focus-within:border-[#FF6B35]">
//               <FiLock className="text-[#9C9284]" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="w-full bg-transparent outline-none text-sm text-[#173832]"
//                 value={data.password}
//                 onChange={handleOnChange}
//               />
//               <span className="cursor-pointer text-[#9C9284]" onClick={handleShowPassword}>
//                 {showPassword ? <BiShow /> : <BiHide />}
//               </span>
//             </div>

//             <div className="text-right mb-4">
//               <Link to="/forgotPassword" className="text-xs text-[#FF6B35] font-semibold">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#FF6B35] hover:bg-[#E85A28] text-white text-sm font-semibold py-2.5 rounded-full transition-colors"
//             >
//               Log in
//             </button>
//           </form>

//           {/* divider */}
//           <div className="flex items-center gap-3 px-6 mb-4">
//             <div className="flex-grow h-px bg-[#E4DCC9]" />
//             <span className="text-xs text-[#9C9284]">or</span>
//             <div className="flex-grow h-px bg-[#E4DCC9]" />
//           </div>

//           <div className="px-6 mb-5 flex justify-center">
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={() => toast.error("Google login failed")}
//             />
//           </div>

//           <p className="text-center text-sm text-[#173832] mb-6">
//             New here?{" "}
//             <Link to="/signup" className="text-[#FF6B35] font-semibold">
//               Sign up
//             </Link>
//           </p>

//           {/* barcode footer */}
//           <div className="bg-[#F2E9D8] py-3 flex items-center justify-center gap-[2px]">
//             {[2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 2, 1, 3, 2].map((w, i) => (
//               <div
//                 key={i}
//                 className="bg-[#173832]"
//                 style={{ width: `${w}px`, height: "18px" }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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
      toast.error("Google login failed!");
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