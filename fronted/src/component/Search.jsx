import React, { useEffect, useState } from 'react'
import {IoSearch} from "react-icons/io5"
import { Link } from 'react-router-dom'
import useMobile from '../hooks/useMobile'
import { TypeAnimation } from 'react-type-animation';

const Serach = () => {

    const [ isMobile ] = useMobile()
    const [isSearchPage,setIsSearchPage] = useState(false)
  return (
    <div  className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border border-gray-400 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 '>
        <div>
            {
                (isMobile && isSearchPage  ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200  bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={20}/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
                        <IoSearch size={22}/>
                    </button>
                )
            }
        </div>
        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                     //not in search page
                     <div className='w-full h-full flex items-center text-yellow-500 '>
                        <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "burger"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "panner"',
                                    1000,
                                    'Search "ice-cream"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "chicken"',
                                    1000,
                                    'Search "rice"',
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                     </div>
                ) : (
                    //when i was search page
                    <div className='w-full h-full'>
                        <input
                            type='text'
                            placeholder='Search for atta dal and more.'
                            autoFocus
                            defaultValue={searchText}
                            className='bg-transparent w-full h-full outline-none'
                            onChange={handleOnChange}
                        />
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Serach