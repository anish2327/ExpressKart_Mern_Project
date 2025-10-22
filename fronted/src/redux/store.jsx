import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.jsx";
import productSlideReducer from "./productSlide.jsx";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
   product : productSlideReducer
    
  },
});
