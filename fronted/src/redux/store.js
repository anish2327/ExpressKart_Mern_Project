import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.js";
import productSlideReducer from "./productSlide.js";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
   product : productSlideReducer
    
  },
});