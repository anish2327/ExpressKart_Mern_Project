import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { store } from "./redux/index.js";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals.js';



import Home from './page/Home.jsx'
import Menu from './page/Menu.jsx'
import About from './page/About.jsx'
import Contact from './page/contact.jsx'
import Login from './page/login.jsx'
import Newproduct from './page/Newproduct.jsx'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Signup from './page/Signup.jsx';
import Cart from './page/Cart.jsx';
import Success from './page/Success.jsx';
import Cancel from './page/Cancel.jsx';
import Selectlocation from './page/Selectlocation.jsx';
import Profile from './page/Profile.jsx';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SelectLocation from './page/Selectlocation.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
      <Route path="selectlocation" element={<Selectlocation/>}/>
      <Route path ="profile" element={<Profile/>}/>


      



    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

//reportWebVitals();