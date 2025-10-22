import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userslice.js";
import productSlideReducer from "./productSlide.js";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
   product : productSlideReducer
    
  },
});
