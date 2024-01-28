import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  if (token) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ROUTE}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      throw Error(error?.response?.data.message || error.message);
    }
  } else {
    throw Error("No Token found");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUser: false,
    userDetails: null,
    isAdmin: false,
    status: "idle",
    error: null,
  },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.isUser = true;
        state.isAdmin =
          action.payload.name === process.env.REACT_APP_ADMIN &&
          action.payload.email === process.env.REACT_APP_ADMIN_EMAIL;
        state.status = "loaded";
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isUser = false;
        state.userDetails = null;
        state.isAdmin = false;
        state.status = "loaded";
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const userActions = { ...userSlice.actions, fetchUser };
export default userSlice;
