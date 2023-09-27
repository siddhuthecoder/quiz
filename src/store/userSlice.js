import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: { isUser: false, userDetails: null, isAdmin: false },
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice;
