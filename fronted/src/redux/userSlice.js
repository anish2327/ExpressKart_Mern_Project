import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log("Redux payload:", action.payload);
      // action.payload is already the user object
      state._id = action.payload?._id;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.email = action.payload?.email;
      state.image = action.payload?.image;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
