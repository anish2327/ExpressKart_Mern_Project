import React, { useState } from 'react';
import logo from '../assets/logo.png';  
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";


import Search from './Search';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    // console.log("Header render - userData from Redux:", userData); // <-- yaha
    const cartItemNumber = useSelector((state) => 
    state.product.cartItem.reduce((total, item) => total + item.qty, 0)
);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowMenu = () => setShowMenu((preve) => !preve);

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast.success("Logout successfully");
        navigate("/login");
    };

    const isAdmin = userData?.email === import.meta.env.VITE_APP_ADMIN_EMAIL;
    // console.log(isAdmin);


  return (
   <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
        <div className="flex items-center h-full justify-between">
            {/* Logo */}
            <Link to="/">
                <div className="h-12">
                    <img src={logo} alt="logo" className="h-full" />
                </div>
            </Link>

            {/* Search (desktop only) */}
            <div className='hidden lg:block'>
                <Search/>
            </div>

            {/* Navigation & Icons */}
            <div className='flex items-center gap-4 md:gap-7'>
                <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                    <Link to="/" className='text-orange-500 hover:text-blue-600'>Home</Link>
                        <Link to="/selectlocation"  className="hover:text-blue-600 text-orange-500">
                            Select Location📍
                        </Link>
                       <Link to={"/menu/63f0fdbb3bcc2f97fa53d25d" } className=' hover:text-blue-600 text-orange-500'>Menu</Link>
                       
                       
                        
                      

                    {/* Show login only if user not logged in */}
                   

                    {!userData.email ? (
                      <Link to="login" className=' text-orange-500 whitespace-nowrap cursor-pointer hover:text-blue-600'>Login</Link>
                    ) : (
                      <button onClick={handleLogout}
                                    className='whitespace-nowrap cursor-pointer text-orange-600'>Logout</button>
                    )}
                </nav>
                {/* if used mobile version then login show  */}
                    <div className='flex md:hidden'>
                                {!userData.email ? (
                                    <Link to="login" className='text-orange-500 hover:text-blue-600'>Login</Link>
                                ) : (
                                    <button onClick={handleLogout} className='text-orange-500 hover:text-blue-600'>Logout</button>
                                )}
                            </div>

                            <div className='flex md:hidden'>
                                {!userData.email ? (
                                    <Link to="login" className='text-orange-500 hover:text-blue-600'>Login</Link>
                                ) : (
                                    <button onClick={handleLogout} className='text-orange-500 hover:text-blue-600'>Logout</button>
                                )}
                            </div>

                {/* Cart Icon */}
                <div className=' text-orange-500 text-3xl hover:text-blue-600 text-slate-600 relative'>
                    <Link to="cart" className='text-orange-400'>
                        <FaShoppingCart />
                        {cartItemNumber > 0 && (
                            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-2xl text-sm text-center">
                                {cartItemNumber}
                            </div>
                        )}
                    </Link>
                </div>

                {/* User Profile */}
                {userData?.email && (
                    <div className='relative'>
                        <div className=' px-4 text-2xl cursor-pointer text-orange-500 hover:text-red-600' onClick={handleShowMenu}>
                           <HiOutlineUserCircle />
                           
                        </div>
                        <div className=' text-orange-600 text-center text-2xl'>
                            <Link
                                    to="profile"
                                    className='whitespace-nowrap cursor-pointer mb-2  text-orange-600  hover:text-red-600'
                                    onClick={() => setShowMenu(false)}
                                    
                                >
                                Profile
                            </Link>
                        </div>
                        

                        {showMenu && (
                            <div className='absolute right-0 bg-white py-2 px-2 shadow-md flex flex-col min-w-[150px]'>

                                {isAdmin && (
                                    <Link
                                        to="newproduct"
                                        className='whitespace-nowrap cursor-pointer mb-2 text-orange-600'
                                        onClick={() => setShowMenu(false)}
                                    >
                                        🛠 New Product
                                    </Link>
                                )}

                
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
   </header>
  )
}

export default Header;
