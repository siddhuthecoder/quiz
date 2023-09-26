import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: { isUser: false, userDetails: null },
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice;
