import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import loginsignupImage from "../assets/login-animation.gif"
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';



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
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md ">
            <img src={loginsignupImage}/>
          </div>


          <form className="w-full py-3 flex flex-col"  onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
              <input
              type={"text"}
              id="fullName"
              name="fullName"
              placeholder='Enter your name'
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.fullName}
              onChange={handleOnChange}
              />

            <label htmlFor="email">Email</label>
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

            <label htmlFor="password">Password</label>
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

            <label htmlFor="confirmpassword">Confirm Password</label>
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
            <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
          </form>
            <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>

        </div>


    </div>
  )
}

export default Signup