import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import loginsignupImage from "../assets/login-animation.gif"
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import signupimage from "../assets/signup_page.jpg"


function Signup() {
  const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
    fullName: "",
   
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      toast.success("Signup successfully");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      toast.error(result.message || "Signup failed");
    }
  }catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
  }
}

  

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-100 via-pink-50 to-rose-200 justify-center items-center p-86">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 justify-center ">
      
        <img 
          src={signupimage}
          alt="signup image"
          className="rounded-2xl shadow-md mt-2 w-[90%] object-cover"
        />
          
      
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
         
          <div className="w-20 h-20  overflow-hidden rounded-full drop-shadow-md shadow-md ">
            <img src={loginsignupImage}/>
            
            
          </div>
          <h2 className="text-3xl font-extrabold text-orange-800 text-center">
        Register New Account
      </h2>
      <p className="text-center text-xl text-gray-600 mb-6">Welcome to ExpressKart 🛍️</p>


          <form className="w-full py-3 flex flex-col"  onSubmit={handleSubmit}>
            <label className="text-orange-700 font-bold" htmlFor="fullName">Full Name</label>
              <input
              type={"text"}
              id="fullName"
              name="fullName"
              placeholder='Enter your name'
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.fullName}
              onChange={handleOnChange}
              />

            <label  className="text-orange-700 font-bold" htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              name="email"
              placeholder='Enter your email'
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
             
            />
            {/* <Link to={"verifyemail"} className='text-red-500  whitespace-nowrap inline-block '>Verify Email</Link> */}

            <label className="text-orange-700 font-bold" htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-p focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder='Enter your password'
               className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-xl cursor-pointer'
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}</span>
            </div>

            <label className="text-orange-700 font-bold" htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              placeholder='Enter your confrim password'
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />

            <span  className="flex text-xl cursor-pointer"onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />} </span>
            </div>
            <button className="w-full max-w-[150px] m-auto  bg-orange-700  hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
          </form>
        <p className="text-center font-semibold text-gray-700 mt-5">
        Already have an account?{" "}
        <a href="/login" className="text-orange-700 hover:underline font-medium">
          Login
        </a>
      </p>

        </div>


    </div>
    </div>
  )
}

export default Signup