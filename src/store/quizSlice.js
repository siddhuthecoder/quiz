import { createSlice } from "@reduxjs/toolkit";
const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizzes: null },
  reducers: {
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
