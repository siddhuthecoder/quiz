import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import quizSlice from "./quizSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    quiz: quizSlice.reducer,
  },
});

export default store;
