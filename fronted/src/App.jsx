import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Outlet } from 'react-router-dom'
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";

function App() {
   const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getproduct`)
      const resData = await res.json()
     
      dispatch(setDataProduct(resData))
    })()
  },[])

  return (
      <>
      <Toaster />
        <div>
          <Header/>
          <main className='pt-16 px-4 bg-slate-200'>
            <Outlet/>
          </main>
        </div>
      </>
    
  
  )
}

export default App
